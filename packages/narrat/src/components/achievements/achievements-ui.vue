<template>
  <div
    v-if="Object.keys(achievementsToDisplay).length > 0"
    class="achievements-scroll-container"
    ref="scrollContainer"
  >
    <AchievementsSection
      v-for="section in sections"
      :key="section.id"
      :achievements="section.achievements"
      :title="section.title"
      :id="section.id"
      @chosen="clickAchievement"
    />
  </div>
  <div v-else>
    <h2>The achievements section is empty!</h2>
  </div>
</template>

<script setup lang="ts">
import { getConfig, getAchievementConfig } from '@/config';
import { AchievementConfig } from '@/config/achievements-config';
import { useDialogStore } from '@/stores/dialog-store';
import { useAchievements, AchievementState } from '@/stores/achievements-store';
import { error } from '@/utils/error-handling';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import AchievementsSection, {
  AchievementsSectionProps,
} from './achievements-section.vue';
import { useScrolling } from '@/inputs/useScrolling';
import { useInputs, InputListener } from '@/stores/inputs-store';

const props = defineProps<{
  inputListener: InputListener;
}>();

const store = useAchievements();
const dialogStore = useDialogStore();
const achievements = computed(() => store.achievements);
const currentlyChoosing = computed(() => dialogStore.currentDialog.choices);
const scrollContainer = ref<HTMLElement | null>(null);
const inputs = useInputs();

// Set up scrolling functionality
useScrolling({
  container: scrollContainer,
  scrollSpeed: 40,
  onlyVertical: true,
  inputListener: props.inputListener,
});

const chosenId = ref<string | false>(false);

function close() {
  emit('close');
}

function clickAchievement(achievement: string) {
  chosenId.value = achievement;
}

function closeAchievement() {
  chosenId.value = false;
}

const achievementsToDisplay = computed((): AchievementState[] => {
  return Object.values(achievements.value);
});

const chosenAchievement = computed((): null | AchievementState => {
  if (chosenId.value) {
    return achievements.value[chosenId.value];
  }
  return null;
});

const chosenAchievementConf = computed((): null | AchievementConfig => {
  if (chosenId.value) {
    return achievementConf.value[chosenId.value];
  }
  return null;
});

const achievementConf = computed(
  (): {
    [key: string]: AchievementConfig;
  } => {
    return getConfig().achievements.achievements;
  },
);

const sections = computed((): AchievementsSectionProps[] => {
  // Split the achievements into sections based on the achievement category, with a default category for achievements not in any.
  const categories = getConfig().achievements.categories;
  const sections: AchievementsSectionProps[] = [];
  const possibleSections = achievementsToDisplay.value.reduce(
    (acc, achievement) => {
      const achievementData = getAchievementConfig(achievement.id);
      const category = achievementData.category ?? 'default';
      const categoryConfig = categories.find((c) => c.id === category);
      if (!categoryConfig) {
        error(`Unknown category ${category}`);
        return acc;
      }
      if (achievementData?.hidden && !achievement.unlocked) {
        return acc;
      }
      let matchingSection = acc.find((s) => s.id === category);
      if (!matchingSection) {
        matchingSection = {
          id: category,
          title: categoryConfig.title,
          achievements: [],
        };
        acc.push(matchingSection);
      }
      matchingSection.achievements.push(achievement);
      return acc;
    },
    sections,
  );
  return possibleSections;
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<style>
.achievements-modal {
  width: 800px;
  min-height: 50%;
}
.achievements-container {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 20px;
}

.achievement-description-container {
  justify-content: space-between;
  align-items: stretch;
}

.achievement-left {
  border: 1px dashed white;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
}

.achievement-right {
  border: 1px dashed white;
  flex-direction: column;
  flex-grow: 2;
  align-items: baseline;
  padding: 10px;
}

.achievements-scroll-container {
  max-height: 100%;
  overflow-y: auto;
  padding: 10px;
  position: relative;
}
</style>
