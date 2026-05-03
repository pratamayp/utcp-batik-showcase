<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

const props = defineProps<{
  paramKey: string;
  placeholder?: string;
  options: Option[];
  defaultValue?: string;
  class?: string;
}>();

const route = useRoute();
const router = useRouter();

const selectedValue = computed({
  get: () =>
    (route.query[props.paramKey] as string) || props.defaultValue || "",
  set: (val) => {
    // Create a new query object without the target param and page param to avoid dynamic delete
    const newQuery = Object.fromEntries(
      Object.entries(route.query).filter(
        ([key]) => key !== props.paramKey && key !== "page",
      ),
    );

    if (val && val !== "all") {
      newQuery[props.paramKey] = val;
    }

    router.push({ query: newQuery });
  },
});
</script>

<template>
  <Select v-model="selectedValue">
    <SelectTrigger
      :class="[
        'bg-white border-stone-200 rounded-none h-12 text-stone-600 focus:ring-amber-600/20 focus:border-amber-600 transition-all',
        props.class,
      ]"
    >
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent class="rounded-none border-stone-200 shadow-xl">
      <SelectGroup>
        <SelectItem
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          class="rounded-none text-stone-600 focus:bg-amber-50 focus:text-amber-900 cursor-pointer"
        >
          {{ opt.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
