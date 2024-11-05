<script setup>
import { ref, computed } from "vue";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SearchIcon } from "lucide-vue-next";

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// Categories data
const categories = [
  { id: 1, name: "All" },
  { id: 2, name: "Burgers" },
  { id: 3, name: "Pizza" },
  { id: 4, name: "Sushi" },
  { id: 5, name: "Desserts" },
  { id: 6, name: "Drinks" },
  { id: 7, name: "Salads" },
  { id: 8, name: "Sandwiches" },
];

const selectedCategory = ref(1);
const searchQuery = ref("");

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId;
};

const filteredItems = computed(() => {
  return props.menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory.value === 1 || item.category === selectedCategory.value;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
</script>
<template>
  <div class="min-h-screen bg-background">
    <!-- Header with search and categories -->
    <header class="bg-card/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <!-- Search Bar -->
        <div class="mb-4">
          <Input
            v-model="searchQuery"
            placeholder="Search menu items..."
            class="w-full"
          >
            <template #prefix>
              <SearchIcon class="h-5 w-5 text-muted-foreground" />
            </template>
          </Input>
        </div>

        <!-- Horizontal Category Menu -->
        <ScrollArea class="w-full whitespace-nowrap">
          <div class="flex space-x-2">
            <Button
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category.id)"
              :variant="
                selectedCategory === category.id ? 'default' : 'outline'
              "
              class="rounded-full"
            >
              {{ category.name }}
            </Button>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-foreground mb-6">Menu</h1>

      <!-- Menu Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="item in filteredItems"
          :key="item.id"
          class="overflow-hidden"
        >
          <!-- <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover" /> -->
          <CardHeader>
            <CardTitle>{{ item.name }}</CardTitle>
            <CardDescription>{{ item.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-lg font-bold">${{ item.price.toFixed(2) }}</p>
          </CardContent>
          <CardFooter>
            <Button class="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  </div>
</template>
