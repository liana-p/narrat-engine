<template>
  <div class="container mx-auto settings-menu-container">
    <LocalizedText
      tag="h2"
      class="settings-menu-title subtitle text-center"
      value="narrat.settings.settings"
    >
    </LocalizedText>
    <SettingWidget
      v-for="(schema, id) in schemas"
      :settingId="id"
      :inputListener="inputListener"
      :key="id"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSettings } from '@/stores/settings-store';
import SettingWidget from './setting-widget.vue';
import { InputListener } from '@/stores/inputs-store';

const props = defineProps<{
  inputListener: InputListener;
}>();

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
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px 0;
}
</style>
