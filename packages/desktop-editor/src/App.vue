<script setup lang="ts">
import { onBeforeMount } from "vue";
import { usePreferences } from "./stores/preferences-store";
const preferences = usePreferences();
onBeforeMount(() => {
  preferences.loadPreferences();
  // if (preferences.lastOpenedWorkspace) {
  //   ide.openWorkspace(preferences.lastOpenedWorkspace);
  // }
});
</script>
<template>
  <div class="narrat-ide">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
