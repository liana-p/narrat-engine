<template>
  <div class="skills-container">
    <SkillGridElement
      ref="skillGridElements"
      v-for="skill in skillsToDisplay"
      :key="skill.id"
      @choose="() => clickSkill(skill.id)"
      :chosenSkill="skill.id"
      :inputListener="inputListener"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import SkillGridElement from './SkillGridElement.vue';
import { SkillsState, useSkills } from '@/stores/skills';
import { InputListener } from '@/stores/inputs-store';
import { skillsConfig } from '@/config';
import {
  NavigationOptions,
  NavigationState,
  useNavigation,
} from '@/inputs/useNavigation';

type SkillGridElementType = InstanceType<typeof SkillGridElement>;
type SkillGridElementsType = SkillGridElementType[];

const props = defineProps<{
  inputListener: InputListener;
  lastChosenSkill: string | boolean;
}>();
const skillGridElements = ref<SkillGridElementsType>([]);
const skillGridContent = computed(() => {
  return skillGridElements.value.map((element) => element.gridElement);
});

const store = useSkills();
const skills = computed(() => store.skills);
const navigation = ref<NavigationState | null>(null);
const emit = defineEmits(['choose']);

function clickSkill(skill: string) {
  emit('choose', skill);
}

const skillConf = computed(() => {
  return skillsConfig().skills;
});

const skillsToDisplay = computed(() => {
  const skillStates: SkillsState = {};
  for (const skill in skills.value) {
    const conf = skillConf.value[skill];
    if (conf.hidden && skills.value[skill].level < 1) {
      continue;
    }
    skillStates[skill] = skills.value[skill];
  }
  return Object.values(skillStates);
});

onMounted(() => {
  navigation.value = useNavigation({
    mode: 'grid',
    listener: props.inputListener,
    elements: skillGridContent,
    columns: 3,
    onChosen: (index: number) => {
      clickSkill(skillsToDisplay.value[index].id);
    },
  }) as any;
  navigation.value?.mount();
  if (typeof props.lastChosenSkill === 'string') {
    const index = skillsToDisplay.value.findIndex(
      (skill) => skill.id === props.lastChosenSkill,
    );
    if (index >= 0) {
      navigation.value!.select(index);
    }
  }
});

onUnmounted(() => {
  if (navigation.value) {
    navigation.value.disable();
  }
});
</script>

<style scoped>
.skills-container {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 20px;
}
</style>
