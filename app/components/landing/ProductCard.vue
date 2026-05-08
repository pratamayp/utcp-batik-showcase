<template>
  <div
    class="group bg-white border border-stone-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2"
  >
    <!-- Image Section -->
    <div class="relative aspect-3/4 overflow-hidden bg-stone-100">
      <img
        :src="product.image"
        :alt="product.nama"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <!-- Badge for Origin -->
      <div class="absolute top-4 left-4">
        <span
          class="px-3 py-1 bg-white/90 backdrop-blur-md text-amber-900 text-[10px] font-sans font-bold uppercase tracking-widest border border-amber-200"
        >
          {{ product.asal }}
        </span>
      </div>

      <!-- Quick Info Overlay (Visible on Hover) -->
      <div
        class="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
      >
        <div
          class="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
        >
          <h4
            class="text-amber-200 text-xs font-bold uppercase tracking-widest mb-2"
          >
            Filosofi
          </h4>
          <p
            class="text-white text-sm font-body leading-relaxed line-clamp-4 italic"
          >
            "{{ product.filosofi }}"
          </p>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-6 flex flex-col h-full space-y-4">
      <div class="space-y-2">
        <h3 class="text-xl font-heading text-stone-900 line-clamp-1">
          {{ product.nama }}
        </h3>
        <p
          class="text-stone-600 text-sm font-body leading-relaxed line-clamp-2"
        >
          {{ product.deskripsi }}
        </p>
      </div>

      <!-- Redesigned Seller Section -->
      <div
        class="pt-4 border-t border-stone-100 flex items-center justify-between gap-2"
      >
        <div class="flex items-center gap-3">
          <!-- Seller Initial/Avatar -->
          <div
            class="size-9 bg-amber-50 flex items-center justify-center border border-amber-200"
          >
            <span class="text-amber-700 font-heading text-sm font-bold">{{
              product.seller.charAt(0)
            }}</span>
          </div>
          <div>
            <span
              class="block text-[9px] font-sans font-bold text-amber-600 uppercase tracking-widest leading-none mb-1"
              >Koleksi Dari</span
            >
            <span
              class="block text-sm font-heading text-stone-900 leading-none line-clamp-1 pb-px"
              >{{ product.seller }}</span
            >
          </div>
        </div>

        <div class="flex items-center gap-0.5 shrink-0">
          <Button
            v-if="product.umkmInstagram"
            variant="ghost"
            size="icon"
            class="size-8 rounded-none hover:bg-transparent shrink-0"
            @click.stop="visitInstagram"
          >
            <img
              src="/images/instagram-bw.webp"
              alt="Instagram"
              class="size-8 object-contain opacity-60"
            />
          </Button>
          <Button
            v-if="product.umkmPhone"
            variant="ghost"
            size="icon"
            class="size-8 rounded-none hover:bg-transparent shrink-0"
            @click.stop="contactUMKM"
          >
            <img
              src="/images/whatsapp-bw.webp"
              alt="WhatsApp"
              class="size-8 object-contain opacity-60"
            />
          </Button>
        </div>
      </div>

      <!-- Simplified Action Button -->
      <div class="pt-2">
        <Button
          as-child
          variant="primary"
          size="lg"
          rounded="none"
          class="w-full h-12 text-xs uppercase tracking-[0.2em] font-bold"
        >
          <NuxtLink :to="`/koleksi/${product.id}`"> Detail Produk </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const contactUMKM = () => {
  if (props.product?.umkmPhone) {
    window.open(`https://wa.me/${props.product.umkmPhone}`, "_blank");
  }
};

const visitInstagram = () => {
  if (props.product?.umkmInstagram) {
    const handle = props.product.umkmInstagram.replace("@", "");
    window.open(`https://instagram.com/${handle}`, "_blank");
  }
};
</script>
