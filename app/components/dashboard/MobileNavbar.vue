<script setup lang="ts">
import { Menu } from "lucide-vue-next";
import { menuItems } from "@/lib/menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
</script>

<template>
  <Sheet>
    <!-- Hamburger Menu Button -->
    <SheetTrigger as-child>
      <button
        type="button"
        class="block lg:hidden -m-2.5 p-2.5 text-stone-700 hover:text-amber-700 transition-colors"
      >
        <span class="sr-only">Open mobile menu</span>
        <Menu class="h-6 w-6" aria-hidden="true" />
      </button>
    </SheetTrigger>

    <!-- The Sliding Sidebar -->
    <SheetContent
      side="left"
      class="w-72 bg-white p-0 border-r border-stone-200 rounded-none"
    >
      <div class="flex h-full flex-col gap-y-5 overflow-y-auto px-6 pb-4">
        <!-- Mobile Logo -->
        <div class="flex h-20 shrink-0 items-center border-b border-stone-50">
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

        <!-- Mobile Navigation Links -->
        <nav class="flex flex-1 flex-col pt-4">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
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
        <div class="mt-auto pt-6 border-t border-stone-100">
          <p
            class="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-[0.2em]"
          >
            Capstone Project &copy; 2026
          </p>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
