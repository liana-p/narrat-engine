<template>
  <div :class="`${sectionId}-quests-container`" class="quests-section">
    <h3>{{ title }}</h3>
    <div v-if="quests.length > 0">
      <div
        :class="`${sectionId}-${category.category.id}-category`"
        class="quests-category"
        v-for="category in questsSplitByCategories"
        :key="category.category.id"
      >
        <h4 v-if="categoriesConfig.length > 1">
          {{ category.category.title }}
        </h4>
        <div :class="`${sectionId}-${category.category.id}-quests`">
          <QuestDisplay
            v-for="quest in category.quests"
            :key="quest.id"
            :quest="quest"
            @click="$emit('quest-selected', quest)"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{ fallbackText }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getQuestConfig, questsConfig } from '@/config';
import { QuestCategory } from '@/config/quests-config';
import { QuestState } from '@/stores/quest-log';
import { error } from '@/utils/error-handling';
import { computed } from 'vue';
import QuestDisplay from './QuestDisplay.vue';

export interface QuestListSectionProps {
  quests: QuestState[];
  sectionId: string;
  title: string;
  fallbackText: string;
}

export interface QuestCategoryProps {
  category: QuestCategory;
  quests: QuestState[];
}
const props = defineProps<QuestListSectionProps>();
const emit = defineEmits(['quest-selected']);

const categoriesConfig = computed(() => {
  return questsConfig().categories;
});
const questsSplitByCategories = computed(() => {
  const categories: QuestCategoryProps[] = [];
  const possibleCategories = props.quests.reduce((acc, quest) => {
    const category = getQuestConfig(quest.id).category ?? 'default';
    const categoryConfig = categoriesConfig.value.find(
      (c) => c.id === category,
    );
    if (!categoryConfig) {
      error(`Quest category ${category} not found in config`);
      return acc;
    }
    let matchingCategory = acc.find((c) => c.category.id === category);
    if (!matchingCategory) {
      matchingCategory = {
        category: categoryConfig,
        quests: [],
      };
      acc.push(matchingCategory);
    }
    matchingCategory.quests.push(quest);
    return acc;
  }, categories);
  return possibleCategories;
});
</script>
<style>
.quests-category {
  margin-left: 0.6rem;
}
</style>
