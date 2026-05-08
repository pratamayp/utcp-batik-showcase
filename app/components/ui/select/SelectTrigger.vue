<script setup lang="ts">
import type { SelectTriggerProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ChevronDown } from "lucide-vue-next";
import { SelectIcon, SelectTrigger, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<
    SelectTriggerProps & {
      class?: HTMLAttributes["class"];
      size?: "sm" | "default";
    }
  >(),
  { size: "default" },
);

const delegatedProps = reactiveOmit(props, "class", "size");
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    :class="
      cn(
        'border-stone-200 data-placeholder:text-stone-400 [&_svg:not([class*=\'text-\'])]:text-stone-400 focus:border-amber-600 focus:ring-amber-600/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-fit items-center justify-between gap-2 rounded-none border bg-white px-3 py-2 text-sm whitespace-nowrap shadow-none transition-[color,box-shadow] outline-none focus:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-12 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-5 opacity-75" />
    </SelectIcon>
  </SelectTrigger>
</template>
