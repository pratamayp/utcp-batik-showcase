import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/server/types/index.type";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const query = getQuery(event);

  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await client
    .from("umkm")
    .select("*", { count: "exact" })
    .is("deleted_at", null)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return {
    data,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
});
