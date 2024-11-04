<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
// import { toast } from "@/components/ui/toast";
import { useToast } from '@/components/ui/toast/use-toast'


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
// import {
//   DateFormatter,
//   type DateValue,
//   getLocalTimeZone,
// } from '@internationalized/date'
// import { CalendarIcon } from '@radix-icons/vue'
import { ref } from "vue";

const { toast } = useToast();
setTimeout(() => {
  console.log("toast");
  toast({
    title: "You submitted the following values:",
    description: "Hello World",
  });
}, 2000);

// const df = new DateFormatter('en-US', {
//   dateStyle: 'long',
// })

// console.log('df', df)

const value = ref<DateValue>();
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )
        "
      >
        <!-- <CalendarIcon class="mr-2 h-4 w-4" /> -->
        <!-- {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }} -->
        {{ value }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
