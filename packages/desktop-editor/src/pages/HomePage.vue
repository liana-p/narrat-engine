<script setup lang="ts">
import { useIDE } from "@/stores/ide-store";
import { usePreferences } from "@/stores/preferences-store";
const IDE = useIDE();
const preferences = usePreferences();
</script>
<template>
  <div class="w-full bg-neutral-900">
    <div class="container mx-auto p-5">
      <h1 class="title text-center text-5xl">Narrat IDE</h1>
      <h2 class="title text-2xl">Early preview version (Very WIP version, likely to be buggy)</h2>
      <h3 class="text-xl font-bold my-4">Instructions:</h3>
      <p class="mb-8">
        <ul>
          <li>This editor is in early preview and only has features for editing games. To create games or build them, you will need to use the terminal as usual</li>
          <li>Press the button to choose a project, then browse to a folder containing a narrat game</li>
          <li>Once you have a project open, the editor should show files, and the game should be running on the right.</li>
          <li>The narrat system menu has options to save, open projects, and reload the editor if something is buggy.</li>
          <li>For now you have to go in the narrat menu and press Save to save your current file.</li>
          <li>If you don't already have a narrat game, follow the <a target="_blank" href="https://docs.narrat.dev/guides/getting-started.html">Getting Started docs</a> </li>
        </ul>
      </p>
      <button class="button" @click="IDE.selectWorkspace">
        Choose a project to open
      </button>
      <div v-if="preferences.recentProjects.length > 0">
        <h1 class="text-2xl my-6">Recent projects</h1>
        <div
          class="flex flex-col items-center w-120 bg-gray-700 rounded border-gray-50 border-opacity-40 border-1 p-3"
        >
          <div
            class="w-full"
            v-for="project in preferences.recentProjects"
            :key="project.workspaceRoot"
          >
            <button
              class="button m-0 w-full"
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
