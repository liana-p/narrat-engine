<template>
  <div :id="`skill-display-${chosenSkill}`">
    <div class="flex flex-row skill-description-container">
      <div class="flex skill-left">
        <div class="skill-display" :style="skillStyle"></div>
      </div>
      <div class="flex skill-right">
        <h2>{{ $t(skillName) }}</h2>
        <hr class="hr-solid" />
        <h3>
          {{
            $t('narrat.game_menu.skills.skill_details_level_text', {
              level: level,
            })
          }}
        </h3>
        <p v-html="$t(skillDescription)" />
      </div>
    </div>
    <div ref="buttonsContainer">
      <button class="nrt-button" @click="close">
        {{ $t('narrat.game_menu.skills.back') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputListener } from '@/stores/inputs-store';
import { useSkillData } from './skills-composables';
import { onMounted, onUnmounted, ref } from 'vue';
import { OldNavigationState, useOldNavigation } from '@/inputs/useNavigation';

const props = defineProps<{
  chosenSkill: string;
  inputListener: InputListener;
}>();

const emit = defineEmits(['cancel']);
const navigation = ref<OldNavigationState | null>(null);
const buttonsContainer = ref<HTMLElement | null>(null);
function close() {
  emit('cancel');
}
const { skillStyle, skillName, skillDescription, skillLevelText, level } =
  useSkillData(props.chosenSkill);

onMounted(() => {
  navigation.value = useOldNavigation({
    mode: 'list',
    listener: props.inputListener,
    container: buttonsContainer,
    onChosen: () => {
      close();
    },
  }) as any;
  navigation.value!.mount();
});
onUnmounted(() => {
  if (navigation.value) {
    navigation.value.disable();
    navigation.value = null;
  }
});
</script>

<style scoped>
.skill-display {
  width: 200px;
  height: 300px;
  position: relative;
  background-size: cover;
}
.skill-description-container {
  justify-content: space-between;
  align-items: stretch;
}

.skill-left {
  flex-direction: column;
  border: 1px dashed white;
  padding: 10px;
  justify-content: center;
}

.skill-right {
  border: 1px dashed white;
  flex-direction: column;
  align-items: baseline;
  flex-grow: 2;
  align-items: baseline;
}
</style>
