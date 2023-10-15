<template>
  <div class="tooltips-ui">
    <FloatingTooltip v-if="tooltip" v-bind="floatingTooltip" />
  </div>
</template>
<script lang="ts" setup>
import { getTooltipConfig, tooltipsConfig } from '@/config';
import { TooltipState, useTooltips } from '@/stores/tooltip-store';
import { computed } from 'vue';
import FloatingTooltip, {
  FloatingTooltipProps,
} from '../utils/floating-tooltip.vue';
import { TooltipStyling } from '@/config/tooltips-config';
import { useRenderingStore } from '@/stores/rendering-store';

const tooltips = useTooltips();
const rendering = useRenderingStore();
const tooltip = computed(() => tooltips.tooltip);
const screenWidth = computed(() => rendering.screenWidth);
const screenHeight = computed(() => rendering.screenHeight);
const floatingTooltip = computed(() => {
  if (tooltip.value) {
    return {
      ...tooltip.value,
      screenMargin: tooltipsConfig().options.screenEdgesMinimumMargin ?? 5,
      screenWidth: screenWidth.value,
      screenHeight: screenHeight.value,
      ...figureOutTooltipStyling(tooltip.value),
    } as any as FloatingTooltipProps;
  }
  return undefined as any;
});

function figureOutTooltipStyling(tooltip: TooltipState) {
  let styling: TooltipStyling = {};
  if (tooltipsConfig().options.styling) {
    styling = { ...styling, ...tooltipsConfig().options.styling };
  }
  if (getTooltipConfig(tooltip.keyword)?.styling) {
    styling = {
      ...styling,
      ...getTooltipConfig(tooltip.keyword)?.styling,
    };
  }
  return styling;
}
</script>
<style></style>
