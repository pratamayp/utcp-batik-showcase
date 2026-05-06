// server/api/products/[id].put.ts

import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/server/types/index.type";

export default defineEventHandler(async (event) => {
  // Initialize the strongly-typed client
  const client = await serverSupabaseClient<Database>(event);
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  // Cast the incoming request body to our strict Update type
  const body =
    await readBody<Database["public"]["Tables"]["products"]["Update"]>(event);

  // Perform the update without 'any'
  const { data, error } = await client
    .from("products")
    // @ts-expect-error: is not assignable to parameter of type 'never'
    .update({
      ...body,
      updated_at: new Date().toISOString(),
    })
    .eq("id", Number(id))
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
