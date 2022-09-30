<template>
  <div class="tooltips-ui">
    <FloatingTooltip v-if="tooltip" v-bind="tooltip" />
  </div>
</template>
<script lang="ts" setup>
import { tooltipsConfig } from '@/config';
import { useTooltips } from '@/stores/tooltip-store';
import { computed } from 'vue';
import FloatingTooltip from '../utils/floating-tooltip.vue';

const tooltip = computed(() => useTooltips().tooltip);
const width = computed(() => tooltipsConfig().options.width);
</script>
<style></style>
