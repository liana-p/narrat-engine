<template>
  <div class="achievement-display tile" :id="`achievement-${achievement}`">
    <div class="achievement-icon" :style="style"></div>
    <p class="obtained-status">
      {{ obtainedStatus }}
    </p>
    <h3 class="achievement-title">
      {{ name }}
    </h3>
    <p class="achievement-description">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import {
  getAchievementConfig,
  getAchievementsConfig,
  getAssetUrl,
} from '@/config';
import { useAchievements } from '@/stores/achievements-store';
import { computed } from 'vue';

export interface AchievementTileProps {
  achievement: string;
}
const props = defineProps<AchievementTileProps>();
const achievements = useAchievements();
const state = computed(
  () => achievements.getExistingAchievement(props.achievement)!,
);
const conf = computed(() => getAchievementConfig(props.achievement));
const secretAchievements = getAchievementsConfig().secretAchievements ?? {
  censorName: true,
  censorDescription: true,
};

const style = computed(() => {
  let icon = state.value.unlocked ? conf.value.icon : conf.value.lockedIcon;
  if (!icon) {
    icon = getAchievementsConfig().defaultAchievementIcon;
  }
  return {
    backgroundImage: `url(${getAssetUrl(icon)})`,
  };
});
const name = computed(() => {
  if (!conf.value.secret || !secretAchievements.censorName) {
    return conf.value.name;
  } else {
    return 'Hidden Achievement';
  }
});
const description = computed(() => {
  if (!conf.value.secret || !secretAchievements.censorDescription) {
    return conf.value.description;
  } else {
    return 'This achievement is hidden. Complete it to discover more.';
  }
});

const obtainedStatus = computed(() => {
  if (!state.value.unlocked) {
    return 'Not obtained yet';
  } else {
    return `Obtained ${new Date(state.value.unlockTime!).toLocaleDateString()}`;
  }
});
</script>
<style>
.achievement-display {
  display: flex;
  align-items: center;
  flex-direction: column;
  border-color: var(--achievement-tile-border-color);
  position: relative;
  background: var(--achievement-tile-background);
}

.achievement-icon {
  width: 200px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
}

.obtained-status {
  width: 100%;
  text-align: left;
  color: var(--achievement-description-color);
  font-style: italic;
}
.achievement-title {
  text-align: left;
  width: 100%;
  color: var(--achievement-title-color);
  margin-bottom: 5px;
}
.achievement-description {
  width: 100%;
  text-align: left;
  color: var(--achievement-description-color);
}
</style>
