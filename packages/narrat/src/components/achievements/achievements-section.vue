<template>
  <div class="achievements-section" :class="`section-${props.id}`">
    <h3>{{ $t(title) }}</h3>
    <div class="achievements-section-achievements">
      <AchievementTile
        :achievement="achievement.id"
        v-for="achievement in achievements"
        :key="achievement.id"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AchievementState, useAchievements } from '@/stores/achievements-store';
import AchievementTile from './achievement-tile.vue';

export interface AchievementsSectionProps {
  achievements: AchievementState[];
  title: string;
  id: string;
}
const props = defineProps<AchievementsSectionProps>();
</script>

<style>
.achievements-section {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
}

.achievements-section-achievements {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 20px;
  width: 100%;
}

@media (max-width: 768px) {
  .achievements-section-achievements {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .achievements-section-achievements {
    grid-template-columns: 1fr;
  }
}
</style>
