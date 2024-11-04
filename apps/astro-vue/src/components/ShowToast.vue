<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
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
    Add to calendar
  </Button>
</template>
