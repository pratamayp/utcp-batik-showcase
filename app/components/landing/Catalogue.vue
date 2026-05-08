<template>
  <section id="catalogue" class="py-24 bg-stone-50 overflow-hidden">
    <div class="container mx-auto px-6 md:px-12">
      <!-- Header Section -->
      <div
        class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
      >
        <div class="max-w-2xl">
          <div class="flex items-center gap-3 mb-4">
            <span class="h-px w-8 bg-amber-600"></span>
            <span
              class="text-amber-600 font-sans tracking-[0.2em] uppercase text-xs font-bold"
              >Katalog Koleksi</span
            >
          </div>
          <h2
            class="text-4xl md:text-5xl font-heading text-stone-900 leading-tight mb-6"
          >
            Katalog Koleksi <span class="italic text-amber-700">Nusantara</span>
          </h2>
          <p class="text-lg text-stone-600 font-body leading-relaxed">
            Jelajahi keberagaman motif dan filosofi dari berbagai penjuru tanah
            air. Temukan keindahan yang diwariskan secara turun-temurun melalui
            sentuhan tangan para maestro batik.
          </p>
        </div>

        <!-- Dropdown Select Filter -->
        <div class="self-start md:self-end">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="outline"
                size="lg"
                rounded="none"
                class="min-w-50 justify-between border-stone-300 text-stone-700 hover:bg-stone-100"
              >
                <span class="flex items-center gap-2">
                  <span
                    class="text-xs text-stone-400 font-sans uppercase tracking-wider"
                    >Lokasi:</span
                  >
                  {{ activeFilter }}
                </span>
                <ChevronDown class="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              class="min-w-50 rounded-none border-stone-200"
            >
              <DropdownMenuRadioGroup v-model="activeFilter">
                <DropdownMenuRadioItem
                  v-for="filter in filters"
                  :key="filter"
                  :value="filter"
                  class="rounded-none focus:bg-amber-50 focus:text-amber-900 cursor-pointer pl-4 data-[state=checked]:bg-amber-100 data-[state=checked]:text-amber-900 data-[state=checked]:font-semibold [&>span]:hidden"
                >
                  {{ filter }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="pending"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="aspect-3/4 bg-stone-200 animate-pulse"
        ></div>
      </div>

      <!-- Catalogue Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard
          v-for="product in productItems"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="!pending && productItems.length === 0"
        class="py-20 text-center"
      >
        <p class="text-stone-400 font-serif italic text-xl">
          Tidak ada koleksi ditemukan untuk lokasi ini.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import ProductCard from "./ProductCard.vue";

const filters = [
  "Semua",
  "Solo",
  "Yogyakarta",
  "Pekalongan",
  "Semarang",
  "Bali",
  "Cirebon",
  "Garut",
  "Madura",
  "Tasikmalaya",
];
const activeFilter = ref("Semua");

const { data: response, pending } = await useFetch("/api/products", {
  query: computed(() => ({
    asal: activeFilter.value,
    limit: 12,
    active_only: true,
  })),
  watch: [activeFilter],
});

const productItems = computed(() => {
  return (response.value?.data || []).map((item) => ({
    id: item.id,
    nama: item.nama,
    asal: item.asal_daerah,
    image: item.images?.[0] || "/images/hero.webp",
    deskripsi: item.ringkasan || item.deskripsi,
    filosofi: item.filosofi,
    seller: item.umkm?.nama || "Mitra Batik",
    umkmLocation: item.umkm?.lokasi || item.asal_daerah,
    umkmPhone: item.umkm?.no_hp,
    umkmInstagram: item.umkm?.instagram,
  }));
});
</script>

<style scoped>
/* Any specific styles for the catalogue section */
</style>
