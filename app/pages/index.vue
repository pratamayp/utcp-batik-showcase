<script setup lang="ts">
onMounted(async () => {
  try {
    await $fetch("/api/logs", {
      method: "POST",
      body: {
        type: "page_view",
        path: "/",
        metadata: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
        },
      },
    });
  } catch (error) {
    console.error("Failed to record visit:", error);
  }
});
</script>

<template>
  <main class="min-h-screen bg-stone-50">
    <LandingHero />
    <LandingIntroduction />
    <LandingCatalogue />
    <LandingFooter />
  </main>
</template>
