<template>
  <div class="container mx-auto settings-menu-container">
    <h2 class="settings-menu-title subtitle text-center">Settings</h2>
    <SettingWidget
      v-for="(schema, id) in schemas"
      :settingId="(id as string)"
      :key="id"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSettings } from '../../stores/settings-store';
import SettingWidget from './setting-widget.vue';

const settings = useSettings();

const schemas = computed(() => {
  return settings.getAllSettingSchemas();
});
</script>

<style>
.settings-menu-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.settings-menu-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: var(--light-background);
  border: 1px dashed white;
  padding: 20px;
  margin: 20px 0;
}
</style>
