<template>
  <span
    class="input-prompt-container"
    v-if="inputs.showPrompts && action && iconPath"
  >
    <span class="input-prompt-label" v-if="showLabel || label">{{
      labelText
    }}</span>
    <img :src="getImageUrl(iconPath)" class="input-prompt-icon" />
  </span>
</template>
<script lang="ts" setup>
import { getImageUrl } from '@/config';
import { useInputs } from '@/stores/inputs-store';
import { computed } from 'vue';
import { error } from '@/utils/error-handling';

const inputs = useInputs();

const props = defineProps<{
  input: string;
  label?: string;
  showLabel?: boolean;
}>();

const action = computed(() => {
  const result = inputs.getAction(props.input);
  if (!result) {
    error(`Input action ${props.input} does not exist.`);
  }
  return result;
});

const iconPath = computed(() => {
  if (inputs.inputMode === 'gamepad') {
    return action.value?.gamepadIcon;
  } else {
    return action.value?.keyboardIcon;
  }
});

const labelText = computed(() => {
  if (props.label) {
    return props.label;
  } else {
    return action.value?.label ?? 'NONE';
  }
});
</script>
<style>
.input-prompt-icon {
  width: 1.4em;
  height: 1.4em;
  margin-left: 0.5em;
  display: inline-block;
}
</style>
