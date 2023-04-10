<template>
  <div class="tooltips-ui">
    <FloatingTooltip v-if="floatingTooltip" v-bind="floatingTooltip" />
  </div>
</template>
<script lang="ts" setup>
import { tooltipsConfig } from '@/config';
import { useTooltips } from '@/stores/tooltip-store';
import { computed } from 'vue';
import FloatingTooltip, {
  FloatingTooltipProps,
} from '../utils/floating-tooltip.vue';

const floatingTooltip = computed(() => {
  const tooltip = useTooltips().tooltip;
  return {
    ...tooltip,
    screenMargin: tooltipsConfig().options.screenEdgesMinimumMargin ?? 5,
  } as FloatingTooltipProps;
});
</script>
<style></style>
