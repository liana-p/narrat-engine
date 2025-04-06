<template>
  <div :class="['slider-widget', containerClass]">
    <input
      ref="slider"
      :class="['number-slider', inputClass]"
      type="range"
      :id="`slider-${name}`"
      :name="name"
      :min="minValue"
      :max="maxValue"
      :step="step"
      v-model="sliderValue"
    />
  </div>
</template>

<script setup lang="ts">
// eslint-disable vue/no-mutating-props
import { InputListener, useInputs } from '@/stores/inputs-store';
import { ref, watch } from 'vue';

const props = defineProps<{
  name: string;
  containerClass?: string;
  inputClass?: string;
  minValue: number;
  maxValue: number;
  step: number;
  value: number;
  focused: boolean;
  inputListener: InputListener;
}>();

const slider = ref<HTMLInputElement | null>(null);
const sliderValue = ref(props.value);
const interacting = ref(false);
let interactingInputListener: InputListener | null = null;

const emit = defineEmits(['change']);

watch(sliderValue, (newValue: number) => {
  emit('change', newValue);
});

const slideLeft = () => {
  sliderValue.value -= props.step;
  emit('change', sliderValue.value);
};

const slideRight = () => {
  sliderValue.value += props.step;
  emit('change', sliderValue.value);
};

const takeControl = () => {
  interactingInputListener = useInputs().registerInputListener(
    'slider-widget',
    {
      sliderDecrease: {
        press: slideLeft,
      },
      sliderIncrease: {
        press: slideRight,
      },
      sliderRelease: {
        press: releaseControl,
      },
    },
  );
  interacting.value = true;
};

const releaseControl = () => {
  interacting.value = false;
  if (interactingInputListener) {
    useInputs().unregisterInputListener(
      interactingInputListener as InputListener,
    );
    interactingInputListener = null;
  }
};

const onFocus = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.inputListener.actions.sliderControl = {
    press: takeControl,
  };
};

const onBlur = () => {
  releaseControl();
  // eslint-disable-next-line vue/no-mutating-props
  delete props.inputListener.actions.sliderControl;
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

<style scoped></style>
