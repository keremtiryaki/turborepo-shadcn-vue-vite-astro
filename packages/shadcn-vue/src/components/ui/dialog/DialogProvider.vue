<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from ".";
import { useDialog } from "./use-dialog";

const { state, close, cancel } = useDialog();

const handleUpdateOpen = (val: boolean) => {
  if (!val && state.value.options?.closeable !== false) {
    cancel();
  }
};
</script>

<template>
  <Dialog :open="state.isOpen" @update:open="handleUpdateOpen">
    <DialogContent :closeable="state.options?.closeable">
      <DialogHeader v-if="state.options?.title || state.options?.description">
        <DialogTitle v-if="state.options?.title">
          {{ state.options.title }}
        </DialogTitle>
        <DialogDescription v-if="state.options?.description">
          {{ state.options.description }}
        </DialogDescription>
      </DialogHeader>

      <component
        v-if="state.options?.component"
        :is="state.options.component"
        v-bind="state.options.props"
        @close="close"
        @cancel="cancel"
      />
    </DialogContent>
  </Dialog>
</template>
