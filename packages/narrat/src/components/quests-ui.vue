<template>
  <div class="quests-ui" :class="questsUiClass">
    <div class="quests-list-container">
      <QuestsListSection
        :quests="activeQuests"
        :sectionId="'active'"
        :title="'Active Quests'"
        :fallbackText="'No active quests'"
        @quest-selected="clickOnQuest"
      />
      <QuestsListSection
        :quests="completedQuests"
        :sectionId="'completed'"
        :title="'Completed Quests'"
        :fallbackText="'No completed quests'"
        @quest-selected="clickOnQuest"
      />
    </div>
    <div class="quest-details">
      <QuestDetails v-if="selectedQuest" :quest="selectedQuest" />
    </div>
  </div>
</template>
<script lang="ts">
import { useRenderingStore } from '@/lib';
import { computed, defineComponent, ref } from 'vue';
import { QuestState, useQuests } from '../stores/quest-log';
import QuestDetails from './quests/QuestDetails.vue';
import QuestsListSection from './quests/quests-list-section.vue';

export default defineComponent({
  setup() {
    const questsStore = useQuests();
    const quests = computed(() => questsStore.quests);
    const selectedQuest = ref<null | QuestState>(null);
    return { quests, selectedQuest };
  },
  computed: {
    questsToDisplay() {
      return Object.values(this.quests).filter(
        (quest) => quest.state !== 'hidden',
      );
    },
    activeQuests() {
      return this.questsToDisplay.filter((quest) => quest.state === 'unlocked');
    },
    completedQuests() {
      return this.questsToDisplay.filter(
        (quest) => quest.state === 'completed',
      );
    },
    questsUiClass() {
      const mode = useRenderingStore().layoutMode;
      return mode === 'horizontal'
        ? 'quests-ui-horizontal'
        : 'quests-ui-vertical';
    },
  },
  mounted() {
    if (this.activeQuests.length > 0) {
      this.selectedQuest = this.activeQuests[0];
    } else if (this.completedQuests.length > 0) {
      this.selectedQuest = this.completedQuests[0];
    }
  },
  methods: {
    clickOnQuest(quest: QuestState) {
      this.selectedQuest = quest;
    },
  },
  components: { QuestDetails, QuestsListSection },
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
