<template>
  <div v-if="Object.keys(achievementsToDisplay).length > 0">
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

<script lang="ts">
import { getConfig, getAchievementConfig } from '@/config';
import { AchievementConfig } from '@/config/achievements-config';
import { useDialogStore } from '@/stores/dialog-store';
import { useAchievements, AchievementState } from '@/stores/achievements-store';
import { error } from '@/utils/error-handling';
import { computed, defineComponent } from 'vue';
import AchievementsSection, {
  AchievementsSectionProps,
} from './achievements-section.vue';

export default defineComponent({
  setup() {
    const store = useAchievements();
    const dialogStore = useDialogStore();
    const achievements = computed(() => store.achievements);
    const currentlyChoosing = computed(() => dialogStore.currentDialog.choices);
    return { achievements, currentlyChoosing };
  },
  emits: ['close'],
  data() {
    return {
      chosenId: false as string | false,
    };
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    clickAchievement(achievement: string) {
      this.chosenId = achievement;
    },
    closeAchievement() {
      this.chosenId = false;
    },
  },
  computed: {
    achievementsToDisplay(): AchievementState[] {
      return Object.values(this.achievements);
    },
    chosenAchievement(): null | AchievementState {
      if (this.chosenId) {
        return this.achievements[this.chosenId];
      }
      return null;
    },
    chosenAchievementConf(): null | AchievementConfig {
      if (this.chosenId) {
        return this.achievementConf[this.chosenId];
      }
      return null;
    },
    achievementConf(): {
      [key: string]: AchievementConfig;
    } {
      return getConfig().achievements.achievements;
    },
    sections(): AchievementsSectionProps[] {
      // Split the achievements into sections based on the achievement category, with a default category for achievements not in any.
      const categories = getConfig().achievements.categories;
      const sections: AchievementsSectionProps[] = [];
      const possibleSections = this.achievementsToDisplay.reduce(
        (acc, achievement) => {
          const category =
            getAchievementConfig(achievement.id).category ?? 'default';
          const categoryConfig = categories.find((c) => c.id === category);
          if (!categoryConfig) {
            error(`Unknown category ${category}`);
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
    },
  },
  components: { AchievementsSection },
});
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
</style>
