<template>
  <div class="container mx-auto settings-menu-container">
    <LocalizedText
      tag="h2"
      class="settings-menu-title subtitle text-center"
      value="narrat.settings.settings"
    >
    </LocalizedText>
    <div
      v-for="category in categorizedSettings"
      :key="category.categoryInfo.id"
      class="settings-category"
    >
      <div class="settings-category-header">
        <LocalizedText
          tag="h3"
          class="settings-category-title"
          :value="category.categoryInfo.name"
        />
      </div>
      <div class="settings-category-content">
        <SettingWidget
          v-for="setting in category.settings"
          :settingId="setting.id"
          :inputListener="selectedSetting?.id === setting.id ? inputListener : null"
          :focused="selectedSetting?.id === setting.id"
          :key="setting.id"
          @click="selectElement(setting)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useSettings } from '@/stores/settings-store';
import SettingWidget from './setting-widget.vue';
import { InputListener } from '@/stores/inputs-store';
import {
  SettingCategories,
  SettingsCategory,
  SettingsCategoryInfo,
} from '@/config/settings-config';
import { useNavigation } from '@/inputs/useNewNavigation';

const props = defineProps<{
  inputListener: InputListener;
}>();

const settings = useSettings();

interface CategorizedSetting {
  id: string;
  schema: any;
}

interface SettingsGroup {
  categoryInfo: SettingsCategoryInfo;
  settings: CategorizedSetting[];
}

const categorizedSettings = computed((): SettingsGroup[] => {
  const allSchemas = settings.getAllSettingSchemas();
  const groups: SettingsGroup[] = [];

  // Create groups for each category
  for (const categoryKey in SettingCategories) {
    const category = SettingCategories[categoryKey as SettingsCategory];
    const categorySettings: CategorizedSetting[] = [];

    // Find all settings for this category
    for (const [settingId, schema] of Object.entries(allSchemas)) {
      if (schema.category === category.id) {
        categorySettings.push({
          id: settingId,
          schema: schema,
        });
      }
    }

    // Only add categories that have settings
    if (categorySettings.length > 0) {
      groups.push({
        categoryInfo: category,
        settings: categorySettings,
      });
    }
  }

  return groups;
});

// Flat list of all settings for navigation
const allSettings = computed(() => {
  const settings: CategorizedSetting[] = [];
  categorizedSettings.value.forEach((group) => {
    settings.push(...group.settings);
  });
  return settings;
});

const inputListenerRef = computed(() => props.inputListener);

const { selectedElement: selectedSetting, selectElement } = useNavigation({
  mode: 'vertical',
  listener: inputListenerRef,
  elements: allSettings.value,
  onSelected: (setting: CategorizedSetting) => {
    // Could add any selection behavior here if needed
  },
  looping: true,
});

onMounted(() => {
  // Auto-select first setting when mounted
  if (allSettings.value.length > 0) {
    selectElement(allSettings.value[0]);
  }
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

.settings-category {
  width: 100%;
  margin-bottom: 2rem;
}

.settings-category:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1.5rem;
}

.settings-category-header {
  margin-bottom: 1rem;
  text-align: center;
}

.settings-category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.settings-category-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
