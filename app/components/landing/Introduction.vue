<template>
  <section id="about" class="py-24 md:py-32 bg-white overflow-hidden">
    <div class="container mx-auto px-6 md:px-12">
      <!-- Top Section: Heading and Lead Description -->
      <div class="flex flex-col lg:flex-row gap-12 mb-20">
        <div class="w-full lg:w-8/12 relative b">
          <h2
            class="text-4xl lg:text-5xl 2xl:text-6xl font-heading text-stone-900 leading-tight mb-6"
          >
            Eksplorasi Mahakarya <br />
            <span class="text-amber-700 italic">Batik Nusantara</span>
          </h2>
          <div class="h-1.5 w-24 bg-amber-600"></div>

          <!-- Decorative Background Text -->
          <!-- <div
            class="absolute -left-20 -top-20 opacity-[0.025] select-none pointer-events-none hidden xl:block"
          >
            <span
              class="text-[200px] font-heading font-bold text-stone-900 leading-none"
              >BATIK NUSANTARA</span
            >
          </div> -->
        </div>

        <!-- Commented code preserved. Replaced lg:col-span-5 with lg:w-5/12 -->
        <!-- <div class="w-full lg:w-5/12 pt-4 lg:pt-12">
          <p class="text-xl text-stone-700 font-body leading-relaxed">
            Platform ini menyajikan kurasi batik terbaik yang dihimpun dari
            berbagai penjuru Indonesia, mulai dari pesisir hingga pedalaman.
            Setiap helai kain merupakan representasi dari kekayaan budaya daerah
            yang autentik.
          </p>
        </div> -->
      </div>

      <!-- Bottom Section: Creative Card and Highlight Box in one row -->
      <!-- Changed from grid-cols-2 to flex. -->
      <div class="flex flex-col lg:flex-row gap-y-10 gap-x-20 items-stretch">
        <!-- Pattern Block (Creative Card) -->
        <!-- Added w-full lg:w-1/2 to take up exactly half the space on desktop -->
        <div
          class="w-full lg:w-1/2 relative aspect-video lg:aspect-auto bg-stone-50 border border-stone-200 overflow-hidden group shadow-2xl shadow-stone-200/50"
        >
          <div
            class="absolute inset-0 bg-linear-to-tr from-amber-50/50 to-stone-50"
          ></div>
          <div
            class="absolute inset-0 opacity-[0.08] group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
          >
            <img
              src="/images/parang-pattern.webp"
              alt="Parang Pattern Background"
              class="w-full h-full object-cover scale-150 rotate-12"
            />
          </div>
          <div class="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
            <div
              class="bg-white/90 backdrop-blur-md border border-white p-6 shadow-xl transform transition-transform duration-500"
            >
              <div class="flex items-start gap-4">
                <span class="text-4xl text-amber-600 font-serif">“</span>
                <p
                  class="text-stone-800 font-serif italic text-sm lg:text-lg leading-relaxed"
                >
                  Setiap helai kain adalah narasi dari identitas bangsa yang
                  dinamis, terukir dalam keabadian tradisi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Text and Button Block -->
        <div
          class="w-full lg:w-1/2 flex flex-col justify-between relative overflow-hidden group"
        >
          <div class="relative z-10 space-y-6">
            <p class="font-body font-medium leading-relaxed text-xl">
              Kehadiran showcase digital ini menjadi jembatan bagi para pelaku
              UMKM untuk memperkenalkan karya unggulan mereka ke pasar yang
              lebih luas.
            </p>
            <p class="text-stone-400 font-body leading-relaxed text-base">
              Dengan mengedepankan kualitas pengerjaan tradisional yang
              dipadukan dengan manajemen modern, inisiatif ini bertujuan untuk
              memperkuat posisi perajin lokal dalam rantai nilai ekonomi kreatif
              global, sekaligus memastikan regenerasi keahlian membatik tetap
              terjaga.
            </p>
            <div class="pt-4">
              <NuxtLink to="/inisiatif">
                <Button
                  variant="primary"
                  size="lg"
                  rounded="none"
                  class="group/btn px-10"
                >
                  Pelajari Inisiatif Kami
                  <ArrowRight
                    class="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1.5"
                  />
                </Button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
</script>
