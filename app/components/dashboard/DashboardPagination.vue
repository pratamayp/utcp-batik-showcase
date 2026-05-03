<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

defineProps<{
  total: number;
  itemsPerPage: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: "update:currentPage", value: number): void;
}>();
</script>

<template>
  <div class="flex items-center justify-between px-2 py-2">
    <p
      class="text-[10px] font-bold text-stone-400 text-nowrap uppercase tracking-widest"
    >
      Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} -
      {{ Math.min(currentPage * itemsPerPage, total) }} dari {{ total }} Data
    </p>

    <Pagination
      :total="total"
      :items-per-page="itemsPerPage"
      :sibling-count="1"
      show-edges
      :default-page="currentPage"
      class="justify-end"
      @update:page="emit('update:currentPage', $event)"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious
          class="rounded-none border-stone-200 text-stone-600 hover:bg-stone-50"
        />

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === currentPage"
            :class="[
              'rounded-none border-stone-200 min-w-10 h-10 font-bold text-xs uppercase tracking-widest',
              item.value === currentPage
                ? 'bg-amber-600 border-amber-600 text-white hover:bg-amber-700 hover:text-white hover:border-amber-700'
                : 'text-stone-600 hover:bg-stone-50',
            ]"
          >
            {{ item.value }}
          </PaginationItem>
          <PaginationEllipsis v-else :index="index" class="text-stone-400" />
        </template>

        <PaginationNext
          class="rounded-none border-stone-200 text-stone-600 hover:bg-stone-50"
        />
      </PaginationContent>
    </Pagination>
  </div>
</template>
