<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { MobileNavbar } from "@/components/dashboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
</script>

<template>
  <header
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-stone-200 bg-white/90 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8"
  >
    <!-- Mobile Hamburger Menu -->
    <MobileNavbar class="lg:hidden" />

    <!-- Separator for mobile -->
    <div class="h-6 w-px bg-stone-200 lg:hidden" aria-hidden="true" />

    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
      <div class="flex items-center gap-x-4 lg:gap-x-6">
        <!-- User Profile Dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <button
              class="-m-1.5 flex items-center p-1.5 outline-none group cursor-pointer"
            >
              <span class="sr-only">Open user menu</span>
              <Avatar
                class="h-9 w-9 rounded-none transition-transform group-hover:scale-105"
              >
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback
                  class="text-amber-800 font-heading text-xs font-bold"
                  >AD</AvatarFallback
                >
              </Avatar>
              <span class="hidden lg:flex lg:items-center">
                <span
                  class="ml-4 text-xs font-sans font-bold uppercase tracking-widest text-stone-900 group-hover:text-amber-700 transition-colors"
                  aria-hidden="true"
                  >Administrator</span
                >
                <ChevronDown
                  class="ml-2 h-4 w-4 text-stone-400 group-hover:text-amber-600 transition-all group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            class="w-56 bg-white border-stone-200 rounded-none shadow-xl mt-1"
          >
            <DropdownMenuItem
              class="cursor-pointer hover:bg-stone-50 text-stone-600 focus:bg-amber-50 focus:text-amber-900"
              >Profil Pengguna</DropdownMenuItem
            >
            <DropdownMenuSeparator class="bg-stone-100" />
            <NuxtLink href="/login">
              <DropdownMenuItem
                class="cursor-pointer text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                >Keluar Panel
              </DropdownMenuItem>
            </NuxtLink>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
