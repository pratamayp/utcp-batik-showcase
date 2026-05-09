<script setup lang="ts" generic="T">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Column {
  key: string;
  label: string;
  class?: string;
}

defineProps<{
  columns: Column[];
  data: T[];
  loading?: boolean;
}>();
</script>

<template>
  <div
    class="w-full bg-white border border-stone-200 rounded-none overflow-hidden"
  >
    <Table>
      <TableHeader class="bg-stone-50/50 border-b border-stone-100">
        <TableRow class="hover:bg-transparent border-none">
          <TableHead
            v-for="col in columns"
            :key="col.key"
            :class="[
              'h-12 px-6 text-[10px] font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap',
              col.class,
            ]"
          >
            {{ col.label }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="divide-y divide-stone-50">
        <template v-if="loading">
          <TableRow
            v-for="i in 5"
            :key="`skeleton-${i}`"
            class="border-none hover:bg-transparent"
          >
            <TableCell
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 whitespace-normal"
            >
              <Skeleton class="h-4 w-full" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow
            v-for="(row, index) in data"
            :key="index"
            class="hover:bg-stone-50/50 transition-colors border-none group"
          >
            <TableCell
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 whitespace-normal"
            >
              <slot :name="`cell-${col.key}`" :row="row">
                <span class="text-sm text-stone-600 font-body">
                  {{ (row as any)[col.key] }}
                </span>
              </slot>
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
