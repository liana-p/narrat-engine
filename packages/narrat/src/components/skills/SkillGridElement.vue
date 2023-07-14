<template>
  <button
    @click="choose"
    class="skill-grid-element"
    :style="skillStyle"
    ref="gridElement"
  >
    <h3 class="skill-title">{{ skillName }}</h3>
    <div class="skill-xp-container">
      <div class="skill-xp-bar" :style="xpBarWidth"></div>
      <h3 class="skill-xp-text">{{ skillState.xp }} / {{ xpPerLevel }} XP</h3>
    </div>
    <h3 class="skill-level">{{ skillState.level }}</h3>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSkillData } from './skills-composables';
import { InputListener } from '@/stores/inputs-store';

const props = defineProps<{
  chosenSkill: string;
  inputListener: InputListener;
}>();

const gridElement = ref<HTMLElement | null>(null);
defineExpose({
  gridElement,
});

const emit = defineEmits(['choose']);

function choose() {
  emit('choose');
}
const { skillStyle, skillName, skillState, xpPerLevel } = useSkillData(
  props.chosenSkill,
);

const xpBarWidth = computed(() => {
  return {
    width: `${Math.floor((skillState.value.xp / xpPerLevel.value) * 100)}%`,
  };
});
</script>

<style scoped>
.skill-grid-element {
  width: 200px;
  height: 300px;
  position: relative;
  background-size: cover;
}

.skill-grid-element.selected {
  border: var(--selected-border);
}

.skill-title {
  position: absolute;
  bottom: 0px;
  text-align: center;
  width: 100%;
  color: var(--skills-text-color);
  background: var(--skills-text-background);
}

.skill-xp-container {
  position: absolute;
  top: 0;
  left: 0;
  height: var(--skills-xp-bar-height);
  width: calc(100% - var(--skills-xp-bar-height));
  background-color: rgba(0, 0, 0, 0.5);
}

.skill-xp-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 250, 0.5);
}

.skill-xp-text {
  z-index: 2;
}

.skill-level {
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--skills-level-color);
  width: var(--skills-xp-bar-height);
  height: var(--skills-xp-bar-height);
  background-color: var(--skills-level-background);
}
</style>
