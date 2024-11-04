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
</script>

<template>
  <Dialog :open="state.isOpen" @update:open="(val) => !val && cancel()">
    <DialogContent
      :class="{ 'cursor-pointer': state.options?.closeable !== false }"
    >
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
