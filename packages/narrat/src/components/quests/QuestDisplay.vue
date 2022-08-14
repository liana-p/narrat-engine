<template>
  <div
    class="quest-list-display"
    :class="
      quest.state === 'completed'
        ? 'quest-list-completed'
        : 'quest-list-in-progress'
    "
  >
    <p class="quest-list-title">
      {{ data.title }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { getObjectiveConfig, getQuestConfig } from '@/config';
import { QuestState } from '@/stores/quest-log';
import { computed } from 'vue';

const props = defineProps<{ quest: QuestState }>();

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
  padding-left: 20px;
  font-size: 1.2rem;
}
.quest-list-completed {
  color: var(--completed-quest-title-color);
}
.quest-list-in-progress {
  color: var(--quest-title-color);
}
</style>
