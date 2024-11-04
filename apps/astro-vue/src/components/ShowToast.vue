<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { useDialog } from "@/components/ui/dialog/use-dialog";
import SampleComponent from "./SampleComponent.vue";

const { toast } = useToast();
const dialog = useDialog();

const showDialog = async () => {
  // const id1 = dialog.show({
  //   component: SampleComponent,
  //   props: {
  //     someData: "example 111",
  //   },
  //   title: "Dialog Title",
  //   description: "Optional description",
  //   closeable: false,
  //   onSuccess: (result) => {
  //     console.log("Dialog success:", result);
  //   },
  //   onCancel: () => {
  //     console.log("Dialog cancelled");
  //   },
  // });
  // const id2 = dialog.show({
  //   component: SampleComponent,
  //   props: {
  //     someData: "example 222",
  //   },
  //   closeable: true,
  // });

  const id3 = dialog.show({
    html: `<div>Hello madafaka <button class="bg-red-500" @click="$emit('close')">Close</button> </div>`,
  });

  // setTimeout(() => {
  //   dialog.close(id3, "forced to close");
  // }, 2e3);
  // setTimeout(() => {
  // }, 2e3);
  // setTimeout(() => {
  //   dialog.close(id, "forced to close");
  // }, 2e3);
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
