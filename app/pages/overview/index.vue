<script setup lang="ts">
import { LayoutGrid, Store, Eye, Plus, ArrowUpRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { computed } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id"; // Import Indonesian locale
import { toast } from "vue-sonner";
import type { ProductWithUmkm } from "~~/server/types/product.type";

dayjs.extend(relativeTime);
dayjs.locale("id");

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

interface StatValue {
  value: number;
  change: string;
}

interface OverviewResponse {
  stats: {
    totalProducts: StatValue;
    totalUmkm: StatValue;
    totalVisits: StatValue;
  };
  recentProducts: ProductWithUmkm[];
}

const { data: overviewData, refresh } =
  await useFetch<OverviewResponse>("/api/overview");

const stats = computed(() => [
  {
    name: "Total Produk",
    value: overviewData.value?.stats.totalProducts.value || 0,
    change: overviewData.value?.stats.totalProducts.change || "+0%",
    icon: LayoutGrid,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Mitra UMKM",
    value: overviewData.value?.stats.totalUmkm.value || 0,
    change: overviewData.value?.stats.totalUmkm.change || "+0",
    icon: Store,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    name: "Total Kunjungan",
    value: overviewData.value?.stats.totalVisits.value || 0,
    change: overviewData.value?.stats.totalVisits.change || "+0%",
    icon: Eye,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
]);

const recentItems = computed(() => overviewData.value?.recentProducts || []);

const toggleStatus = async (item: ProductRow) => {
  try {
    await $fetch(`/api/products/${item.id}/status`, {
      method: "PATCH",
      body: { is_active: item.is_active },
    });
    toast.success(`Status ${item.nama} diperbarui`, {
      description: `Sekarang dalam status ${
        item.is_active ? "Aktif" : "Non-Aktif"
      }.`,
    });
    refresh();
  } catch (error: any) {
    item.is_active = !item.is_active;
    toast.error("Gagal memperbarui status", {
      description: error.message || "Terjadi kesalahan pada server.",
    });
  }
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-heading text-stone-900 uppercase">
          Ringkasan <span class="text-amber-700">Dashboard</span>
        </h1>
        <p class="text-stone-500 font-body mt-1">
          Selamat datang kembali, Administrator. Berikut adalah performa katalog
          Anda bulan ini.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" class="text-stone-800 hover:bg-black/5">
          Unduh Laporan
        </Button>
        <NuxtLink href="/katalog/tambah">
          <Button variant="primary">
            <Plus class="w-4 h-4 mr-2" />
            Produk Baru
          </Button>
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="bg-white border border-stone-200 p-6 rounded-none relative overflow-hidden group hover:border-amber-300 transition-colors"
      >
        <div class="flex items-center justify-between">
          <div :class="[stat.bg, stat.color, 'p-3 rounded-none']">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <span
            class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-none flex items-center gap-1"
          >
            {{ stat.change }}
            <ArrowUpRight class="w-3 h-3" />
          </span>
        </div>
        <div class="mt-4">
          <p class="text-xs font-bold text-stone-400 uppercase tracking-widest">
            {{ stat.name }}
          </p>
          <h3 class="text-2xl font-heading text-stone-900 mt-1">
            {{ stat.value.toLocaleString() }}
          </h3>
        </div>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="">
      <!-- Recent Uploads Table -->
      <div
        class="bg-white border border-stone-200 rounded-none overflow-hidden"
      >
        <div
          class="px-6 py-4 border-b border-stone-100 flex items-center justify-between"
        >
          <h2 class="text-sm font-bold text-stone-900 uppercase tracking-wide">
            Update Katalog Terbaru
          </h2>
          <NuxtLink
            to="/katalog"
            class="text-[10px] font-bold text-amber-700 uppercase tracking-widest hover:underline"
          >
            Lihat Semua
          </NuxtLink>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-stone-50 border-b border-stone-100">
              <tr>
                <th
                  class="px-6 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest"
                >
                  Nama Produk
                </th>
                <th
                  class="px-6 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest"
                >
                  Nama UMKM
                </th>
                <th
                  class="px-6 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest"
                >
                  Waktu
                </th>
                <th
                  class="px-6 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-50">
              <tr
                v-for="item in recentItems"
                :key="item.id"
                class="hover:bg-stone-50/50 transition-colors"
              >
                <td class="px-6 py-4">
                  <p class="text-sm font-bold text-stone-900">
                    {{ item.nama }}
                  </p>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm text-stone-600">
                    {{ item.umkm?.nama || "-" }}
                  </p>
                </td>
                <td class="px-6 py-4">
                  <p class="text-xs text-stone-400">
                    {{ dayjs(item.created_at).fromNow() }}
                  </p>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <Switch
                      v-model="item.is_active"
                      @update:model-value="toggleStatus(item)"
                    />
                    <span
                      class="text-[10px] font-bold uppercase tracking-widest transition-colors"
                      :class="
                        item.is_active ? 'text-emerald-600' : 'text-stone-400'
                      "
                    >
                      {{ item.is_active ? "Aktif" : "Non-Aktif" }}
                    </span>
                  </div>
                </td>
              </tr>
              <tr v-if="recentItems.length === 0">
                <td colspan="4" class="px-6 py-10 text-center">
                  <p class="text-xs text-stone-400 uppercase tracking-widest">
                    Belum ada data produk terbaru
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
