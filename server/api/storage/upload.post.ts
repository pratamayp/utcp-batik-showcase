import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: "No files uploaded",
    });
  }

  // Filter for files in the multipart form data
  // We look for parts that have a filename (which indicates it's a file)
  const files = formData.filter((item) => item.filename);

  if (files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No files found in the request",
    });
  }

  const uploadedUrls: string[] = [];

  for (const file of files) {
    // Generate a unique filename to avoid collisions
    const fileExt = file.filename?.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

    const { error } = await client.storage
      .from("images")
      .upload(fileName, file.data, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to upload ${file.filename}: ${error.message}`,
      });
    }

    // Get the public URL for the uploaded file
    const { data: publicUrlData } = client.storage
      .from("images")
      .getPublicUrl(fileName);

    if (publicUrlData) {
      uploadedUrls.push(publicUrlData.publicUrl);
    }
  }

  return {
    success: true,
    urls: uploadedUrls,
  };
});
