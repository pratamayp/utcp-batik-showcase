<script setup lang="ts">
import { ArrowLeft, Save, Info, Image as ImageIcon } from "lucide-vue-next";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

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

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const schema = toTypedSchema(
  z.object({
    nama: z.string().min(1, "Nama produk wajib diisi"),
    asal: z.string().min(1, "Asal daerah wajib diisi"),
    deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
    filosofi: z.string().min(10, "Filosofi minimal 10 karakter"),
    umkm: z.string().min(1, "Silahkan pilih UMKM"),
    images: z.array(z.any()).min(1, "Minimal harus mengunggah 1 gambar produk"),
  }),
);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    nama: "",
    asal: "",
    deskripsi: "",
    filosofi: "",
    umkm: "",
    images: [],
  },
});

const [nama] = defineField("nama");
const [asal] = defineField("asal");
const [deskripsi] = defineField("deskripsi");
const [filosofi] = defineField("filosofi");
const [umkm] = defineField("umkm");
const [images] = defineField("images");

const umkmOptions = [
  { label: "Batik Solo Indah", value: "solo-indah" },
  { label: "Cirebon Heritage", value: "cirebon-heritage" },
  { label: "Jogja Art", value: "jogja-art" },
  { label: "Pekalongan Jaya", value: "pekalongan-jaya" },
];

const onSubmit = handleSubmit((values) => {
  console.log("Form Submitted:", values);
  // Implementation for API call would go here
  alert("Produk berhasil ditambahkan (simulasi)");
  navigateTo("/katalog");
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
            Tambah <span class="text-amber-700">Produk Baru</span>
          </h1>
          <p class="text-stone-500 font-body text-xs mt-1">
            Lengkapi detail informasi batik untuk dipublikasikan ke katalog.
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
              class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
              >Nama Batik</label
            >
            <Input
              v-model="nama"
              placeholder="Contoh: Batik Parang Kencana"
              class="h-12 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
            />
            <p
              v-if="errors.nama"
              class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
            >
              {{ errors.nama }}
            </p>
          </div>

          <div class="space-y-2">
            <label
              class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
              >Asal Daerah</label
            >
            <Input
              v-model="asal"
              placeholder="Contoh: Solo, Jawa Tengah"
              class="h-12 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
            />
            <p
              v-if="errors.asal"
              class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
            >
              {{ errors.asal }}
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <label
            class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
            >Deskripsi Produk</label
          >
          <Textarea
            v-model="deskripsi"
            placeholder="Jelaskan detail fisik, warna, dan jenis bahan batik..."
            class="min-h-30 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
          />
          <p
            v-if="errors.deskripsi"
            class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
          >
            {{ errors.deskripsi }}
          </p>
        </div>

        <div class="space-y-2">
          <label
            class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
            >Filosofi Motif</label
          >
          <Textarea
            v-model="filosofi"
            placeholder="Ceritakan makna mendalam di balik motif batik ini..."
            class="min-h-30 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
          />
          <p
            v-if="errors.filosofi"
            class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
          >
            {{ errors.filosofi }}
          </p>
        </div>

        <div class="space-y-2">
          <label
            class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
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
                class="rounded-none text-xs font-bold uppercase tracking-widest text-stone-600 focus:bg-amber-50 focus:text-amber-900 cursor-pointer"
              >
                {{ opt.label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <p
            v-if="errors.umkm"
            class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
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

        <ImageDropzone v-model="images as File[]" />
        <p
          v-if="errors.images"
          class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
        >
          {{ errors.images }}
        </p>
      </div>

      <!-- Submit Section -->
      <Button
        variant="primary"
        size="lg"
        class="w-full md:w-auto min-w-50"
        @click="onSubmit"
      >
        <Save class="size-5 mr-2" />
        Simpan Produk
      </Button>
    </div>
  </div>
</template>
