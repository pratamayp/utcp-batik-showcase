<template>
  <main class="min-h-screen bg-stone-50 pb-20">
    <!-- Navigation Header -->
    <header
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200"
    >
      <div
        class="container mx-auto px-6 h-20 flex items-center justify-between"
      >
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <ArrowLeft
            class="size-5 text-stone-400 group-hover:text-amber-600 transition-colors"
          />
          <span
            class="text-sm font-sans font-bold uppercase tracking-widest text-stone-600 group-hover:text-stone-900 transition-colors"
          >
            Kembali ke Katalog
          </span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <div
            class="size-8 bg-amber-600 flex items-center justify-center text-white font-heading font-bold"
          >
            B
          </div>
          <span
            class="text-lg font-heading text-stone-900 tracking-wider uppercase hidden sm:inline"
          >
            E-Katalog <span class="text-amber-700">Batik</span>
          </span>
        </div>
      </div>
    </header>

    <div v-if="product" class="container mx-auto px-6 pt-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Left: Image Gallery -->
        <div class="space-y-6">
          <div
            class="relative bg-stone-200 aspect-3/4 sm:aspect-square overflow-hidden group shadow-2xl shadow-stone-200/50"
          >
            <img
              :src="activeImage || product.image"
              :alt="product.nama"
              class="w-full h-full object-cover transition-all duration-700"
            />
          </div>

          <!-- Thumbnails -->
          <div
            v-if="product.images && product.images.length > 1"
            class="grid grid-cols-4 gap-4"
          >
            <button
              v-for="(img, idx) in product.images"
              :key="idx"
              class="aspect-square bg-stone-100 border-2 transition-all duration-300 overflow-hidden"
              :class="[
                activeImage === img || (!activeImage && idx === 0)
                  ? 'border-amber-600 scale-95 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-100',
              ]"
              @click="activeImage = img"
            >
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Right: Content -->
        <div class="space-y-12">
          <!-- Title & Origin -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <span class="h-px w-10 bg-amber-600"></span>
              <span
                class="text-amber-600 font-sans tracking-[0.2em] uppercase text-xs font-bold"
              >
                Asal: {{ product.asal }}
              </span>
            </div>
            <h1
              class="text-5xl sm:text-6xl font-heading text-stone-900 leading-tight"
            >
              {{ product.nama }}
            </h1>
          </div>

          <!-- Description -->
          <div class="space-y-4">
            <h3
              class="text-xs font-sans font-bold uppercase tracking-widest text-stone-400"
            >
              Tentang Koleksi
            </h3>
            <p class="text-stone-700 font-body leading-relaxed text-xl italic">
              "{{ product.deskripsi }}"
            </p>
          </div>

          <Separator class="bg-stone-200" />

          <!-- Philosophy -->
          <div class="space-y-6">
            <h3
              class="text-xs font-sans font-bold uppercase tracking-widest text-stone-400"
            >
              Filosofi & Makna
            </h3>
            <div class="bg-amber-50/50 border-l-8 border-amber-600 p-8 sm:p-10">
              <p
                class="text-stone-800 font-serif leading-relaxed italic text-2xl"
              >
                {{ product.filosofi }}
              </p>
            </div>
          </div>

          <!-- Partner Info -->
          <div
            class="bg-white border border-stone-200 p-8 space-y-8 shadow-xl shadow-stone-200/30"
          >
            <div class="flex items-center gap-6">
              <div
                class="size-16 bg-amber-100 flex items-center justify-center border border-amber-200 shrink-0"
              >
                <span class="text-amber-700 font-heading text-3xl font-bold">
                  {{ product.seller.charAt(0) }}
                </span>
              </div>
              <div>
                <span
                  class="block text-xs font-sans font-bold text-amber-600 uppercase tracking-widest leading-none mb-2"
                >
                  Karya Mitra UMKM
                </span>
                <h4 class="text-2xl font-heading text-stone-900">
                  {{ product.seller }}
                </h4>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex items-center gap-4 text-stone-700">
                <div
                  class="size-10 bg-stone-50 flex items-center justify-center border border-stone-100"
                >
                  <MapPin class="size-5 text-amber-600" />
                </div>
                <div>
                  <span
                    class="block text-[10px] text-stone-400 uppercase font-bold tracking-widest leading-none mb-1"
                    >Lokasi</span
                  >
                  <span class="text-base font-medium">{{
                    product.umkmLocation
                  }}</span>
                </div>
              </div>
              <div class="flex items-center gap-4 text-stone-700">
                <div
                  class="size-10 bg-stone-50 flex items-center justify-center border border-stone-100"
                >
                  <Phone class="size-5 text-amber-600" />
                </div>
                <div>
                  <span
                    class="block text-[10px] text-stone-400 uppercase font-bold tracking-widest leading-none mb-1"
                    >Kontak</span
                  >
                  <span class="text-base font-medium">Tersedia</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              rounded="none"
              class="w-full h-16 text-sm uppercase tracking-[0.2em] font-bold"
              @click="contactUMKM"
            >
              Hubungi Pengrajin via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- 404 State -->
    <div v-else class="container mx-auto px-6 py-40 text-center">
      <h2 class="text-3xl font-heading text-stone-900 mb-6">
        Koleksi tidak ditemukan.
      </h2>
      <Button as-child variant="outline" rounded="none">
        <NuxtLink to="/">Kembali ke Beranda</NuxtLink>
      </Button>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { ArrowLeft, MapPin, Phone } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProducts } from "@/composables/useProducts";

const route = useRoute();
const { getProductById } = useProducts();

const product = getProductById(route.params.id);
const activeImage = ref(product?.images?.[0] || product?.image);

const contactUMKM = () => {
  if (product?.umkmPhone) {
    window.open(`https://wa.me/${product.umkmPhone}`, "_blank");
  }
};

useHead({
  title: product
    ? `${product.nama} - E-Katalog Batik`
    : "Koleksi Tidak Ditemukan",
  meta: [
    {
      name: "description",
      content: product?.deskripsi || "Detail koleksi batik nusantara",
    },
  ],
});
</script>
