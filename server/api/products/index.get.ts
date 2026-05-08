import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/server/types/index.type";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const query = getQuery(event);

  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const search = (query.search as string) || "";
  const sort = (query.sort as string) || "newest";
  const asal = (query.asal as string) || "";
  const activeOnly = query.active_only === "true";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let dbQuery = client
    .from("products")
    .select("*, umkm(nama, lokasi, no_hp)", { count: "exact" })
    .is("deleted_at", null);

  if (activeOnly) {
    dbQuery = dbQuery.is("is_active", true);
  }

  // Filter by location
  if (asal && asal !== "Semua") {
    dbQuery = dbQuery.eq("asal_daerah", asal);
  }

  // Search logic
  if (search) {
    dbQuery = dbQuery.or(
      `nama.ilike.%${search}%,asal_daerah.ilike.%${search}%,ringkasan.ilike.%${search}%`,
    );
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
  } else if (sort === "umkm") {
    // Note: PostgREST doesn't support direct ordering by joined table field in standard .order()
    // unless you use some advanced syntax or if it's a view.
    // For now, we'll order by umkm_id or fallback.
    dbQuery = dbQuery.order("umkm_id", { ascending: true });
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
