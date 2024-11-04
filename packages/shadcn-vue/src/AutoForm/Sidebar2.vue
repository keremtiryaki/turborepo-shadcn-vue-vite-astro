<script setup lang="ts">
import { Home, Inbox, Calendar, Settings, Search } from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SidebarInset from "@/components/ui/sidebar/SidebarInset.vue";
import SidebarTrigger from "@/components/ui/sidebar/SidebarTrigger.vue";

const items = [
  {
    title: "Home",
    icon: Home,
    url: "#",
  },
  {
    title: "Inbox",
    icon: Inbox,
    url: "#",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "#",
  },
  {
    title: "Search",
    icon: Search,
    url: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#",
  },
];
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <h2 class="px-6 text-lg font-semibold">My App</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton as-child>
                  <a :href="item.url" class="flex items-center gap-3">
                    <component :is="item.icon" class="h-4 w-4" />
                    <span>{{ item.title }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
      </header>
      <main class="flex-1 p-4">
        <!-- Main content goes here -->
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
