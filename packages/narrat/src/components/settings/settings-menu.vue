<template>
  <div class="container mx-auto settings-menu-container">
    <LocalizedText
      tag="h2"
      class="settings-menu-title subtitle text-center"
      value="Settings"
    >
    </LocalizedText>
    <SettingWidget
      v-for="(schema, id) in schemas"
      :settingId="id"
      :inputListener="inputListener"
      :key="id"
    />
    <!-- Select with available languages -->
    <select
      class="nrt-select language-select"
      v-model="selectedLanguage"
      @change="localization.setCurrentLanguage(selectedLanguage)"
    >
      <option
        v-for="{ id, name } in availableLanguages"
        :key="id"
        :value="id"
        :class="`nrt-option language-option ${id}`"
      >
        {{ name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSettings } from '@/stores/settings-store';
import SettingWidget from './setting-widget.vue';
import { InputListener } from '@/stores/inputs-store';
import { useLocalization } from '@/stores/localization-store';
import { getLocalizationConfig } from '@/config';

const localization = useLocalization();

const props = defineProps<{
  inputListener: InputListener;
}>();

const selectedLanguage = ref(localization.currentLanguage);

const settings = useSettings();

const availableLanguages = computed(() => {
  return Object.values(getLocalizationConfig().languages).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
});

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
