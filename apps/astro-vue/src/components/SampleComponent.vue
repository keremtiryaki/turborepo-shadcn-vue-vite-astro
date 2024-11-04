<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ref } from "vue";

const someData = ref("");

const emit = defineEmits<{
  close: [result: any];
  cancel: [];
}>();

const confirm = () => {
  emit("close", { success: true, data: "some result" });
};

const cancel = () => {
  emit("cancel");
};
</script>

<template>
  <div class="space-y-4">
    <p>Your dialog content here</p>
    <input type="text" v-model="someData" />
    <p>{{ someData }}</p>

    <div class="flex justify-end gap-2">
      <Button @click="cancel">Cancel</Button>
      <Button @click="confirm">Confirm</Button>
    </div>
  </div>
</template>
