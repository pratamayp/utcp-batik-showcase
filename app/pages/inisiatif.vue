<template>
  <main
    class="min-h-screen bg-stone-50 selection:bg-amber-100 selection:text-amber-900 font-sans overflow-x-hidden"
  >
    <!-- Header / Navigation Back -->
    <header class="container mx-auto py-10 px-6 md:px-12 relative z-10">
      <NuxtLink
        to="/"
        class="group inline-flex items-center text-amber-600 text-xs font-bold uppercase tracking-[0.2em] hover:text-amber-800 transition-colors duration-300 gap-x-3"
      >
        <ArrowLeft
          class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5"
        />
        Kembali ke Beranda
      </NuxtLink>
    </header>
    <!-- Two Pillars Section: Side by Side contrast -->
    <section class="py-16 bg-stone-100 border-b border-stone-200">
      <div class="container mx-auto px-6 md:px-12">
        <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-heading text-stone-900">
            Pilar Utama Inisiatif Kami
          </h2>
          <p class="text-stone-600 font-body leading-relaxed">
            Inisiatif ini dirancang secara berimbang untuk merawat tradisi masa
            lalu sekaligus mengamankan kemakmuran masa depan.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <!-- Pillar 1: Cultural Preservation -->
          <div
            class="bg-white border border-stone-200 p-8 md:p-12 flex flex-col justify-between hover:border-amber-600/40 hover:shadow-xl transition-all duration-500 rounded-lg group"
          >
            <div class="space-y-6">
              <div
                class="inline-flex p-4 bg-amber-50 rounded-full text-amber-700"
              >
                <BookOpen class="h-8 w-8" />
              </div>
              <h3
                class="text-2xl font-heading text-stone-900 group-hover:text-amber-800 transition-colors"
              >
                Eksplorasi &amp; Pelestarian Budaya
              </h3>
              <p class="text-stone-600 font-body leading-relaxed text-base">
                Menjembatani jarak generasi. Kami mengemas ulang kisah, filosofi
                mendalam, serta makna spiritual di balik corak-corak batik
                klasik ke dalam visualisasi digital yang memikat. Melalui
                pendekatan interaktif ini, kami memastikan bahwa Generasi Z
                &amp; Alpha tidak hanya melihat selembar kain, melainkan
                memahami jiwa dan kekayaan intelektual leluhur mereka.
              </p>
            </div>
          </div>

          <!-- Pillar 2: Economic Empowerment -->
          <div
            class="bg-white border border-stone-200 p-8 md:p-12 flex flex-col justify-between hover:border-amber-600/40 hover:shadow-xl transition-all duration-500 rounded-lg group"
          >
            <div class="space-y-6">
              <div
                class="inline-flex p-4 bg-amber-50 rounded-full text-amber-700"
              >
                <Sparkles class="h-8 w-8" />
              </div>
              <h3
                class="text-2xl font-heading text-stone-900 group-hover:text-amber-800 transition-colors"
              >
                Pemberdayaan UMKM
              </h3>
              <p class="text-stone-600 font-body leading-relaxed text-base">
                Mendorong kemandirian ekonomi perajin. Kami menyediakan
                infrastruktur promosi digital yang modern, efektif, dan
                profesional untuk pelaku UMKM lokal. Dengan etalase global ini,
                para pengrajin batik tradisional dapat menjangkau pasar yang
                jauh lebih luas secara langsung tanpa perantara yang merugikan,
                memperkuat kedaulatan ekonomi kreatif lokal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Focus Areas (3 columns grid) -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-6 md:px-12">
        <div class="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div
            class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600"
          >
            <Award class="h-4 w-4" /> Fokus Utama Aksi
          </div>
          <h2 class="text-3xl md:text-4xl font-heading text-stone-900">
            Bagaimana Kami Mewujudkannya?
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- Item 1 -->
          <div
            class="space-y-4 p-6 border-l-2 border-stone-200 hover:border-amber-600 transition-colors duration-300"
          >
            <h4 class="text-xl font-heading text-stone-900 font-bold">
              1. Mencatat dan Menjaga Keaslian Batik
            </h4>
            <p class="text-stone-600 font-body leading-relaxed">
              Kami melakukan pencatatan menyeluruh terhadap setiap detail kain batik,
              mulai dari asal-usul daerahnya, nama perajin yang membuatnya, hingga teknik
              pembuatan yang digunakan seperti tulis tangan, cap tembaga, maupun kombinasinya.
              Hal ini bertujuan agar keaslian karya seni tradisional tetap terlindungi, serta
              mencegah klaim sepihak dan pemalsuan motif di era digital.
            </p>
          </div>

          <!-- Item 2 -->
          <div
            class="space-y-4 p-6 border-l-2 border-stone-200 hover:border-amber-600 transition-colors duration-300"
          >
            <h4 class="text-xl font-heading text-stone-900 font-bold">
              2. Menceritakan Makna di Balik Motif
            </h4>
            <p class="text-stone-600 font-body leading-relaxed">
              Setiap goresan lilin malam pada selembar kain batik menyimpan doa, harapan,
              status sosial, hingga sejarah leluhur yang sangat mendalam. Kami merangkum cerita,
              makna simbolis, dan nilai filosofis di balik berbagai motif klasik nusantara secara
              informatif dan menarik agar mudah dinikmati sekaligus dipelajari oleh generasi muda.
            </p>
          </div>

          <!-- Item 3 -->
          <div
            class="space-y-4 p-6 border-l-2 border-stone-200 hover:border-amber-600 transition-colors duration-300"
          >
            <h4 class="text-xl font-heading text-stone-900 font-bold">
              3. Menghubungkan Pembeli Langsung ke Perajin
            </h4>
            <p class="text-stone-600 font-body leading-relaxed">
              Kami memotong rantai distribusi pemasaran dengan cara menyediakan kontak informasi
              resmi dan sosial media perajin lokal langsung pada setiap halaman katalog produk.
              Dengan demikian, Anda dapat berkomunikasi dan bertransaksi secara langsung untuk mendukung
              kelangsungan usaha mikro mereka tanpa potongan biaya pihak ketiga.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Visual Banner / CTA Section -->
    <section class="py-20 bg-stone-100 border-t border-stone-200 text-center">
      <div class="container mx-auto px-6 md:px-12 space-y-6">
        <h2
          class="text-3xl md:text-4xl font-heading text-stone-900 leading-tight max-w-3xl mx-auto"
        >
          Mari Menjadi Bagian dari Perjalanan Warisan Budaya Ini
        </h2>
        <p
          class="text-stone-600 font-body max-w-xl mx-auto text-base leading-relaxed"
        >
          Setiap kunjungan, apresiasi, dan pembelian produk UMKM batik adalah
          langkah nyata kita dalam melestarikan jati diri bangsa.
        </p>

        <div class="pt-4">
          <NuxtLink to="/#catalogue">
            <Button
              variant="primary"
              size="lg"
              rounded="none"
              class="group/btn px-6 md:px-12"
            >
              Jelajahi Katalog Koleksi
              <ArrowRight
                class="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1.5"
              />
            </Button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <LandingFooter />
  </main>
</template>

<script setup>
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Award,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";

// Optional page meta to set beautiful titles and descriptions for SEO
useSeoMeta({
  title: "Inisiatif & Visi Kami | E-Catalog Batik Nusantara",
  description:
    "Membangun ruang sinergi antara pelestarian budaya batik nusantara bagi Gen Z & Alpha, serta pemberdayaan ekonomi digital bagi pelaku UMKM lokal.",
  ogTitle: "Inisiatif & Visi Kami | E-Catalog Batik Nusantara",
  ogDescription:
    "Membangun ruang sinergi antara pelestarian budaya batik nusantara bagi Gen Z & Alpha, serta pemberdayaan ekonomi digital bagi pelaku UMKM lokal.",
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}
</style>
