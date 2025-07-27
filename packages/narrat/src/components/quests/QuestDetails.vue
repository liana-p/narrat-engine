<template>
  <div class="quest-display">
    <div
      class="quest-header"
      :class="
        quest.state === 'completed' ? 'quest-completed' : 'quest-in-progress'
      "
    >
      <h3 class="quest-title">
        {{ $t(data.title) }}
        {{ $t(stateText) }}
      </h3>
    </div>
    <p class="quest-description">
      {{ $t(description) }}
    </p>
    <ul
      class="quest-objectives-container list-disc"
      v-if="quest.state !== 'completed'"
    >
      <li
        class="quest-objective-display"
        v-for="objective in availableObjectives"
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
          {{ $t(getObjectiveData(objective.id).description) }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import {
  getObjectiveConfig,
  getQuestConfig,
  getQuestEndingConfig,
} from '@/config';
import { QuestState } from '@/stores/quest-log';
import { computed } from 'vue';

const props = defineProps<{ quest: QuestState }>();

const data = computed(() => {
  return getQuestConfig(props.quest.id);
});
function getObjectiveData(objectiveId: string) {
  return getObjectiveConfig(props.quest.id, objectiveId);
}
const stateText = computed(() => {
  switch (props.quest.state) {
    case 'hidden':
      return ' Hidden';
    case 'unlocked':
      return '';
    case 'completed':
      return ' (Completed)';
    default:
      return ' Unknown';
  }
});
const description = computed(() => {
  if (props.quest.ending) {
    const endingData = getQuestEndingConfig(props.quest.id, props.quest.ending);
    return endingData.description;
  }
  if (props.quest.succeeded && data.value.succeededDescription) {
    return data.value.succeededDescription;
  }
  if (!props.quest.succeeded && data.value.failedDescription) {
    return data.value.failedDescription;
  }
  return data.value.description;
});
const availableObjectives = computed(() => {
  return Object.values(props.quest.objectives).filter(
    (objective) => objective.state !== 'hidden',
  );
});
</script>
<style>
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
