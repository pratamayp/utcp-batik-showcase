<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { Plus, Search, MoreVertical, Edit2, Trash2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DashboardTable,
  DashboardPagination,
  DashboardSelect,
} from "@/components/dashboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "vue-sonner";
import type { ProductRow } from "~~/server/types/product.type";

interface ProductResponse {
  data: (ProductRow & { umkm: { nama: string } })[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const columns = [
  { key: "nama", label: "Nama Batik" },
  { key: "asal_daerah", label: "Asal Daerah" },
  { key: "ringkasan", label: "Ringkasan" },
  { key: "umkm", label: "UMKM" },
  { key: "status", label: "Status" },
  { key: "actions", label: "", class: "w-10" },
];

const route = useRoute();
const router = useRouter();

const { data: response, refresh } = await useFetch<ProductResponse>(
  "/api/products",
  {
    query: computed(() => ({
      page: route.query.page || 1,
      search: route.query.search || "",
      sort: route.query.sort || "newest",
      limit: 10,
    })),
    watch: [
      () => route.query.page,
      () => route.query.search,
      () => route.query.sort,
    ],
  },
);

const productList = computed(() => response.value?.data || []);
const totalItems = computed(() => response.value?.pagination.total || 0);

const sortOptions = [
  { label: "Terbaru", value: "newest" },
  { label: "Nama (A-Z)", value: "name-asc" },
  { label: "Nama (Z-A)", value: "name-desc" },
  { label: "UMKM", value: "umkm" },
];

// Search logic with URL sync
const searchQuery = ref((route.query.search as string) || "");
let searchTimeout: any = null;

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

const isDeleteDialogOpen = ref(false);
const itemToDelete = ref<any>(null);

const openDeleteDialog = (item: any) => {
  itemToDelete.value = item;
  isDeleteDialogOpen.value = true;
};

const handleDelete = async () => {
  if (itemToDelete.value) {
    try {
      await $fetch(`/api/products/${itemToDelete.value.id}`, {
        method: "DELETE",
      });
      refresh();
      itemToDelete.value = null;
      isDeleteDialogOpen.value = false;
      toast.success("Produk berhasil dihapus");
    } catch (error: any) {
      toast.error("Gagal menghapus produk", {
        description: error.message || "Terjadi kesalahan pada server.",
      });
    }
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
          Katalog <span class="text-amber-700">Produk</span>
        </h1>
        <p class="text-stone-500 font-body mt-1">
          Kelola seluruh koleksi batik dan publikasi katalog digital.
        </p>
      </div>
      <NuxtLink href="/katalog/tambah">
        <Button variant="primary">
          <Plus class="w-4 h-4 mr-2" />
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
          placeholder="Cari nama batik, asal, atau ringkasan..."
          class="w-full bg-white border border-stone-200 rounded-none h-12 pl-12 pr-4 outline-none focus:border-amber-600 transition-all font-body text-sm text-stone-900 shadow-none"
        />
      </div>
      <div class="flex items-center gap-3 w-full md:w-auto">
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
      <DashboardTable :columns="columns" :data="productList">
        <!-- Name Column -->
        <template #cell-nama="{ row }">
          <div class="flex flex-col">
            <span class="text-sm font-bold text-stone-900">{{ row.nama }}</span>
            <span
              class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
              >ID: #{{ row.id }}</span
            >
          </div>
        </template>

        <!-- Asal Daerah Column -->
        <template #cell-asal_daerah="{ row }">
          <span class="text-xs text-stone-600">{{ row.asal_daerah }}</span>
        </template>

        <!-- Ringkasan Column -->
        <template #cell-ringkasan="{ row }">
          <p class="text-xs text-stone-500 line-clamp-1 max-w-xs">
            {{ row.ringkasan || "-" }}
          </p>
        </template>

        <!-- UMKM Column -->
        <template #cell-umkm="{ row }">
          <span class="text-xs font-medium text-stone-700">{{
            row.umkm?.nama || "-"
          }}</span>
        </template>

        <!-- Status Column -->
        <template #cell-status="{ row }">
          <div class="flex items-center gap-3">
            <Switch
              v-model="row.is_active"
              @update:model-value="toggleStatus(row)"
            />
            <span
              class="text-[10px] font-bold uppercase tracking-widest transition-colors"
              :class="row.is_active ? 'text-emerald-600' : 'text-stone-400'"
            >
              {{ row.is_active ? "Aktif" : "Non-Aktif" }}
            </span>
          </div>
        </template>

        <!-- Actions Column -->
        <template #cell-actions="{ row }">
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
              <NuxtLink :to="`/katalog/${row.id}`">
                <DropdownMenuItem
                  class="cursor-pointer text-xs font-bold uppercase tracking-widest text-stone-600 focus:bg-amber-50 focus:text-amber-900"
                >
                  <Edit2 class="w-3.5 h-3.5 mr-2" />
                  Edit
                </DropdownMenuItem>
              </NuxtLink>
              <DropdownMenuItem
                class="cursor-pointer text-xs font-bold uppercase tracking-widest text-red-800 focus:bg-red-100 focus:text-red-900"
                @click="openDeleteDialog(row)"
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
        :total="totalItems"
        :items-per-page="10"
      />
    </div>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="isDeleteDialogOpen">
      <AlertDialogContent
        class="rounded-none border-stone-200 shadow-2xl max-w-md"
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            class="text-base font-bold text-stone-900 uppercase tracking-widest"
          >
            Konfirmasi Hapus Produk
          </AlertDialogTitle>
          <AlertDialogDescription
            class="text-xs text-stone-500 font-body leading-relaxed"
          >
            Apakah Anda yakin ingin menghapus
            <span class="font-bold text-stone-900 italic"
              >"{{ itemToDelete?.nama }}"</span
            >? Tindakan ini tidak dapat dibatalkan dan produk akan dihapus
            permanen dari katalog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="mt-6">
          <AlertDialogCancel
            class="rounded-none border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-50"
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            class="rounded-none bg-red-800 text-white hover:bg-red-900 text-[10px] font-bold uppercase tracking-widest"
            @click="handleDelete"
          >
            Ya, Hapus Produk
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
