<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { DialogProvider } from "@/components/ui/dialog";
import { store } from "shadcn-vue/src/AutoForm/storeSample";
</script>

<template>
  <DialogProvider />

  <Toaster />
  <div>store: {{ store }}</div>
</template>
