<template>
  <div class="settings-widget-container">
    <label
      :for="settingId"
      class="setting-label"
      :id="`setting-label-${settingId}`"
    >
      {{ schema.name }}
    </label>
    <input
      v-if="isSettingNumber(schema) || isSettingInteger(schema)"
      ref="slider"
      class="number-slider setting-slider"
      type="range"
      :id="`setting-slider-${settingId}`"
      :name="settingId"
      :min="schema.minValue"
      :max="schema.maxValue"
      :step="schema.step"
      v-model="settingValue"
    />
    <input
      v-else-if="isSettingBoolean(schema)"
      type="checkbox"
      class="setting-checkbox"
      :id="`setting-checkbox-${settingId}`"
      :name="settingId"
      v-model="settingValue"
    />
    <input
      v-else-if="isSettingString(schema)"
      type="text"
      class="setting-text"
      :id="`setting-text-${settingId}`"
      :name="settingId"
      v-model="settingValue"
    />
    <span class="mx-8">{{ settingValue }}</span>
  </div>
  <p class="text-left setting-description">{{ schema.description }}</p>
  <hr
    class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 setting-separator"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useSettings } from '@/stores/settings-store';
import {
  isSettingNumber,
  isSettingBoolean,
  isSettingInteger,
  isSettingString,
} from '@/config/settings-config';
export interface SettingWidgetProps {
  settingId: string;
}
const props = defineProps<SettingWidgetProps>();

const settings = useSettings();
const startValue = computed(() => {
  return settings.getSetting(props.settingId);
});
const settingValue = ref(startValue.value);
const schema = computed(() => {
  return settings.getSettingSchema(props.settingId)!;
});

function valueChanged(newValue: number) {
  let value = newValue;
  if (isSettingInteger(schema.value)) {
    value = Math.round(value);
  }
  settings.setSetting(props.settingId, value);
}
watch(settingValue, (newValue: any) => {
  valueChanged(newValue);
});
</script>
<style>
.yellow {
  background-color: yellow;
}
.setting-label {
  /* margin: 5px 20px; */
  margin-right: 10px;
  font-size: 1.25rem;
  font-weight: 700;
  /* width: 180px; */
  text-align: left;
  margin-right: 20px;
}
.setting-slider {
  flex-grow: 2;
  background-color: blue;
}
.settings-widget-container {
  width: 100%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.setting-description {
  margin-left: 2rem;
}

.setting-separator {
  background-color: var(--separator-bg-color);
  width: var(--separator-width);
  height: var(--separator-height);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
