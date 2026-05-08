import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/server/types/index.type";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const query = getQuery(event);

  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 5;
  const search = (query.search as string) || "";
  const sort = (query.sort as string) || "newest";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let dbQuery = client
    .from("umkm")
    .select("*", { count: "exact" })
    .is("deleted_at", null);

  // Search logic
  if (search) {
    dbQuery = dbQuery.or(`nama.ilike.%${search}%,lokasi.ilike.%${search}%`);
  }

  // Sorting logic
  if (sort === "name-asc") {
    dbQuery = dbQuery
      .order("nama", { ascending: true })
      .order("id", { ascending: true });
  } else if (sort === "name-desc") {
    dbQuery = dbQuery
      .order("nama", { ascending: false })
      .order("id", { ascending: true });
  } else if (sort === "location") {
    dbQuery = dbQuery
      .order("lokasi", { ascending: true })
      .order("id", { ascending: true });
  } else {
    dbQuery = dbQuery
      .order("created_at", { ascending: false })
      .order("id", { ascending: true });
  }

  const { data, error, count } = await dbQuery.range(from, to);

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
