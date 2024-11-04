import { Component, ref, markRaw } from "vue";

export interface DialogOptions {
  id?: string;
  component?: Component;
  html?: string;
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
    const id = options.id || `dialog-${Math.random().toString(36).substring(2, 15)}`;

    function getComponent() {
      // import { defineComponent } from "vue";
      // let component: Component | undefined;
      // if (options.html) {
      //   console.warn(`dialog html requires alias to be set in vite config, {"vite":{"resolve":{"alias":{"vue":"vue/dist/vue.esm-bundler.js"}}}}`);
      //   component = defineComponent({
      //     template: options.html,
      //   });
      // } else if (options.component) {
      //   component = options.component;
      // }
      // return component ? markRaw(component) : undefined;
      return options.component ? markRaw(options.component) : undefined;
    }

    state.value.dialogs.push({
      id,
      isOpen: true,
      options: {
        ...options,
        component: getComponent(),
        onSuccess: (result) => {
          options.onSuccess?.(result);
        },
        onCancel: () => {
          options.onCancel?.();
        }
      },
    });

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

  const getDialog = (id: string) => {
    return state.value.dialogs.find(d => d.id === id);
  };

  return {
    state,
    show,
    close,
    cancel,
    getDialog,
  };
}