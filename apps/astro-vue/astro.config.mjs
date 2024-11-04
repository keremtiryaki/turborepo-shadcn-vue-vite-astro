// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath, URL } from "node:url";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(
          new URL("../../packages/shadcn-vue/src", import.meta.url),
        ),
        'vue': 'vue/dist/vue.esm-bundler.js',
      },
    },
  },
  integrations: [
    vue({
      appEntrypoint: "./src/vue-main.ts",
      devtools: true
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
