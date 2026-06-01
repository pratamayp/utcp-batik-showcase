<template>
  <main
    class="min-h-screen bg-stone-50 selection:bg-amber-100 selection:text-amber-900"
  >
    <!-- Header -->
    <div class="container mx-auto py-10 px-6 md:px-12 relative z-10">
      <NuxtLink
        to="/"
        class="inline-flex items-center text-amber-600 text-xs font-sans font-bold uppercase tracking-[0.2em] hover:text-amber-700 transition-colors gap-x-3"
      >
        <ArrowLeft class="h-4 w-4" />
        Kembali ke Beranda
      </NuxtLink>
    </div>

    <!-- Capstone Story Section -->
    <section class="">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            class="relative aspect-square bg-stone-200 overflow-hidden group"
          >
            <img
              src="/images/hero.webp"
              alt="Capstone Project"
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div class="absolute inset-0 border-20 border-white/20"></div>
          </div>
          <div class="space-y-8">
            <div class="space-y-4">
              <h2 class="text-3xl md:text-4xl font-heading text-stone-900">
                Capstone Project <br />
                <p class="text-stone-500 text-lg pt-1">Kelas 49 Kelompok A</p>
              </h2>
              <div class="h-1 w-20 bg-amber-600"></div>
            </div>
            <div
              class="space-y-6 text-stone-600 font-body leading-relaxed text-lg"
            >
              <p>
                Platform ini dikembangkan sebagai bagian dari Capstone Project
                perkuliahan kami. Berawal dari tantangan untuk menciptakan
                solusi digital yang berdampak sosial, kami memilih sektor
                industri kreatif batik sebagai fokus utama.
              </p>
              <p>
                Melalui proyek ini, kami belajar mengintegrasikan teknologi
                modern dengan kearifan lokal, menciptakan sistem katalog yang
                tidak hanya informatif tetapi juga mampu memberdayakan para
                perajin UMKM di berbagai sentra batik nusantara.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-24 bg-stone-100">
      <div class="container mx-auto px-6 md:px-12">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-heading text-stone-900 mb-6">
            Tim Pengembang
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div
            v-for="member in team"
            :key="member.nim"
            class="bg-white p-8 border border-stone-200 text-center space-y-2 hover:border-amber-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <h4 class="font-heading font-bold text-stone-900 text-base">
              {{ member.name }}
            </h4>
            <p
              class="text-amber-700 text-xs font-sans font-bold uppercase tracking-widest"
            >
              NIM. {{ member.nim }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <LandingFooter />
  </main>
</template>

<script setup>
import { ArrowLeft } from "lucide-vue-next";

const team = [
  { name: "Khaldaa Salsabila Nashira", nim: "047903991" },
  { name: "Muhammad Choirul Umam", nim: "048010983" },
  { name: "Naura Yasmin Ayyuni", nim: "048363252" },
  { name: "Roy Charly Lumbantoruan", nim: "051853913" },
  { name: "Yoga Pratama", nim: "053972828" },
];
</script>
