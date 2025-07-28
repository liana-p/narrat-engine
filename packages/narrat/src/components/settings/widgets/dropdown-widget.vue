<template>
  <select
    class="nrt-select setting-dropdown"
    :id="`setting-dropdown-${name}`"
    :name="name"
    :value="modelValue"
    @change="
      $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
    "
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      class="nrt-option"
    >
      {{ $t(option.label) }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { type ChoiceOption } from '@/config/settings-config';
import { InputListener, useInputs } from '@/stores/inputs-store';
import { watch } from 'vue';

export interface DropdownWidgetProps {
  name: string;
  modelValue: string | number;
  options: ChoiceOption[];
  focused: boolean;
}

const props = defineProps<DropdownWidgetProps>();
const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

let focusedInputListener: InputListener | null = null;

const selectPrevious = () => {
  const currentIndex = props.options.findIndex(
    (option) => option.value === props.modelValue,
  );
  if (currentIndex > 0) {
    const previousOption = props.options[currentIndex - 1];
    emit('update:modelValue', previousOption.value);
  }
};

const selectNext = () => {
  const currentIndex = props.options.findIndex(
    (option) => option.value === props.modelValue,
  );
  if (currentIndex < props.options.length - 1) {
    const nextOption = props.options[currentIndex + 1];
    emit('update:modelValue', nextOption.value);
  }
};
const startFocusedInputListener = () => {
  focusedInputListener = useInputs().registerInputListener(
    'slider-widget-focused',
    {
      decreaseSetting: {
        press: selectPrevious,
      },
      increaseSetting: {
        press: selectNext,
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
.setting-dropdown {
  min-width: 150px;
}
</style>
