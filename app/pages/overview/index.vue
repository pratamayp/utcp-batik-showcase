<script setup lang="ts">
import { LayoutGrid, Store, Eye, Plus, ArrowUpRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ref } from "vue";

definePageMeta({
  layout: "dashboard",
});

const stats = [
  {
    name: "Total Produk",
    value: "124",
    change: "+12%",
    icon: LayoutGrid,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Mitra UMKM",
    value: "18",
    change: "+2",
    icon: Store,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    name: "Total Kunjungan",
    value: "2,840",
    change: "+18.4%",
    icon: Eye,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const recentItems = ref([
  {
    id: 1,
    name: "Batik Parang Kencana",
    umkm: "Batik Solo Indah",
    date: "2 jam yang lalu",
    isActive: true,
  },
  {
    id: 2,
    name: "Batik Megamendung Blue",
    umkm: "Cirebon Heritage",
    date: "5 jam yang lalu",
    isActive: true,
  },
  {
    id: 3,
    name: "Batik Kawung Modern",
    umkm: "Jogja Art",
    date: "Kemarin",
    isActive: false,
  },
  {
    id: 4,
    name: "Batik Sidomukti Gold",
    umkm: "Solo Heritage",
    date: "2 hari yang lalu",
    isActive: true,
  },
]);
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
          Anda hari ini.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline"> Unduh Laporan </Button>
        <Button variant="primary">
          <Plus class="w-4 h-4 mr-2" />
          Produk Baru
        </Button>
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
            {{ stat.value }}
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
                    {{ item.name }}
                  </p>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm text-stone-600">{{ item.umkm }}</p>
                </td>
                <td class="px-6 py-4">
                  <p class="text-xs text-stone-400">{{ item.date }}</p>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <Switch v-model:checked="item.isActive" />
                    <span
                      class="text-[10px] font-bold uppercase tracking-widest transition-colors"
                      :class="
                        item.isActive ? 'text-emerald-600' : 'text-stone-400'
                      "
                    >
                      {{ item.isActive ? "Aktif" : "Non-Aktif" }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
