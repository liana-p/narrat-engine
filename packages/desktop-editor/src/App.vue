<script setup lang="ts">
import { onBeforeMount } from "vue";
import { usePreferences } from "./stores/preferences-store";
import { useIDE } from "./stores/ide-store";
function reload() {
  window.location.reload();
}
const preferences = usePreferences();
const ide = useIDE();
onBeforeMount(() => {
  usePreferences().loadPreferences();
  // if (preferences.lastOpenedWorkspace) {
  //   ide.openWorkspace(preferences.lastOpenedWorkspace);
  // }
});
</script>
<template>
  <div class="narrat-ide">
    <button class="absolute" @click="reload">reload</button>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
