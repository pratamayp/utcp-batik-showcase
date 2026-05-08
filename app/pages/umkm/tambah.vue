<script setup lang="ts">
import {
  ArrowLeft,
  Save,
  Building2,
  Phone,
  MapPin,
  Loader2,
  Instagram,
} from "lucide-vue-next";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/Input.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";

import { toast } from "vue-sonner";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Nama UMKM wajib diisi"),
    contact: z.string().min(5, "Nomor kontak minimal 5 digit"),
    instagram: z.string().optional(),
    location: z.string().min(5, "Alamat lengkap minimal 5 karakter"),
    description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  }),
);

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    contact: "",
    instagram: "",
    location: "",
    description: "",
  },
});

const [name] = defineField("name");
const [contact] = defineField("contact");
const [instagram] = defineField("instagram");
const [location] = defineField("location");
const [description] = defineField("description");

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch("/api/umkm", {
      method: "POST",
      body: {
        nama: values.name,
        no_hp: values.contact,
        instagram: values.instagram,
        lokasi: values.location,
        deskripsi: values.description,
        is_active: true,
      },
    });

    toast.success("Mitra UMKM berhasil ditambahkan", {
      description: `UMKM ${values.name} telah terdaftar dalam sistem.`,
    });

    navigateTo("/umkm");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error("Gagal menambahkan UMKM", {
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
          to="/umkm"
          class="size-10 border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft class="w-4 h-4 text-stone-600" />
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-heading text-stone-900 uppercase">
            Tambah <span class="text-amber-700">Mitra UMKM</span>
          </h1>
          <p class="text-stone-500 font-body text-xs mt-1">
            Daftarkan mitra pengrajin baru ke dalam sistem ekosistem Batik.
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <!-- Main Form Section -->
      <div class="bg-white border border-stone-200 p-8 space-y-8">
        <div class="flex items-center gap-2 border-b border-stone-100 pb-4">
          <Building2 class="w-4 h-4 text-amber-600" />
          <h2
            class="text-sm font-bold text-stone-900 uppercase tracking-widest"
          >
            Informasi Profil UMKM
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Nama UMKM -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <label
                class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
                >Nama Lengkap UMKM</label
              >
            </div>
            <Input
              v-model="name"
              placeholder="Contoh: Batik Solo Indah"
              class="h-12 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
            />
            <p
              v-if="errors.name"
              class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
            >
              {{ errors.name }}
            </p>
          </div>

          <!-- Kontak -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <label
                class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
                >Nomor HP / WhatsApp</label
              >
            </div>
            <div class="relative group">
              <div
                class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors"
              >
                <Phone class="w-3.5 h-3.5" />
              </div>
              <Input
                v-model="contact"
                placeholder="Contoh: 081234567890"
                class="h-12 pl-12 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
              />
            </div>
            <p
              v-if="errors.contact"
              class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
            >
              {{ errors.contact }}
            </p>
          </div>

          <!-- Instagram -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <label
                class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
                >Username Instagram</label
              >
            </div>
            <div class="relative group">
              <div
                class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors"
              >
                <Instagram class="w-3.5 h-3.5" />
              </div>
              <Input
                v-model="instagram"
                placeholder="Contoh: @batik.solo.indah"
                class="h-12 pl-12 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
              />
            </div>
            <p
              v-if="errors.instagram"
              class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
            >
              {{ errors.instagram }}
            </p>
          </div>
        </div>

        <!-- Alamat / Lokasi -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <label
              class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
              >Alamat Operasional</label
            >
          </div>
          <div class="relative group">
            <div
              class="absolute left-4 top-4 text-stone-400 group-focus-within:text-amber-600 transition-colors"
            >
              <MapPin class="w-3.5 h-3.5" />
            </div>
            <Textarea
              v-model="location"
              placeholder="Jalan, Kelurahan, Kecamatan, Kota..."
              class="min-h-25 pl-12 pt-3 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
            />
          </div>
          <p
            v-if="errors.location"
            class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
          >
            {{ errors.location }}
          </p>
        </div>

        <!-- Deskripsi -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-bold text-stone-400 uppercase tracking-widest"
            >Deskripsi Singkat UMKM</label
          >
          <Textarea
            v-model="description"
            placeholder="Ceritakan sejarah singkat atau spesialisasi teknik batik UMKM ini..."
            class="min-h-37.5 rounded-none border-stone-200 focus:border-amber-600 focus:ring-amber-600/20"
          />
          <p
            v-if="errors.description"
            class="text-[10px] text-rose-600 font-bold uppercase tracking-wider"
          >
            {{ errors.description }}
          </p>
        </div>
      </div>

      <!-- Action Section -->
      <div class="">
        <Button
          variant="primary"
          size="lg"
          class="w-full md:w-auto min-w-50"
          :disabled="isSubmitting"
          @click="onSubmit"
        >
          <Save v-if="!isSubmitting" class="size-5 mr-2" />
          <Loader2 v-else class="size-5 mr-2 animate-spin" />
          {{ isSubmitting ? "Menyimpan..." : "Tambah UMKM" }}
        </Button>
      </div>
    </div>
  </div>
</template>
