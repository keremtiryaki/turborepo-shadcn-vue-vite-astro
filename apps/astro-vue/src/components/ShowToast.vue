<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { useDialog } from "@/components/ui/dialog/use-dialog";
import SampleComponent from "./SampleComponent.vue";

const { toast } = useToast();
const dialog = useDialog();

const showDialog = async () => {
  try {
    const result = await dialog.show({
      component: SampleComponent,
      props: {
        // Props to pass to your component
        someData: "example",
      },
      title: "non closeable Dialog Title",
      description: "Optional description",
      closeable: false, // default true
    });
    console.log("Dialog result:", result);
  } catch (err) {
    console.error(err);
    console.log("Dialog cancelled");
  }
};
</script>

<template>
  <Button
    variant="outline"
    @click="
      () => {
        console.log('toast', toast);
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          variant: 'destructive',
        });
      }
    "
  >
    Show toast
  </Button>
  <Button @click="showDialog">Show dialog</Button>
</template>
