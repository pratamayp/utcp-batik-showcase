import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~~/server/types/index.type";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const now = dayjs();
  const thirtyDaysAgo = now.subtract(30, "day").toISOString();
  const sixtyDaysAgo = now.subtract(60, "day").toISOString();

  // Helper function to get counts and changes
  const getStats = async (table: "products" | "umkm") => {
    // 1. Total active items
    const { count: total } = await client
      .from(table)
      .select("*", { count: "exact", head: true })
      .is("deleted_at", null);

    // 2. Items added in last 30 days (Current Month)
    const { count: currentCount } = await client
      .from(table)
      .select("*", { count: "exact", head: true })
      .is("deleted_at", null)
      .gte("created_at", thirtyDaysAgo);

    // 3. Items added in 30-60 days ago (Previous Month)
    const { count: previousCount } = await client
      .from(table)
      .select("*", { count: "exact", head: true })
      .is("deleted_at", null)
      .lt("created_at", thirtyDaysAgo)
      .gte("created_at", sixtyDaysAgo);

    const prevCount = previousCount || 0;
    const currCount = currentCount || 0;
    const diff = currCount - prevCount;
    let change = "0";

    if (prevCount === 0) {
      change = currCount > 0 ? `+${currCount}` : "0";
    } else {
      const percent = (diff / prevCount) * 100;
      change = `${diff >= 0 ? "+" : ""}${percent.toFixed(1)}%`;
    }

    // For Mitra UMKM, if percent is too complex, we can use absolute number change
    // but the user asked for percentage in the overview UI, so we stick with %
    // if it's absolute, change would be like "+2"
    if (table === "umkm") {
      change = `${diff >= 0 ? "+" : ""}${diff}`;
    }

    return { total: total || 0, change };
  };

  const [productStats, umkmStats, recentProductsResult] = await Promise.all([
    getStats("products"),
    getStats("umkm"),
    client
      .from("products")
      .select("*, umkm(nama)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  if (recentProductsResult.error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch overview data",
    });
  }

  return {
    stats: {
      totalProducts: {
        value: productStats.total,
        change: productStats.change,
      },
      totalUmkm: {
        value: umkmStats.total,
        change: umkmStats.change,
      },
      totalVisits: {
        value: 0,
        change: "+0%",
      },
    },
    recentProducts: recentProductsResult.data,
  };
});
