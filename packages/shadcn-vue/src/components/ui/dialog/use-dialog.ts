import { Component, ref, markRaw } from "vue";

export interface DialogOptions {
  component?: Component;
  props?: Record<string, any>;
  title?: string;
  description?: string;
  closeable?: boolean;
  onSuccess?: (result: any) => void;
  onCancel?: () => void;
}

interface DialogInstance {
  id: string;
  isOpen: boolean;
  options: DialogOptions;
  resolve?: (value: any) => void;
  reject?: (reason?: any) => void;
}

interface DialogState {
  dialogs: DialogInstance[];
}

const state = ref<DialogState>({
  dialogs: [],
});

export function useDialog() {
  const show = (options: DialogOptions): string => {
    const id = `dialog-${Math.random().toString(36).substring(2, 15)}`;

    setTimeout(() => {
      state.value.dialogs.push({
        id,
        isOpen: true,
        options: {
          ...options,
          component: options.component ? markRaw(options.component) : undefined,
          onSuccess: (result) => {
            options.onSuccess?.(result);
          },
          onCancel: () => {
            options.onCancel?.();
          }
        },
      });
    }, 100);

    return id;
  };

  const close = (id: string, result?: any) => {
    const dialogIndex = state.value.dialogs.findIndex(d => d.id === id);
    if (dialogIndex === -1) return;

    const dialog = state.value.dialogs[dialogIndex];
    dialog.options.onSuccess?.(result);
    dialog.resolve?.(result);

    state.value.dialogs.splice(dialogIndex, 1);
  };

  const cancel = (id: string) => {
    const dialogIndex = state.value.dialogs.findIndex(d => d.id === id);
    if (dialogIndex === -1) return;

    const dialog = state.value.dialogs[dialogIndex];
    dialog.options.onCancel?.();
    dialog.reject?.('Dialog cancelled');

    state.value.dialogs.splice(dialogIndex, 1);
  };

  return {
    state,
    show,
    close,
    cancel,
  };
}