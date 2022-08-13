<template>
  <div :class="`${sectionId}-quests-container`">
    <h3>{{ title }}</h3>
    <div :class="`${sectionId}-quests`" v-if="quests.length > 0">
      <QuestDisplay
        v-for="quest in quests"
        :key="quest.id"
        :quest="quest"
        @click="$emit('quest-selected', quest)"
      />
    </div>
    <div v-else>
      <p>{{ fallbackText }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { QuestState } from '@/stores/quest-log';
import QuestDisplay from './QuestDisplay.vue';

export interface QuestListSectionProps {
  quests: QuestState[];
  sectionId: string;
  title: string;
  fallbackText: string;
}
const props = defineProps<QuestListSectionProps>();
const emit = defineEmits(['quest-selected']);
</script>
<style></style>
