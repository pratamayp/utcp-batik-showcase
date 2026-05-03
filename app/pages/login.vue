<script setup lang="ts">
import { Mail, Lock, ArrowLeft, ArrowRight } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";

definePageMeta({
  middleware: ["guest"],
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    navigateTo("/overview");
  }
});

const isVisible = ref(false);
const authError = ref("");

// Define validation schema
const schema = toTypedSchema(
  z.object({
    email: z.email("Format email tidak valid").min(1, "Email wajib diisi"),
    password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  }),
);

// Initialize form
const form = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    password: "",
  },
});

const { handleSubmit, errors, defineField, isSubmitting, submitCount } = form;

// Define fields with v-model compatibility
const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  authError.value = "";
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    authError.value = "Email atau kata sandi tidak valid.";
  }
  // If successful, the watchEffect will handle the redirect once the user state updates
});
</script>

<template>
  <div class="min-h-screen bg-white flex overflow-hidden">
    <!-- Left Side: Visual/Decorative -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-stone-900 overflow-hidden">
      <div class="absolute inset-0 opacity-40">
        <img
          src="/images/login.webp"
          alt="Batik Background"
          class="w-full h-full object-cover object-left grayscale transition-transform duration-[10s] hover:scale-110"
        />
      </div>
      <div
        class="absolute inset-0 bg-linear-to-t from-stone-900 via-transparent to-transparent"
      ></div>

      <div
        class="relative z-10 w-full h-full flex flex-col justify-between p-16"
      >
        <NuxtLink
          to="/"
          class="inline-flex items-center text-amber-500 text-xs font-sans font-bold uppercase tracking-[0.2em] hover:text-amber-400 transition-colors"
        >
          <ArrowLeft class="mr-2 h-4 w-4" />
          Beranda
        </NuxtLink>

        <div class="space-y-6">
          <div class="h-1 w-16 bg-amber-600"></div>
          <h2
            class="text-4xl md:text-5xl font-heading text-white leading-tight"
          >
            Akses Panel <br />
            <span class="text-amber-500">Administrator.</span>
          </h2>
          <p class="text-stone-400 font-body max-w-md leading-relaxed">
            Kelola katalog koleksi, pantau statistik, dan kelola kemitraan UMKM
            dalam satu dashboard terintegrasi.
          </p>
        </div>

        <div
          class="text-stone-500 text-[10px] font-sans uppercase tracking-[0.2em]"
        >
          &copy; 2026 E-Katalog Batik — Capstone Project
        </div>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div
      class="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-stone-50"
    >
      <div class="w-full max-w-md space-y-12">
        <NuxtLink
          to="/"
          class="lg:hidden inline-flex items-center text-amber-700 text-xs font-sans font-bold uppercase tracking-[0.2em] mb-8"
        >
          <ArrowLeft class="mr-2 h-4 w-4" />
          Beranda
        </NuxtLink>

        <div class="space-y-2">
          <h3 class="text-3xl font-heading text-stone-900">Selamat Datang</h3>
          <p class="text-stone-500 font-body">
            Silakan masuk menggunakan akun administrator Anda.
          </p>
        </div>

        <form class="space-y-6" @submit="onSubmit">
          <div
            v-if="authError"
            class="p-4 rounded-md bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20"
          >
            {{ authError }}
          </div>

          <div class="space-y-5">
            <!-- Email Input -->
            <div class="space-y-2">
              <label
                for="email"
                class="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest ml-1"
                >Alamat Email</label
              >
              <InputGroup
                class="h-14"
                :class="{
                  'border-destructive ring-destructive/20 ring-[3px]':
                    submitCount > 0 && errors?.email,
                }"
              >
                <div data-align="inline-start" class="pl-4 pr-2 text-stone-400">
                  <Mail class="w-4 h-4" />
                </div>
                <Input
                  id="email"
                  v-model="email"
                  v-bind="emailProps"
                  placeholder="admin@batik.com"
                  class="border-none shadow-none focus-visible:ring-0 h-full"
                />
              </InputGroup>
              <p
                v-if="submitCount > 0 && errors?.email"
                class="text-[10px] text-destructive font-bold uppercase tracking-wider ml-1 mt-1"
              >
                {{ errors.email }}
              </p>
            </div>

            <!-- Password Input -->
            <div class="space-y-4">
              <div class="space-y-2">
                <label
                  for="password"
                  class="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest ml-1"
                  >Kata sandi</label
                >
                <InputGroup
                  class="h-14"
                  :class="{
                    'border-destructive ring-destructive/20 ring-[3px]':
                      submitCount > 0 && errors?.password,
                  }"
                >
                  <div
                    data-align="inline-start"
                    class="pl-4 pr-2 text-stone-400"
                  >
                    <Lock class="w-4 h-4" />
                  </div>
                  <Input
                    id="password"
                    v-model="password"
                    v-bind="passwordProps"
                    :type="isVisible ? 'text' : 'password'"
                    placeholder="••••••••"
                    class="border-none shadow-none focus-visible:ring-0 h-full"
                  />
                </InputGroup>
                <p
                  v-if="submitCount > 0 && errors?.password"
                  class="text-[10px] text-destructive font-bold uppercase tracking-wider ml-1 mt-1"
                >
                  {{ errors.password }}
                </p>
              </div>

              <!-- Show Password Checkbox -->
              <div class="flex items-center gap-3 px-1">
                <Checkbox id="show-password" v-model:checked="isVisible" />
                <label
                  for="show-password"
                  class="text-xs font-sans font-bold text-stone-500 uppercase tracking-widest cursor-pointer select-none"
                >
                  Tampilkan Kata Sandi
                </label>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              rounded="none"
              class="w-full h-14 group"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Sedang Memproses...</span>
              <span v-else class="flex items-center">
                Masuk ke Dashboard
                <ArrowRight
                  class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
