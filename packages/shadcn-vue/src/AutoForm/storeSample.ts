import { reactive, watch } from 'vue'

export const store = reactive({
    count: 0
})

// Function to subscribe to changes
export function subscribeToCount(callback: (newCount: number) => void) {
    const stop = watch(() => store.count, (newCount) => {
        callback(newCount);
    });

    // Return a function to stop watching
    return stop;
}