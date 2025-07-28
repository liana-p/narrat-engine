<template>
  <div class="setting-cycle">
    <button
      class="cycle-button cycle-prev"
      @click="cyclePrevious"
      :disabled="currentIndex === 0"
    >
      ←
    </button>
    <span class="cycle-value">{{ $t(currentLabel) }}</span>
    <button
      class="cycle-button cycle-next"
      @click="cycleNext"
      :disabled="currentIndex === options.length - 1"
    >
      →
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue';
import { type ChoiceOption } from '@/config/settings-config';
import { InputListener, useInputs } from '@/stores/inputs-store';

export interface CycleWidgetProps {
  name: string;
  modelValue: string | number;
  options: ChoiceOption[];
  focused: boolean;
}

const props = defineProps<CycleWidgetProps>();
const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const currentIndex = computed(() => {
  return props.options.findIndex((option) => option.value === props.modelValue);
});

const currentLabel = computed(() => {
  const choice = props.options.find(
    (option) => option.value === props.modelValue,
  );
  return choice?.label || '';
});

const cyclePrevious = () => {
  const index = currentIndex.value;
  if (index > 0) {
    emit('update:modelValue', props.options[index - 1].value);
  }
};

const cycleNext = () => {
  const index = currentIndex.value;
  if (index < props.options.length - 1) {
    emit('update:modelValue', props.options[index + 1].value);
  }
};

let focusedInputListener: InputListener | null = null;

const startFocusedInputListener = () => {
  focusedInputListener = useInputs().registerInputListener(
    'slider-widget-focused',
    {
      decreaseSetting: {
        press: cyclePrevious,
      },
      increaseSetting: {
        press: cycleNext,
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
onUnmounted(() => {
  stopFocusedInputListener();
});
</script>

<style scoped>
.setting-cycle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cycle-button {
  background: var(--button-background);
  border: 1px solid var(--button-border);
  color: var(--button-text);
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: var(--font-base);
  min-width: 2rem;
}

.cycle-button:hover:not(:disabled) {
  background: var(--button-hover-background);
}

.cycle-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cycle-value {
  min-width: 100px;
  text-align: center;
  font-weight: bold;
  font-size: var(--font-base);
}
</style>
