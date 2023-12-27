<template>
  <div class="hud" :style="hudStyle" v-if="hasHud">
    <!-- <VolumeControls /> -->
    <div v-for="(stat, key) in stats" :key="key" class="hud-stat">
      <img class="hud-icon" :src="getStatImage(key as string)" />
      <span class="bold hud-text" v-html="statPrefix(key as string)"></span>
      <span> {{ formatStat(key as string, stat.value) }}</span>
      <span v-if="statSuffix" v-html="statSuffix(key as string)"></span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getAssetUrl,
  getCommonConfig,
  getDialogPanelWidth,
  getHudStatConfig,
} from '@/config';
import { HudStatData } from '@/config/common-config';
import { defaultConfig } from '@/config/config-output';
import { error } from '@/utils/error-handling';
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
    formatStat(key: string, value: number) {
      const conf = getHudStatConfig(key);
      const decimals = conf.decimals ?? 2;
      const stat = Math.floor(value * 10 ** decimals) / 10 ** decimals;
      const options: any = {};
      if (conf.formatting?.style) {
        options.style = conf.formatting.style;
        if (conf.formatting.style === 'currency') {
          options.currency = conf.formatting.currency ?? 'USD';
          options.currencyDisplay = 'narrowSymbol';
        }
        if (conf.formatting.style === 'unit') {
          options.unit = conf.formatting.unit ?? 'day';
        }
      }
      let result: string;
      try {
        result = stat.toLocaleString(undefined, options);
      } catch (e) {
        error(
          `Error formatting HUD stat, probably using an invalid config: ${e}`,
        );
        console.error(e);
        result = stat.toLocaleString();
      }
      return result;
    },
    statPrefix(key: string) {
      const conf = getHudStatConfig(key);
      return conf.prefix ?? (conf.suffix ? '' : conf.hideName ? '' : conf.name);
    },
    statSuffix(key: string) {
      const conf = getHudStatConfig(key);
      return conf.suffix ?? '';
    },
  },
  computed: {
    ...mapState(useHud, ['hudStats']),
    ...mapState(useRenderingStore, ['layoutMode']),
    statsConfig(): { [key: string]: HudStatData } {
      const config = getCommonConfig();
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
          (getCommonConfig().dialogPanel.rightOffset ??
            defaultConfig.common.dialogPanel.rightOffset!)
        }px`;
      }
      return {
        right,
      };
    },
    hasHud(): boolean {
      if (useHud().visible === false) {
        return false;
      }
      if (Object.keys(useHud().hudStats).length > 0) {
        return true;
      }
      return false;
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
