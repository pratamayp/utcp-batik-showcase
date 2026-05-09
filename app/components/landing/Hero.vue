<template>
  <section class="relative h-dvh w-full flex items-center overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="/images/hero.webp"
        alt="Batik Showcase Hero"
        class="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
      />
      <!-- Gradient Overlay for better text readability -->
      <div
        class="absolute inset-0 bg-black/40 bg-linear-to-r from-black/70 via-black/30 to-transparent"
      ></div>
    </div>

    <!-- Content Area -->
    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="max-w-3xl transform -translate-y-4">
        <!-- Subheading / Tagline -->
        <div class="flex items-center gap-3 mb-6 animate-fade-in-up">
          <span class="h-px w-8 bg-amber-500"></span>
          <span
            class="text-amber-400 font-sans tracking-[0.2em] uppercase text-xs font-semibold"
            >Warisan Budaya Nusantara</span
          >
        </div>

        <h1
          class="text-3xl md:text-6xl lg:text-5xl 2xl:text-7xl font-heading text-white leading-[1.1] mb-8 animate-fade-in-up"
          style="animation-delay: 200ms"
        >
          Melestarikan Budaya,<br />
          <span class="text-amber-200">Menguatkan Ekonomi Lokal.</span>
        </h1>

        <p
          class="text-base md:text-lg text-stone-200 font-body leading-relaxed max-w-2xl animate-fade-in-up"
          style="animation-delay: 400ms"
        >
          Keberlanjutan batik nusantara bergantung pada apresiasi generasi muda
          dan kemandirian para perajin. Inisiatif ini hadir untuk memperluas
          jangkauan UMKM sekaligus memperkenalkan kedalaman filosofi batik
          sebagai identitas bangsa yang dinamis.
        </p>

        <!-- CTA Buttons -->
        <div
          class="mt-12 flex flex-wrap gap-4 items-center animate-fade-in-up"
          style="animation-delay: 600ms"
        >
          <Button variant="hero" size="lg" rounded="none">
            Jelajahi Koleksi
          </Button>

          <NuxtLink to="/about">
            <Button variant="outline" size="lg" rounded="none">
              Tentang Kami
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div
      class="absolute bottom-12 right-12 hidden lg:block animate-fade-in"
      style="animation-delay: 1000ms"
    >
      <div
        class="flex flex-col items-end text-white/40 font-serif italic text-sm"
      >
        <span>Est. 2024</span>
        <span>E-Katalog Batik</span>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
    >
      <span
        class="text-white text-[10px] uppercase tracking-[0.3em] font-semibold"
        >Scroll</span
      >
      <div class="w-px h-16 bg-linear-to-b from-amber-500 to-transparent"></div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slowZoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1.5s ease-out forwards;
}

.animate-slow-zoom {
  animation: slowZoom 20s linear infinite alternate;
}
</style>
