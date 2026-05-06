<!-- pages/map.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

// Retrieve the API key securely from runtimeConfig
const config = useRuntimeConfig();
const apiKey = config.public.googleMapsApiKey;

// Set the initial coordinates (e.g., Semarang)
const center = ref({ lat: -6.9891, lng: 110.4229 });
</script>

<template>
  <!-- Tailwind classes to ensure the container has a defined height -->
  <div class="h-150 w-full rounded-xl overflow-hidden shadow-lg">
    <ClientOnly>
      <GoogleMap
        :api-key="apiKey"
        style="width: 100%; height: 100%"
        :center="center"
        :zoom="14"
      >
        <!-- Adding a marker for a specific point of interest -->
        <Marker :options="{ position: center }" />
      </GoogleMap>

      <!-- Fallback UI while the client-side script loads -->
      <template #fallback>
        <div
          class="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500"
        >
          Loading Map...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
