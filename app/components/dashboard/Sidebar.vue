<script setup lang="ts">
import { menuItems } from "~/lib/menu";
</script>

<template>
  <div
    class="flex h-full flex-col gap-y-5 overflow-y-auto border-r border-stone-200 bg-white px-6 pb-4 selection:bg-amber-100"
  >
    <div class="flex h-16 shrink-0 items-center border-b border-stone-50">
      <div class="flex items-center gap-2">
        <div
          class="size-8 bg-amber-600 flex items-center justify-center text-white font-heading font-bold"
        >
          B
        </div>
        <span
          class="text-lg font-heading text-stone-900 tracking-wider uppercase"
          >E-Katalog <span class="text-amber-700">Batik</span></span
        >
      </div>
    </div>
    <nav class="flex flex-1 flex-col pt-4">
      <ul role="list" class="flex flex-1 flex-col gap-y-6">
        <li>
          <ul role="list" class="-mx-2 space-y-1.5">
            <li v-for="item in menuItems" :key="item.name">
              <NuxtLink
                :to="item.href"
                active-class="bg-amber-50 text-amber-900 border-r-4 border-amber-600"
                class="group flex gap-x-3 rounded-none p-3 text-xs leading-6 font-bold uppercase tracking-widest text-stone-600 hover:text-amber-700 hover:bg-stone-50 transition-all"
              >
                <component
                  :is="item.icon"
                  class="h-5 w-5 shrink-0 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
