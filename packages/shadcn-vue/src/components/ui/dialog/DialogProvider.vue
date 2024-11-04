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

const handleUpdateOpen = (dialogId: string, val: boolean) => {
  if (!val) {
    const dialog = state.value.dialogs.find((d) => d.id === dialogId);
    if (dialog?.options.closeable !== false) {
      cancel(dialogId);
    }
  }
};
</script>

<template>
  <template v-for="dialog in state.dialogs" :key="dialog.id">
    <Dialog
      :open="dialog.isOpen"
      @update:open="(val) => handleUpdateOpen(dialog.id, val)"
    >
      <DialogContent :closeable="dialog.options?.closeable">
        <DialogHeader>
          <DialogTitle>
            {{ dialog.options?.title || "" }}
          </DialogTitle>
          <DialogDescription>
            {{ dialog.options?.description || "" }}
          </DialogDescription>
        </DialogHeader>

        <component
          v-if="dialog.options?.component"
          :is="dialog.options.component"
          v-bind="dialog.options.props"
          @close="(result: any) => close(dialog.id, result)"
          @cancel="() => cancel(dialog.id)"
        />
      </DialogContent>
    </Dialog>
  </template>
</template>
