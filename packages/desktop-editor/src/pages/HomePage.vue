<script setup lang="ts">
import { useIDE } from "@/stores/ide-store";
import { usePreferences } from "@/stores/preferences-store";
const IDE = useIDE();
const preferences = usePreferences();
</script>
<template>
  <div class="w-full bg-neutral-900">
    <div class="container mx-auto p-5">
      <h1 class="title text-center">Narrat IDE</h1>
      <button class="button" @click="IDE.selectWorkspace">
        Choose a project to open
      </button>
      <router-link to="/ide">Test</router-link>
      <div v-if="preferences.recentProjects.length > 0">
        <h1 class="title text-center">Recent projects</h1>
        <div
          class="flex flex-col items-center w-80 bg-gray-400 rounded border-gray-50 border-opacity-40 border-1"
        >
          <div
            v-for="project in preferences.recentProjects"
            :key="project.workspaceRoot"
          >
            <button
              class="button"
              @click="IDE.openWorkspace(project.workspaceRoot)"
            >
              {{ project.workspaceRoot }}<br />
              <span class="italic text-gray-600"
                >Last edited at
                {{ new Date(project.lastEdit).toLocaleString() }}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
