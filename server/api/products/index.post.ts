import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/server/types/index.type";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const body = await readBody(event);

  const { data, error } = await client
    .from("products")
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
