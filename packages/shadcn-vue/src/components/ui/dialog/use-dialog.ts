import { Component, ref, markRaw } from "vue";

export interface DialogOptions {
  component?: Component
  props?: Record<string, any>
  title?: string
  description?: string
  closeable?: boolean
}

interface DialogState {
  isOpen: boolean
  options: DialogOptions | null
  resolve?: (value: any) => void
  reject?: (reason?: any) => void
}

const state = ref<DialogState>({
  isOpen: false,
  options: null,
})


export function useDialog() {
  const show = <T = any>(options: DialogOptions): Promise<T> => {
    return new Promise((resolve, reject) => {
      state.value = {
        isOpen: true,
        options: {
          ...options,
          component: options.component ? markRaw(options.component) : undefined
        },
        resolve,
        reject,
      }
    })
  }

  const close = (result?: any) => {
    if (state.value.resolve) {
      state.value.resolve(result)
    }
    state.value.isOpen = false
  }

  const cancel = () => {
    if (state.value.reject) {
      state.value.reject('Dialog cancelled')
    }
    state.value.isOpen = false
  }

  return {
    state,
    show,
    close,
    cancel,
  }
}