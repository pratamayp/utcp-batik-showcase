import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/server/types/index.type";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const body = await readBody(event);

  // Basic Validation to ensure 'type' is provided
  if (!body || !body.type) {
    throw createError({
      statusCode: 400,
      statusMessage: "The 'type' field is required to create a log entry.",
    });
  }

  const { data, error } = await client
    .from("logs")
    .insert(body)
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return data;
});
