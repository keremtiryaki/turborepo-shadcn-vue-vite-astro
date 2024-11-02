import tailwindConfig from "shadcn-vue/tailwind.config.js";

/** @type {import('tailwindcss').Config} */
export default {
  ...tailwindConfig,
  content: [
    "./src/**/*.{ts,tsx,vue}",
    "./node_modules/shadcn-vue/src/**/*.{ts,tsx,vue}",
    // add ui packages path if required
  ],
};
