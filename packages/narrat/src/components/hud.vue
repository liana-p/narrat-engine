<template>
  <div class="hud" :style="hudStyle">
    <!-- <VolumeControls /> -->
    <div v-for="(stat, key) in stats" :key="key" class="hud-stat">
      <img class="hud-icon" :src="getStatImage(key as string)" />
      <span class="bold hud-text">{{ statsConfig[key].name }}</span
      >:
      <span> {{ Math.floor(stat.value * 100) / 100 }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getAssetUrl,
  getConfig,
  getDialogPanelWidth,
  HudStatConfig,
} from '@/config';
import { HudStatsState, useHud } from '@/stores/hud-stats-store';
import { useRenderingStore } from '@/stores/rendering-store';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {};
  },
  methods: {
    getStatImage(key: string) {
      return getAssetUrl(this.statsConfig[key].icon);
    },
  },
  computed: {
    ...mapState(useHud, ['hudStats']),
    ...mapState(useRenderingStore, ['layoutMode']),
    statsConfig(): { [key: string]: HudStatConfig } {
      const config = getConfig();
      return config.hudStats;
    },
    stats(): HudStatsState {
      return this.hudStats;
    },
    hudStyle(): any {
      let right = '0';
      if (this.layoutMode === 'horizontal') {
        right = `${
          getDialogPanelWidth() +
          (getConfig().layout.dialogPanel?.rightOffset ?? 0)
        }px`;
      }
      return {
        right,
      };
    },
  },
});
</script>

<style>
.hud {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: row-reverse;
  z-index: 3;
}

.hud-stat {
  border: 1px dotted white;
  background-color: var(--hud-background);
  color: var(--hud-text-color);
  padding: 5px;
}

.hud-icon {
  display: inline-block;
  height: 1em;
}

.hud-text {
  margin-left: 5px;
}
</style>
