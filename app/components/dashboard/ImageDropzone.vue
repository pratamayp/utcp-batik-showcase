<script setup lang="ts">
import { Upload, X } from "lucide-vue-next";

const props = defineProps<{
  modelValue: (File | string)[];
  maxFiles?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", files: (File | string)[]): void;
}>();

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const filePreviews = ref<
  { id: string; url: string; name: string; isExisting: boolean }[]
>([]);

// Sync modelValue with previews (especially for existing URLs)
watch(
  () => props.modelValue,
  (newVal) => {
    // Only sync if previews are empty (initial load) or length changed significantly
    // This is a simple sync logic
    const currentUrls = filePreviews.value.map((p) => p.url);

    newVal.forEach((item) => {
      if (typeof item === "string" && !currentUrls.includes(item)) {
        filePreviews.value.push({
          id: Math.random().toString(36),
          url: item,
          name: item.split("/").pop() || "Existing Image",
          isExisting: true,
        });
      }
    });
  },
  { immediate: true },
);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const files = e.dataTransfer?.files;
  if (files) addFiles(Array.from(files));
};

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) addFiles(Array.from(target.files));
};

const addFiles = (newFiles: File[]) => {
  const imageFiles = newFiles.filter((f) => f.type.startsWith("image/"));

  // Create previews for new files
  imageFiles.forEach((file) => {
    const url = URL.createObjectURL(file);
    filePreviews.value.push({
      id: Math.random().toString(36),
      url,
      name: file.name,
      isExisting: false,
    });
  });

  emit("update:modelValue", [...props.modelValue, ...imageFiles]);
};

const removeFile = (index: number) => {
  const preview = filePreviews.value[index];
  if (!preview) return;

  const newModelValue = [...props.modelValue];

  // If it's a new file, revoke the URL
  if (!preview.isExisting) {
    URL.revokeObjectURL(preview.url);
  }

  // Remove from both modelValue and previews
  newModelValue.splice(index, 1);
  filePreviews.value.splice(index, 1);

  emit("update:modelValue", newModelValue);
};

onUnmounted(() => {
  filePreviews.value.forEach((p) => {
    if (!p.isExisting) URL.revokeObjectURL(p.url);
  });
});
</script>

<template>
  <div class="space-y-4">
    <div
      :class="[
        'relative border-2 border-dashed transition-all p-10 flex flex-col items-center justify-center gap-3 cursor-pointer',
        isDragging
          ? 'border-amber-600 bg-amber-50/50'
          : 'border-stone-200 bg-white hover:bg-stone-50',
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        class="hidden"
        @change="handleFileInput"
      />

      <div
        class="size-12 bg-stone-100 flex items-center justify-center text-stone-400"
      >
        <Upload class="w-6 h-6" />
      </div>

      <div class="text-center">
        <p class="text-sm font-bold text-stone-900 uppercase tracking-widest">
          Klik atau tarik gambar ke sini
        </p>
        <p class="text-[10px] text-stone-400 uppercase tracking-widest mt-1">
          PNG, JPG up to 10MB
        </p>
      </div>
    </div>

    <!-- Previews -->
    <div
      v-if="filePreviews.length > 0"
      class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      <div
        v-for="(preview, index) in filePreviews"
        :key="preview.id"
        class="group relative aspect-square border border-stone-200 bg-stone-50 overflow-hidden"
      >
        <img
          :src="preview.url"
          class="w-full h-full object-cover transition-all"
        />
        <div
          class="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <button
            type="button"
            class="size-8 bg-red-800 text-white flex items-center justify-center hover:bg-red-900 transition-colors"
            @click.stop="removeFile(index)"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
        <div class="absolute bottom-0 inset-x-0 bg-stone-900/80 p-1">
          <p
            class="text-[8px] text-white truncate px-1 text-center font-sans tracking-tighter"
          >
            {{ preview.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
