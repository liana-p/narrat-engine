<template>
  <modal class="quests" @close="close" containerCssClass="quests-modal">
    <template v-slot:header>
      <h3 class="title">Quests</h3>
    </template>
    <template v-slot:body>
      <div
        class="quests-container"
        v-if="Object.keys(questsToDisplay).length > 0"
      >
        <div
          class="quest-display"
          v-for="quest in questsToDisplay"
          :key="quest.id"
        >
          <div
            class="quest-header"
            :class="
              quest.state === 'completed'
                ? 'quest-completed'
                : 'quest-in-progress'
            "
          >
            <h3 class="quest-title">
              {{ getQuestData(quest.id).title }}
              {{ getDisplayTextForQuestState(quest) }}
            </h3>
          </div>
          <p class="quest-description">
            {{ getQuestDescription(quest) }}
          </p>
          <ul
            class="quest-objectives-container list-disc"
            v-if="quest.state !== 'completed'"
          >
            <li
              class="quest-objective-display"
              v-for="objective in getAvailableObjectives(quest)"
              :key="objective.id"
            >
              <p
                class="quest-objective-description"
                :class="
                  objective.state === 'completed'
                    ? 'quest-objective-completed'
                    : 'quest-objctive-in-progress'
                "
              >
                {{ getObjectiveData(quest.id, objective.id).description }}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="menu-container" v-else>
        <h2 class="title">There are no quests!</h2>
      </div>
    </template>
  </modal>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import Modal from './utils/modal-window.vue';
import { useQuests, QuestState } from '../stores/quest-log';
import { getQuestConfig, getObjectiveConfig } from '../config';
import { filterObject } from '../utils/object-iterators';

export default defineComponent({
  setup() {
    const questsStore = useQuests();
    const quests = computed(() => questsStore.quests);
    return { quests };
  },
  computed: {
    questsToDisplay() {
      return filterObject(this.quests, (quest) => quest.state !== 'hidden');
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    getQuestData(questId: string) {
      return getQuestConfig(questId);
    },
    getObjectiveData(questId: string, objectiveId: string) {
      return getObjectiveConfig(questId, objectiveId);
    },
    getDisplayTextForQuestState(quest: QuestState) {
      switch (quest.state) {
        case 'hidden':
          return ' Hidden';
        case 'unlocked':
          return '';
        case 'completed':
          return ' (Completed)';
        default:
          return ' Unknown';
      }
    },
    getQuestDescription(quest: QuestState) {
      if (quest.ending) {
        return quest.ending;
      }
      return this.getQuestData(quest.id).description;
    },
    getAvailableObjectives(quest: QuestState) {
      return filterObject(quest.objectives, (objective) => {
        return objective.state !== 'hidden';
      });
    },
  },
  components: {
    Modal,
  },
});
</script>

<style>
/* Write CSS for this vue component */
.quests-modal {
  width: 100%;
  min-height: 50%;
}

/* CSS for .quest-header with row flex */
.quest-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.quest-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.quest-completed {
  color: var(--completed-quest-title-color);
}
.quest-in-progress {
  color: var(--quest-title-color);
}

.quest-state {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.quest-description {
  font-size: 1.1rem;
  text-align: justify;
  font-style: italic;
  margin-bottom: 0.5rem;
}
.quest-objectives-container {
  margin-left: 10px;
}
.quest-objective-completed {
  color: var(--objective-completed-color);
  text-decoration: line-through;
}
.quest-objective-in-progress {
  color: var(--objective-in-progress-color);
}
.quest-objective-description {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
