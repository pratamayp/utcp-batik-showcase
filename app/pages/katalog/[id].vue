<script setup lang="ts">
import {
  ArrowLeft,
  Save,
  Info,
  Image as ImageIcon,
  Loader2,
} from "lucide-vue-next";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/Input.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageDropzone } from "@/components/dashboard";
import type { UmkmRow } from "~~/server/types/umkm.type";
import type { ProductRow } from "~~/server/types/product.type";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const route = useRoute();
const id = route.params.id;

// Fetch UMKM options and Product details
const [{ data: umkmResponse }, { data: product, error: fetchError }] =
  await Promise.all([
    useFetch<{ data: UmkmRow[] }>("/api/umkm", { query: { limit: 100 } }),
    useFetch<ProductRow>(`/api/products/${id}`),
  ]);

if (fetchError.value || !product.value) {
  toast.error("Gagal memuat data produk");
  navigateTo("/katalog");
}

const umkmOptions = computed(() =>
  (umkmResponse.value?.data || []).map((u) => ({
    label: u.nama,
    value: u.id.toString(),
  })),
);

const schema = toTypedSchema(
  z.object({
    nama: z.string().min(1, "Nama produk wajib diisi"),
    asal: z.string().min(1, "Asal daerah wajib diisi"),
    ringkasan: z.string().min(1, "Ringkasan produk wajib diisi"),
    deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
    filosofi: z.string().min(10, "Filosofi minimal 10 karakter"),
    umkm: z.string().min(1, "Silahkan pilih UMKM"),
    images: z.array(z.any()).min(1, "Minimal harus mengunggah 1 gambar produk"),
  }),
);

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    nama: product.value?.nama || "",
    asal: product.value?.asal_daerah || "",
    ringkasan: product.value?.ringkasan || "",
    deskripsi: product.value?.deskripsi || "",
    filosofi: product.value?.filosofi || "",
    umkm: product.value?.umkm_id.toString() || "",
    images: product.value?.images || [],
  },
});

const [nama] = defineField("nama");
const [asal] = defineField("asal");
const [ringkasan] = defineField("ringkasan");
const [deskripsi] = defineField("deskripsi");
const [filosofi] = defineField("filosofi");
const [umkm] = defineField("umkm");
const [images] = defineField("images");

const asalOptions = [
  "Bali",
  "Banyumas",
  "Cirebon",
  "Garut",
  "Madura",
  "Pekalongan",
  "Semarang",
  "Solo",
  "Tasikmalaya",
  "Yogyakarta",
];

const onSubmit = handleSubmit(async (values) => {
  try {
    // 1. Separate existing URLs and new Files
    const existingUrls = values.images.filter((img) => typeof img === "string");
    const newFiles = values.images.filter((img) => img instanceof File);

    let finalImages = [...existingUrls];

    // 2. Upload new Files if any
    if (newFiles.length > 0) {
      toast.info(`Mengunggah ${newFiles.length} gambar baru...`);
      const formData = new FormData();
      newFiles.forEach((file: File) => {
        formData.append("files", file);
      });

      const uploadRes = await $fetch<{ success: boolean; urls: string[] }>(
        "/api/storage/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (uploadRes.success) {
        finalImages = [...finalImages, ...uploadRes.urls];
      }
    }

    // 3. Update Product
    await $fetch(`/api/products/${id}`, {
      method: "PUT",
      body: {
        nama: values.nama,
        asal_daerah: values.asal,
        ringkasan: values.ringkasan,
        deskripsi: values.deskripsi,
        filosofi: values.filosofi,
        umkm_id: Number(values.umkm),
        images: finalImages,
      },
    });

    toast.success("Produk berhasil diperbarui", {
      description: `Katalog ${values.nama} telah diperbarui dalam sistem.`,
    });

    navigateTo("/katalog");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error("Gagal memperbarui produk", {
      description: error.message || "Terjadi kesalahan pada server.",
    });
  }
});
</script>

<template>
  <div class="space-y-8 pb-20">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/katalog"
          class="size-10 border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft class="w-4 h-4 text-stone-600" />
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-heading text-stone-900 uppercase">
            Edit <span class="text-amber-700">Katalog Produk</span>
          </h1>
          <p class="text-stone-500 font-body text-xs mt-1">
            Perbarui detail informasi batik untuk dipublikasikan ke katalog.
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <!-- Main Info -->
      <div class="bg-white border border-stone-200 p-8 space-y-6">
        <div class="flex items-center gap-2 border-b border-stone-100 pb-4">
          <Info class="w-4 h-4 text-amber-600" />
          <h2
            class="text-sm font-bold text-stone-900 uppercase tracking-widest"
          >
            Informasi Dasar
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label
              class="text-xs font-bold text-stone-400 uppercase tracking-widest"
              >Nama Batik</label
            >
            <Input
              v-model="nama"
              placeholder="Contoh: Batik Parang Kencana"
              class="h-12 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
            />
            <p
              v-if="errors.nama"
              class="text-xs text-rose-600 font-bold uppercase tracking-wider"
            >
              {{ errors.nama }}
            </p>
          </div>

          <div class="space-y-2">
            <label
              class="text-xs font-bold text-stone-400 uppercase tracking-widest"
              >Asal Daerah</label
            >
            <Select v-model="asal">
              <SelectTrigger
                class="h-12 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20 w-full"
              >
                <SelectValue placeholder="Pilih Asal Daerah" />
              </SelectTrigger>
              <SelectContent class="rounded-none border-stone-200 shadow-xl">
                <SelectItem
                  v-for="item in asalOptions"
                  :key="item"
                  :value="item"
                >
                  {{ item }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p
              v-if="errors.asal"
              class="text-xs text-rose-600 font-bold uppercase tracking-wider"
            >
              {{ errors.asal }}
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <label
            class="text-xs font-bold text-stone-400 uppercase tracking-widest"
            >Ringkasan Produk</label
          >
          <Input
            v-model="ringkasan"
            placeholder="Contoh: Batik tulis eksklusif dengan motif klasik..."
            class="h-12 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
          />
          <p
            v-if="errors.ringkasan"
            class="text-xs text-rose-600 font-bold uppercase tracking-wider"
          >
            {{ errors.ringkasan }}
          </p>
        </div>

        <div class="space-y-2">
          <label
            class="text-xs font-bold text-stone-400 uppercase tracking-widest"
            >Deskripsi Produk</label
          >
          <Textarea
            v-model="deskripsi"
            placeholder="Jelaskan detail fisik, warna, dan jenis bahan batik..."
            class="min-h-30 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
          />
          <p
            v-if="errors.deskripsi"
            class="text-xs text-rose-600 font-bold uppercase tracking-wider"
          >
            {{ errors.deskripsi }}
          </p>
        </div>

        <div class="space-y-2">
          <label
            class="text-xs font-bold text-stone-400 uppercase tracking-widest"
            >Filosofi Motif</label
          >
          <Textarea
            v-model="filosofi"
            placeholder="Ceritakan makna mendalam di balik motif batik ini..."
            class="min-h-30 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
          />
          <p
            v-if="errors.filosofi"
            class="text-xs text-rose-600 font-bold uppercase tracking-wider"
          >
            {{ errors.filosofi }}
          </p>
        </div>

        <div class="space-y-2">
          <label
            class="text-xs font-bold text-stone-400 uppercase tracking-widest"
            >UMKM Pengrajin</label
          >
          <Select v-model="umkm">
            <SelectTrigger
              class="h-12 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20 w-full"
            >
              <SelectValue placeholder="Pilih UMKM Mitra" />
            </SelectTrigger>
            <SelectContent class="rounded-none border-stone-200 shadow-xl">
              <SelectItem
                v-for="opt in umkmOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <p
            v-if="errors.umkm"
            class="text-xs text-rose-600 font-bold uppercase tracking-wider"
          >
            {{ errors.umkm }}
          </p>
        </div>
      </div>

      <!-- Media Section -->
      <div class="bg-white border border-stone-200 p-8 space-y-6">
        <div class="flex items-center gap-2 border-b border-stone-100 pb-4">
          <ImageIcon class="w-4 h-4 text-amber-600" />
          <h2
            class="text-sm font-bold text-stone-900 uppercase tracking-widest"
          >
            Media Katalog
          </h2>
        </div>

        <ImageDropzone
          :model-value="(images as any) || []"
          @update:model-value="images = $event"
        />
        <p
          v-if="errors.images"
          class="text-xs text-rose-600 font-bold uppercase tracking-wider"
        >
          {{ errors.images }}
        </p>
      </div>

      <!-- Submit Section -->
      <Button
        variant="primary"
        size="lg"
        class="w-full md:w-auto min-w-50"
        :disabled="isSubmitting"
        @click="onSubmit"
      >
        <Save v-if="!isSubmitting" class="size-5 mr-2" />
        <Loader2 v-else class="size-5 mr-2 animate-spin" />
        {{ isSubmitting ? "Memperbarui..." : "Simpan Perubahan" }}
      </Button>
    </div>
  </div>
</template>
