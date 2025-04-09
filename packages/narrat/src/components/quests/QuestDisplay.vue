<template>
  <div
    class="quest-list-display"
    v-selected="props.highlighted"
    :class="{
      ...selectedClass(props.highlighted),
      ['quest-list-completed']: props.quest.state === 'completed',
      ['quest-list-in-progress']: props.quest.state !== 'completed',
    }"
  >
    <p class="quest-list-title">
      {{ data.title }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { getObjectiveConfig, getQuestConfig } from '@/config';
import { selectedClass } from '@/inputs/inputs-utils';
import { useInputs } from '@/stores/inputs-store';
import { QuestState } from '@/stores/quest-log';
import { computed } from 'vue';

const props = defineProps<{ quest: QuestState; highlighted: boolean }>();
const inputs = useInputs();

const data = computed(() => {
  return getQuestConfig(props.quest.id);
});
</script>
<style>
.quest-list-display {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.quest-list-display:hover {
  transform: translateY(-2px);
}
.quest-list-title {
  padding-left: 10px;
  font-size: 1.2rem;
}
.quest-list-completed {
  color: var(--completed-quest-title-color);
}
.quest-list-in-progress {
  color: var(--quest-title-color);
}

.quest-list-display.selected {
  background-color: var(--selected-quest-background-color);
}
</style>
