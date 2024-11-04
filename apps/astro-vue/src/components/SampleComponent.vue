<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ref } from "vue";

const props = defineProps<{
  someData: string;
}>();

const localData = ref(props.someData);

const emit = defineEmits<{
  close: [result: any];
  cancel: [];
}>();

const confirm = () => {
  emit("close", { success: true, data: localData.value });
};

const cancel = () => {
  emit("cancel");
};
</script>

<template>
  <div class="space-y-4">
    <!-- <p>Your dialog content here</p> -->
    <Input type="email" v-model="localData" placeholder="Email" />
    <p>{{ localData }}</p>

    <div class="flex justify-end gap-2">
      <Button @click="cancel">Cancel</Button>
      <Button @click="confirm">Confirm</Button>
    </div>
  </div>
</template>
