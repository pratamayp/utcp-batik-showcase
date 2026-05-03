<script setup lang="ts">
import { Plus, Search, MoreVertical, Edit2, Trash2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import DashboardTable from "@/components/dashboard/DashboardTable.vue";
import DashboardPagination from "@/components/dashboard/DashboardPagination.vue";
import DashboardSelect from "@/components/dashboard/DashboardSelect.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

definePageMeta({
  layout: "dashboard",
});

const columns = [
  { key: "image", label: "Produk" },
  { key: "name", label: "Nama Batik" },
  { key: "umkm", label: "UMKM Pengrajin" },
  { key: "category", label: "Kategori" },
  { key: "status", label: "Status" },
  { key: "actions", label: "", class: "w-10" },
];

const products = [
  {
    id: 1,
    name: "Batik Parang Kencana",
    umkm: "Batik Solo Indah",
    category: "Tulis",
    status: "Published",
    image: "/images/batik-1.webp",
  },
  {
    id: 2,
    name: "Batik Megamendung Blue",
    umkm: "Cirebon Heritage",
    category: "Cap",
    status: "Published",
    image: "/images/batik-2.webp",
  },
  {
    id: 3,
    name: "Batik Kawung Modern",
    umkm: "Jogja Art",
    category: "Tulis",
    status: "Draft",
    image: "/images/batik-3.webp",
  },
  {
    id: 4,
    name: "Batik Sidomukti Gold",
    umkm: "Solo Heritage",
    category: "Tulis",
    status: "Published",
    image: "/images/batik-1.webp",
  },
  {
    id: 5,
    name: "Batik Truntum Biru",
    umkm: "Pekalongan Jaya",
    category: "Kombinasi",
    status: "Archive",
    image: "/images/batik-2.webp",
  },
];

const route = useRoute();
const router = useRouter();

const categories = [
  { label: "Semua Kategori", value: "all" },
  { label: "Batik Tulis", value: "tulis" },
  { label: "Batik Cap", value: "cap" },
  { label: "Batik Kombinasi", value: "kombinasi" },
];

const sortOptions = [
  { label: "Terbaru", value: "newest" },
  { label: "Nama (A-Z)", value: "name-asc" },
  { label: "Nama (Z-A)", value: "name-desc" },
  { label: "UMKM", value: "umkm" },
];

// Search logic with URL sync
const searchQuery = ref((route.query.search as string) || "");
let searchTimeout: number | null = null;

watch(searchQuery, (val) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = { ...route.query };
    if (val) query.search = val;
    else delete query.search;
    delete query.page;
    router.push({ query });
  }, 500);
});

const currentPage = computed({
  get: () => parseInt(route.query.page as string) || 1,
  set: (val) => {
    const query = { ...route.query };
    if (val > 1) query.page = val.toString();
    else delete query.page;
    router.push({ query });
  },
});
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-heading text-stone-900 uppercase">
          Katalog <span class="text-amber-700">Produk</span>
        </h1>
        <p class="text-stone-500 font-body mt-1">
          Kelola seluruh koleksi batik dan publikasi katalog digital.
        </p>
      </div>
      <NuxtLink href="/katalog/tambah">
        <Button variant="primary">
          <Plus class="w-4 h-4" />
          Tambah Produk
        </Button>
      </NuxtLink>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="relative w-full md:w-96 group">
        <div
          class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-700 transition-colors"
        >
          <Search class="w-4 h-4" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama batik atau UMKM..."
          class="w-full bg-white border border-stone-200 rounded-none h-12 pl-12 pr-4 outline-none focus:border-amber-600 transition-all font-body text-sm text-stone-900 shadow-none"
        />
      </div>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <DashboardSelect
          param-key="category"
          placeholder="Kategori"
          :options="categories"
          class="w-full md:w-48"
        />
        <DashboardSelect
          param-key="sort"
          placeholder="Urutkan"
          :options="sortOptions"
          default-value="newest"
          class="w-full md:w-48"
        />
      </div>
    </div>

    <!-- Table Section -->
    <div class="space-y-4">
      <DashboardTable :columns="columns" :data="products">
        <!-- Image Column -->
        <template #cell-image="{ row }">
          <div
            class="size-12 bg-stone-100 rounded-none overflow-hidden border border-stone-100 shadow-sm"
          >
            <img
              :src="row.image"
              :alt="row.name"
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </template>

        <!-- Name Column -->
        <template #cell-name="{ row }">
          <div class="flex flex-col">
            <span class="text-sm font-bold text-stone-900">{{ row.name }}</span>
            <span
              class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
              >ID: #{{ row.id }}</span
            >
          </div>
        </template>

        <!-- Status Column -->
        <template #cell-status="{ row }">
          <span
            :class="[
              row.status === 'Published'
                ? 'text-emerald-700 bg-emerald-50'
                : row.status === 'Draft'
                  ? 'text-stone-500 bg-stone-100'
                  : 'text-rose-700 bg-rose-50',
              'text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-none border',
            ]"
            :style="{
              borderColor: 'currentColor',
              borderWidth: '0.5px',
            }"
          >
            {{ row.status }}
          </span>
        </template>

        <!-- Actions Column -->
        <template #cell-actions="">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <button
                class="p-2 hover:bg-stone-100 rounded-none transition-colors outline-none text-stone-400 hover:text-stone-900"
              >
                <MoreVertical class="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              class="rounded-none border-stone-200 shadow-xl w-40"
            >
              <DropdownMenuItem
                class="cursor-pointer text-xs font-bold uppercase tracking-widest text-stone-600 focus:bg-amber-50 focus:text-amber-900"
              >
                <Edit2 class="w-3.5 h-3.5 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                class="cursor-pointer text-xs font-bold uppercase tracking-widest text-rose-600 focus:bg-rose-50 focus:text-rose-700"
              >
                <Trash2 class="w-3.5 h-3.5 mr-2" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </template>
      </DashboardTable>

      <DashboardPagination
        v-model:current-page="currentPage"
        :total="124"
        :items-per-page="5"
      />
    </div>
  </div>
</template>
