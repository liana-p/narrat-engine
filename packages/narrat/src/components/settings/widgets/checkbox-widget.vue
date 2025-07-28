<template>
  <input
    type="checkbox"
    class="setting-checkbox"
    :id="`setting-checkbox-${name}`"
    :name="name"
    :checked="modelValue"
    @change="
      $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
    "
  />
</template>

<script setup lang="ts">
import { InputListener, useInputs } from '@/stores/inputs-store';
import { watch } from 'vue';

export interface CheckboxWidgetProps {
  name: string;
  modelValue: boolean;
  focused?: boolean;
}

const props = defineProps<CheckboxWidgetProps>();
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

let focusedInputListener: InputListener | null = null;

const updateValue = (value: boolean) => {
  emit('update:modelValue', value);
};

const toggle = () => {
  updateValue(!props.modelValue);
};

const startFocusedInputListener = () => {
  focusedInputListener = useInputs().registerInputListener(
    'slider-widget-focused',
    {
      confirm: {
        press: toggle,
      },
    },
    true,
  );
};

const stopFocusedInputListener = () => {
  if (focusedInputListener) {
    useInputs().unregisterInputListener(focusedInputListener as InputListener);
    focusedInputListener = null;
  }
};

const onFocus = () => {
  startFocusedInputListener();
};

const onBlur = () => {
  stopFocusedInputListener();
};

watch(
  () => props.focused,
  (newValue: boolean, oldValue: boolean) => {
    if (newValue && !oldValue) {
      // Slider is being focused
      onFocus();
    } else if (!newValue && oldValue) {
      // Slider is being blurred
      onBlur();
    }
  },
);
</script>

<style scoped>
.setting-checkbox {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
