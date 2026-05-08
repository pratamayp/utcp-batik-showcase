import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/server/types/index.type";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const id = getRouterParam(event, "id");
  const { is_active } = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  const { data, error } = await client
    .from("products")
    // @ts-expect-error: is not assignable to parameter of type 'never'
    .update({
      is_active,
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
