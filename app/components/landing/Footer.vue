<template>
  <footer class="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
    <div class="container mx-auto px-6 md:px-12">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <!-- Brand & Tagline -->
        <div
          class="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
        >
          <div class="flex items-center gap-2">
            <!-- <div
              class="size-8 bg-amber-600 flex items-center justify-center text-white font-heading font-bold"
            >
              B
            </div> -->
            <span
              class="text-xl font-heading text-white tracking-wider uppercase"
              >E-Katalog Batik</span
            >
          </div>
          <p class="text-sm font-body max-w-xs leading-relaxed">
            Melestarikan warisan budaya Indonesia melalui apresiasi digital dan
            pemberdayaan perajin lokal.
          </p>
        </div>

        <!-- Links (Simple) -->
        <div
          class="flex gap-8 text-xs font-sans font-bold uppercase tracking-widest"
        >
          <NuxtLink to="/" class="hover:text-amber-500 transition-colors">Beranda</NuxtLink>
          <NuxtLink to="/about" class="hover:text-amber-500 transition-colors"
            >Tentang</NuxtLink
          >
          <NuxtLink to="/#catalogue" class="hover:text-amber-500 transition-colors"
            >Katalog</NuxtLink
          >
        </div>

        <!-- Admin Access Link (Replaces Social Placeholders) -->
        <div class="flex items-center">
          <NuxtLink
            to="/login"
            class="text-xs font-sans font-bold uppercase tracking-[0.2em] px-6 py-3 border border-stone-800 hover:border-amber-600 hover:text-amber-500 transition-all"
          >
            Administrator
          </NuxtLink>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-sans uppercase tracking-[0.2em]"
      >
        <p>&copy; 2026 E-Katalog Batik. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>
