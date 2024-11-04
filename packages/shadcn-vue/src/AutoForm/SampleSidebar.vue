<script setup lang="ts">
import { ref } from 'vue'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { HomeIcon, SettingsIcon, UserIcon, HelpCircleIcon, MenuIcon } from 'lucide-vue-next'

const isOpen = ref(false)

const menuItems = [
    { name: 'Home', icon: HomeIcon },
    { name: 'Profile', icon: UserIcon },
    { name: 'Settings', icon: SettingsIcon },
    { name: 'Help', icon: HelpCircleIcon },
]

const handleItemClick = (itemName: string) => {
    console.log(`Clicked on ${itemName}`)
    // Add your navigation logic here
    isOpen.value = false
}
</script>

<template>
    <div>
        <!-- Button to open the sidebar -->
        <Button @click="isOpen = true"
                variant="outline"
                size="icon"
                class="fixed top-4 left-4">
            <MenuIcon class="h-4 w-4" />
        </Button>

        <!-- Drawer component for the sidebar -->
        <Drawer v-model:open="isOpen"
                direction="left">
            <DrawerContent class="w-[300px] sm:w-[400px] min-h-screen">
                <div class="flex flex-col h-full bg-background">
                    <!-- Sidebar header -->
                    <div class="p-4 border-b">
                        <h2 class="text-lg font-semibold">Menu</h2>
                    </div>

                    <!-- Sidebar content -->
                    <nav class="flex-1 overflow-y-auto p-4">
                        <ul class="space-y-2">
                            <li v-for="item in menuItems"
                                :key="item.name">
                                <a href="#"
                                   class="flex items-center p-2 text-sm rounded-lg hover:bg-accent"
                                   @click="handleItemClick(item.name)">
                                    <component :is="item.icon"
                                               class="w-5 h-5 mr-3" />
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <!-- Sidebar footer -->
                    <div class="p-4 border-t">
                        <Button @click="isOpen = false"
                                variant="outline"
                                class="w-full">
                            Close Menu
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    </div>
</template>