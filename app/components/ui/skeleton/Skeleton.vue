<script setup lang="ts">
import { cn } from "@/lib/utils";

interface SkeletonProps {
  class?: string;
}

defineProps<SkeletonProps>();
</script>

<template>
  <div :class="cn('animate-pulse bg-stone-200 rounded-none', $props.class)" />
</template>
