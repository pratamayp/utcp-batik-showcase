import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  // runtimeConfig: {
  //   public: {
  //     googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
  //   },
  // },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vueuse/core",
        "lucide-vue-next",
        "reka-ui",
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
      ],
    },
  },

  modules: ["shadcn-nuxt", "@nuxt/eslint", "@nuxtjs/supabase"],
  supabase: {
    redirect: false,
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
  eslint: {
    config: {
      // Disable Nuxt's stylistic rules to let Prettier handle formatting exclusively
      stylistic: false,
    },
  },

  app: {
    head: {
      // The default title if a page doesn't specify one
      title: "Batik Showcase",

      // %s will be replaced by the individual page's title
      titleTemplate: "%s | UT Capstone Project",

      // You can also add default meta tags, favicons, etc. here
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
