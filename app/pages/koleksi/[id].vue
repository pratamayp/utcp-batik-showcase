<script setup lang="ts">
import { ArrowLeft, MapPin } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type { ProductWithUmkm } from "~~/server/types/product.type";

const route = useRoute();
const id = route.params.id;

const { data: product, error } = await useFetch<ProductWithUmkm>(
  `/api/products/${id}`,
);

if (error.value || !product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Koleksi tidak ditemukan",
  });
}

const activeImage = ref(product.value?.images?.[0] || "/images/hero.webp");

const contactUMKM = () => {
  if (product.value?.umkm?.no_hp) {
    let phone = product.value.umkm.no_hp.replace(/\D/g, "");
    if (phone.startsWith("0")) {
      phone = "62" + phone.slice(1);
    }
    window.open(`https://wa.me/${phone}`, "_blank");
  }
};

const visitInstagram = () => {
  if (product.value?.umkm?.instagram) {
    const handle = product.value.umkm.instagram.replace("@", "");
    window.open(`https://instagram.com/${handle}`, "_blank");
  }
};

useHead({
  title: `${product.value?.nama} | Katalog Batik Nusantara`,
  meta: [
    {
      name: "description",
      content: product.value?.ringkasan || product.value?.deskripsi || "",
    },
  ],
});
</script>

<template>
  <div>
    <div class="min-h-screen bg-stone-50 pt-20 pb-24">
      <div class="container mx-auto px-6 md:px-12">
        <!-- Breadcrumbs / Back -->
        <NuxtLink
          to="/#catalogue"
          class="inline-flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors mb-12 group"
        >
          <ArrowLeft
            class="size-4 transition-transform group-hover:-translate-x-1"
          />
          <span class="text-xs font-sans font-bold uppercase tracking-widest"
            >Kembali ke Katalog</span
          >
        </NuxtLink>

        <div
          v-if="product"
          class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
        >
          <!-- Left: Image Gallery -->
          <div class="lg:col-span-7 space-y-6">
            <div
              class="aspect-3/4 sm:aspect-square bg-stone-200 overflow-hidden border border-stone-200"
            >
              <img
                :src="activeImage"
                :alt="product?.nama"
                class="w-full h-full object-cover transition-all duration-700"
              />
            </div>

            <!-- Thumbnails -->
            <div
              v-if="product?.images && product?.images.length > 1"
              class="grid grid-cols-4 sm:grid-cols-6 gap-4"
            >
              <button
                v-for="(img, idx) in product?.images"
                :key="idx"
                class="aspect-square border transition-all overflow-hidden"
                :class="[
                  activeImage === img
                    ? 'border-amber-600 ring-2 ring-amber-600/20'
                    : 'border-stone-200 hover:border-amber-300',
                ]"
                @click="activeImage = img"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Right: Content -->
          <div class="lg:col-span-5 space-y-10">
            <!-- Header -->
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <span class="h-px w-8 bg-amber-600"></span>
                <span
                  class="text-amber-600 font-sans tracking-[0.2em] uppercase text-xs font-bold"
                >
                  Asal: {{ product?.asal_daerah }}
                </span>
              </div>
              <h1
                class="text-4xl md:text-5xl font-heading text-stone-900 leading-tight"
              >
                {{ product?.nama }}
              </h1>
            </div>

            <Separator class="bg-stone-200 -mt-6" />

            <!-- Description Section -->
            <div class="space-y-4 -mt-4">
              <h3
                class="text-xs font-sans font-bold uppercase tracking-widest text-stone-400"
              >
                Tentang Koleksi
              </h3>
              <p class="text-stone-700 font-body leading-relaxed text-lg">
                {{ product?.deskripsi }}
              </p>
            </div>

            <!-- Philosophy Section -->
            <div class="space-y-4">
              <h3
                class="text-xs font-sans font-bold uppercase tracking-widest text-stone-400"
              >
                Filosofi & Makna
              </h3>
              <div class="bg-amber-50/50 border-l-4 border-amber-600 p-8">
                <p
                  class="text-stone-800 font-serif leading-relaxed italic text-xl"
                >
                  "{{ product?.filosofi }}"
                </p>
              </div>
            </div>

            <!-- UMKM / Partner Section -->
            <div class="bg-white border border-stone-200 p-8 space-y-4">
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div
                    class="size-14 bg-amber-100 flex items-center justify-center border border-amber-200 shrink-0"
                  >
                    <span class="text-amber-700 font-heading text-xl font-bold">
                      {{ product?.umkm?.nama?.charAt(0) || "M" }}
                    </span>
                  </div>
                  <div>
                    <span
                      class="block text-[10px] font-sans font-bold text-amber-600 uppercase tracking-widest leading-none mb-2"
                    >
                      Produksi Dari
                    </span>
                    <h4
                      class="text-xl font-heading text-stone-900 line-clamp-1"
                    >
                      {{ product?.umkm?.nama || "Mitra UMKM" }}
                    </h4>
                  </div>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                  <Button
                    v-if="product?.umkm?.instagram"
                    variant="ghost"
                    size="icon"
                    class="size-8 rounded-none hover:bg-transparent shrink-0"
                    @click="visitInstagram"
                  >
                    <img
                      src="/images/instagram-bw.webp"
                      alt="Instagram"
                      class="size-14 object-contain opacity-60"
                    />
                  </Button>
                  <Button
                    v-if="product?.umkm?.no_hp"
                    variant="ghost"
                    size="icon"
                    class="size-8 rounded-none hover:bg-transparent shrink-0"
                    @click="contactUMKM"
                  >
                    <img
                      src="/images/whatsapp-bw.webp"
                      alt="WhatsApp"
                      class="size-14 object-contain opacity-60"
                    />
                  </Button>
                </div>
              </div>

              <div class="space-y-1 border-t border-stone-100 pt-4">
                <span
                  class="block text-[10px] text-stone-400 uppercase font-bold tracking-widest"
                  >Lokasi</span
                >
                <div class="flex items-center gap-2 text-stone-700">
                  <MapPin class="size-4 text-amber-600 shrink-0" />
                  <span class="text-xs font-medium">{{
                    product?.umkm?.lokasi || product?.asal_daerah || "Nusantara"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LandingFooter />
  </div>
</template>

<style scoped>
.font-heading {
  font-family: "Playfair Display", serif;
}
.font-body {
  font-family: "Inter", sans-serif;
}
</style>
