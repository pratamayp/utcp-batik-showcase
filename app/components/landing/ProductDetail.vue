<template>
  <Sheet :open="isOpen" @update:open="$emit('close')">
    <SheetContent
      side="right"
      class="w-full sm:max-w-xl p-0 bg-stone-50 border-l border-stone-200 overflow-y-auto"
    >
      <div v-if="product" class="flex flex-col min-h-screen">
        <!-- Image Gallery -->
        <div
          class="relative bg-stone-200 aspect-3/4 sm:aspect-square overflow-hidden group"
        >
          <img
            :src="activeImage || product.image"
            :alt="product.nama"
            class="w-full h-full object-cover transition-all duration-700"
          />

          <!-- Thumbnail Strip -->
          <div
            v-if="product.images && product.images.length > 1"
            class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
          >
            <button
              v-for="(img, idx) in product.images"
              :key="idx"
              class="size-3 rounded-full transition-all duration-300"
              :class="[
                activeImage === img || (!activeImage && idx === 0)
                  ? 'bg-amber-600 scale-125'
                  : 'bg-white/60 hover:bg-white',
              ]"
              @click="activeImage = img"
            />
          </div>

          <!-- Close Button handled by Sheet -->
        </div>

        <!-- Content Section -->
        <div class="p-8 sm:p-10 space-y-10">
          <!-- Header -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="h-px w-6 bg-amber-600"></span>
              <span
                class="text-amber-600 font-sans tracking-[0.2em] uppercase text-[10px] font-bold"
              >
                Asal: {{ product.asal }}
              </span>
            </div>
            <h2
              class="text-3xl sm:text-4xl font-heading text-stone-900 leading-tight"
            >
              {{ product.nama }}
            </h2>
          </div>

          <!-- Description Section -->
          <div class="space-y-4">
            <h3
              class="text-xs font-sans font-bold uppercase tracking-widest text-stone-400"
            >
              Tentang Koleksi
            </h3>
            <p class="text-stone-700 font-body leading-relaxed text-lg italic">
              "{{ product.deskripsi }}"
            </p>
          </div>

          <Separator class="bg-stone-200" />

          <!-- Philosophy Section -->
          <div class="space-y-4">
            <h3
              class="text-xs font-sans font-bold uppercase tracking-widest text-stone-400"
            >
              Filosofi & Makna
            </h3>
            <div class="bg-amber-50/50 border-l-4 border-amber-600 p-6">
              <p
                class="text-stone-800 font-serif leading-relaxed italic text-lg"
              >
                {{ product.filosofi }}
              </p>
            </div>
          </div>

          <!-- UMKM / Partner Section -->
          <div class="bg-white border border-stone-200 p-6 space-y-6">
            <div class="flex items-center gap-4">
              <div
                class="size-12 bg-amber-100 flex items-center justify-center border border-amber-200 shrink-0"
              >
                <span class="text-amber-700 font-heading text-xl font-bold">
                  {{ product.seller.charAt(0) }}
                </span>
              </div>
              <div>
                <span
                  class="block text-[10px] font-sans font-bold text-amber-600 uppercase tracking-widest leading-none mb-1"
                >
                  Karya Mitra UMKM
                </span>
                <h4 class="text-xl font-heading text-stone-900">
                  {{ product.seller }}
                </h4>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <span
                  class="block text-[10px] text-stone-400 uppercase font-bold tracking-tighter"
                  >Lokasi</span
                >
                <div class="flex items-center gap-2 text-stone-700">
                  <MapPin class="size-4 text-amber-600" />
                  <span class="text-sm font-medium">{{
                    product.umkmLocation
                  }}</span>
                </div>
              </div>
              <div class="space-y-1">
                <span
                  class="block text-[10px] text-stone-400 uppercase font-bold tracking-tighter"
                  >Kontak</span
                >
                <div class="flex items-center gap-2 text-stone-700">
                  <Phone class="size-4 text-amber-600" />
                  <span class="text-sm font-medium">Tersedia</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              rounded="none"
              class="w-full h-14 text-xs uppercase tracking-[0.2em] font-bold"
              @click="contactUMKM"
            >
              Hubungi Pengrajin
            </Button>
          </div>
        </div>

        <!-- Footer / Disclaimer -->
        <div class="mt-auto p-10 bg-stone-100 border-t border-stone-200">
          <p
            class="text-[10px] text-stone-400 leading-relaxed text-center uppercase tracking-widest font-bold"
          >
            Produk ini merupakan warisan budaya Nusantara yang dilestarikan oleh
            {{ product.seller }}.
          </p>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup>
import { ref, watch } from "vue";
import { MapPin, Phone } from "lucide-vue-next";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);

const activeImage = ref(null);

// Reset active image when product changes
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      activeImage.value = newProduct.images?.[0] || newProduct.image;
    }
  },
  { immediate: true },
);

const contactUMKM = () => {
  if (props.product?.umkmPhone) {
    window.open(`https://wa.me/${props.product.umkmPhone}`, "_blank");
  }
};
</script>
