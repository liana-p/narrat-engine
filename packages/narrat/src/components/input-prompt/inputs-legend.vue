<template>
  <div
    class="inputs-legend"
    v-if="
      inputs.showPrompts && getCommonConfig().input.showBottomLegend !== false
    "
  >
    <InputPrompt
      v-for="prompt in legend"
      :key="prompt"
      :input="prompt"
      :showLabel="true"
      class="legend-prompt"
    />
  </div>
</template>
<script lang="ts" setup>
import { useInputs } from '@/stores/inputs-store';
import InputPrompt from './input-prompt.vue';
import { getCommonConfig } from '@/config';
import { computed } from 'vue';

const inputs = useInputs();

const props = defineProps<{
  extraInputs?: string[];
}>();

const legend = computed(() => {
  return [...(props.extraInputs ?? []), ...inputs.inputLegend];
});
</script>
<style>
.inputs-legend {
  position: absolute;
  bottom: 5px;
  left: 5px;
  opacity: 0.7;
}

.legend-prompt {
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px;
  margin-right: 10px;
}
</style>
