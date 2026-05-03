<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Phone,
  MapPin,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import DashboardTable from "@/components/dashboard/DashboardTable.vue";
import DashboardPagination from "@/components/dashboard/DashboardPagination.vue";
import DashboardSelect from "@/components/dashboard/DashboardSelect.vue";
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

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const columns = [
  { key: "name", label: "Nama UMKM" },
  { key: "contact", label: "Kontak" },
  { key: "location", label: "Lokasi" },
  { key: "status", label: "Status" },
  { key: "actions", label: "", class: "w-10" },
];

const umkmList = ref([
  {
    id: 1,
    name: "Batik Solo Indah",
    contact: "0812-3456-7890",
    location: "Laweyan, Surakarta",
    isActive: true,
  },
  {
    id: 2,
    name: "Cirebon Heritage",
    contact: "0857-1122-3344",
    location: "Trusmi, Cirebon",
    isActive: true,
  },
  {
    id: 3,
    name: "Jogja Art",
    contact: "0819-0099-8877",
    location: "Imogiri, Yogyakarta",
    isActive: false,
  },
  {
    id: 4,
    name: "Pekalongan Jaya",
    contact: "0821-4455-6677",
    location: "Wiradesa, Pekalongan",
    isActive: true,
  },
  {
    id: 5,
    name: "Lasem Classic",
    contact: "0811-2223-3344",
    location: "Lasem, Rembang",
    isActive: false,
  },
]);

const route = useRoute();
const router = useRouter();

const sortOptions = [
  { label: "Terbaru", value: "newest" },
  { label: "Nama (A-Z)", value: "name-asc" },
  { label: "Nama (Z-A)", value: "name-desc" },
  { label: "Lokasi", value: "location" },
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

// Delete Confirmation logic
const isDeleteDialogOpen = ref(false);
const itemToDelete = ref<any>(null);

const openDeleteDialog = (item: any) => {
  itemToDelete.value = item;
  isDeleteDialogOpen.value = true;
};

const handleDelete = () => {
  if (itemToDelete.value) {
    umkmList.value = umkmList.value.filter(
      (u) => u.id !== itemToDelete.value.id,
    );
    itemToDelete.value = null;
    isDeleteDialogOpen.value = false;
    alert("Data UMKM berhasil dihapus");
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
          Mitra <span class="text-amber-700">UMKM</span>
        </h1>
        <p class="text-stone-500 font-body mt-1">
          Kelola data mitra pengrajin batik dan informasi operasional mereka.
        </p>
      </div>
      <NuxtLink href="/umkm/tambah">
        <Button variant="primary">
          <Plus class="w-4 h-4 mr-2" />
          Tambah UMKM
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
          placeholder="Cari nama UMKM atau lokasi..."
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
      <DashboardTable :columns="columns" :data="umkmList">
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

        <!-- Contact Column -->
        <template #cell-contact="{ row }">
          <div class="flex items-center gap-2 text-stone-600">
            <Phone class="w-3 h-3 text-stone-400" />
            <span class="text-xs">{{ row.contact }}</span>
          </div>
        </template>

        <!-- Location Column -->
        <template #cell-location="{ row }">
          <div class="flex items-center gap-2 text-stone-600">
            <MapPin class="w-3 h-3 text-stone-400" />
            <span class="text-xs">{{ row.location }}</span>
          </div>
        </template>

        <!-- Status Column -->
        <template #cell-status="{ row }">
          <div class="flex items-center gap-3">
            <Switch v-model:checked="row.isActive" />
            <span
              class="text-[10px] font-bold uppercase tracking-widest transition-colors"
              :class="row.isActive ? 'text-emerald-600' : 'text-stone-400'"
            >
              {{ row.isActive ? "Aktif" : "Non-Aktif" }}
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
              <DropdownMenuItem
                class="cursor-pointer text-xs font-bold uppercase tracking-widest text-stone-600 focus:bg-amber-50 focus:text-amber-900"
              >
                <Edit2 class="w-3.5 h-3.5 mr-2" />
                Edit Profil
              </DropdownMenuItem>
              <DropdownMenuItem
                class="cursor-pointer text-xs font-bold uppercase tracking-widest text-rose-600 focus:bg-rose-50 focus:text-rose-700"
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
        :total="48"
        :items-per-page="5"
      />
    </div>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="isDeleteDialogOpen">
      <AlertDialogContent
        class="rounded-none border-stone-200 shadow-2xl max-w-md"
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            class="text-sm font-bold text-stone-900 uppercase tracking-widest"
          >
            Konfirmasi Hapus Mitra
          </AlertDialogTitle>
          <AlertDialogDescription
            class="text-xs text-stone-500 font-body leading-relaxed"
          >
            Apakah Anda yakin ingin menghapus mitra
            <span class="font-bold text-stone-900 italic"
              >"{{ itemToDelete?.name }}"</span
            >? Data sejarah produk dari UMKM ini akan tetap tersimpan namun
            status kemitraan akan dicabut.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="mt-6">
          <AlertDialogCancel
            class="rounded-none border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-50"
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            class="rounded-none bg-rose-600 text-white hover:bg-rose-700 text-[10px] font-bold uppercase tracking-widest"
            @click="handleDelete"
          >
            Ya, Hapus Mitra
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
