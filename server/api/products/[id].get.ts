import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/server/types/index.type";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  return data;
});
