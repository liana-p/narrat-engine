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

const tooltips = useTooltips();
const tooltip = computed(() => tooltips.tooltip);
const floatingTooltip = computed(() => {
  if (tooltip.value) {
    return {
      ...tooltip.value,
      screenMargin: tooltipsConfig().options.screenEdgesMinimumMargin ?? 5,
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
