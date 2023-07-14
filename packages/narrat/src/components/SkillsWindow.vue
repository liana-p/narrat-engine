<template>
  <SkillsGrid
    v-if="!chosenSkill"
    :inputListener="inputListener"
    :lastChosenSkill="lastChosenSkill"
    @choose="clickSkill"
  />
  <SkillDetails
    v-else-if="typeof chosenSkill === 'string'"
    :chosenSkill="chosenSkill"
    :inputListener="inputListener"
    @cancel="closeSkill"
  />
</template>

<script lang="ts" setup>
import SkillDetails from './skills/SkillDetails.vue';
import SkillsGrid from './skills/SkillsGrid.vue';
import { ref } from 'vue';
import { InputListener } from '@/stores/inputs-store';

defineProps<{
  inputListener: InputListener;
}>();

const chosenSkill = ref<string | boolean>(false);
const lastChosenSkill = ref<string | boolean>(false);

function clickSkill(skill: string) {
  lastChosenSkill.value = skill;
  chosenSkill.value = skill;
}
function closeSkill() {
  chosenSkill.value = false;
}
</script>
