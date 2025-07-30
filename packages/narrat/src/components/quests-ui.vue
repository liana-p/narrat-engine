<template>
  <div class="quests-ui" :class="questsUiClass">
    <div class="quests-list-container">
      <QuestsListSection
        v-if="inputListener"
        :quests="activeQuests"
        :sectionId="'active'"
        :title="$t('narrat.game_menu.quests.active_quests')"
        :fallbackText="'narrat.game_menu.quests.no_active_quests'"
        :focusedQuest="selectedQuest?.id ?? null"
        :inputListener="inputListener"
        @quest-selected="clickOnQuest"
      />
      <QuestsListSection
        v-if="inputListener"
        :quests="completedQuests"
        :sectionId="'completed'"
        :title="$t('narrat.game_menu.quests.completed_quests')"
        :fallbackText="'narrat.game_menu.quests.no_completed_quests'"
        :focusedQuest="selectedQuest?.id ?? null"
        :inputListener="inputListener"
        @quest-selected="clickOnQuest"
      />
    </div>
    <div class="quest-details">
      <QuestDetails v-if="selectedQuest" :quest="selectedQuest" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRenderingStore } from '@/stores/rendering-store';
import { computed, onMounted, ref } from 'vue';
import { QuestState, useQuests } from '../stores/quest-log';
import { InputListener } from '@/stores/inputs-store';
import QuestDetails from './quests/QuestDetails.vue';
import QuestsListSection from './quests/quests-list-section.vue';
import { useNavigation } from '@/inputs/useNewNavigation';

const emit = defineEmits(['close']);
const props = defineProps<{
  inputListener: InputListener;
}>();

const questsStore = useQuests();
const quests = computed(() => questsStore.quests);

const questsToDisplay = computed(() => {
  return Object.values(quests.value).filter(
    (quest) => quest.state !== 'hidden',
  );
});

const activeQuests = computed(() => {
  return questsToDisplay.value.filter((quest) => quest.state === 'unlocked');
});

const completedQuests = computed(() => {
  return questsToDisplay.value.filter((quest) => quest.state === 'completed');
});

const navigableQuests = computed(() => {
  return [...activeQuests.value, ...completedQuests.value];
});

const questsUiClass = computed(() => {
  const mode = useRenderingStore().layoutMode;
  return mode === 'horizontal' ? 'quests-ui-horizontal' : 'quests-ui-vertical';
});

const inputListenerRef = computed(() => props.inputListener);

const { selectedElement: selectedQuest, selectElement } = useNavigation({
  mode: 'vertical',
  listener: inputListenerRef,
  elements: navigableQuests.value,
  onSelected: (quest: QuestState) => {
    // selectedQuest.value = quest;
  },
  looping: false,
});

function clickOnQuest(quest: QuestState) {
  selectElement(quest);
}

onMounted(() => {
  if (activeQuests.value.length > 0) {
    selectElement(activeQuests.value[0]);
  } else if (completedQuests.value.length > 0) {
    selectElement(completedQuests.value[0]);
  }
});
</script>

<style>
/* Write CSS for this vue component */
.quests-modal {
  width: 100%;
  min-height: 50%;
}

.quests-ui {
  display: flex;
  align-items: stretch;

  width: 100%;
  flex-grow: 2;
  height: 400px;
}

.quests-ui-horizontal {
  flex-direction: row;
}
.quests-ui-vertical {
  flex-direction: column;
}
.quests-list-container {
  background-color: rgba(150, 150, 150, 0.5);
  margin-right: 20px;
  flex-shrink: 0;
  border: 1px dashed white;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
.quest-details {
  background-color: rgba(150, 150, 150, 0.5);
  flex-grow: 1;
  border: 1px dashed white;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>
