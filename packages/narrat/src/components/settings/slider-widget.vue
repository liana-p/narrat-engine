<template>
  <div class="slider-widget-container">
    <div :class="['slider-widget', containerClass]">
      <button
        class="slider-button decrease"
        @click="slideLeft"
        :disabled="sliderValue <= minValue"
      >
        -
      </button>
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
        @mouseup="onMouseUp"
        @touchend="onMouseUp"
        @change="onChange"
      />
      <button
        class="slider-button increase"
        @click="slideRight"
        :disabled="sliderValue >= maxValue"
      >
        +
      </button>
    </div>
    <div class="slider-preview">
      <span class="slider-value">{{ sliderValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable vue/no-mutating-props
import { InputListener, useInputs } from '@/stores/inputs-store';
import { clamp, decimalClamp } from '@/utils/math-utils';
import { onUnmounted, ref, watch } from 'vue';

const props = defineProps<{
  name: string;
  containerClass?: string;
  inputClass?: string;
  minValue: number;
  maxValue: number;
  step: number;
  value: number;
  decimals?: number;
  focused: boolean;
  inputListener: InputListener | null;
  liveUpdate?: boolean;
}>();

const slider = ref<HTMLInputElement | null>(null);
const sliderValue = ref(props.value);
const interacting = ref(false);
let interactingInputListener: InputListener | null = null;
let focusedInputListener: InputListener | null = null;

const emit = defineEmits(['change']);

watch(sliderValue, (newValue: number) => {
  if (props.liveUpdate !== false) {
    emit('change', newValue);
  }
});

const onChange = () => {
  // This fires when the slider input changes (including drag end)
  if (props.liveUpdate === false) {
    emit('change', sliderValue.value);
  }
};

const onMouseUp = () => {
  // This fires when mouse/touch is released
  if (props.liveUpdate === false) {
    emit('change', sliderValue.value);
  }
};

const setValue = (newValue: number, emitChange: boolean = true) => {
  newValue = decimalClamp(
    newValue,
    props.minValue,
    props.maxValue,
    props.decimals ?? 0,
  );
  sliderValue.value = newValue;
  if (emitChange) {
    emit('change', sliderValue.value);
  }
};
const slideLeft = () => {
  setValue(sliderValue.value - props.step, true);
};

const slideRight = () => {
  setValue(sliderValue.value + props.step, true);
};

const takeControl = () => {
  interactingInputListener = useInputs().registerInputListener(
    'slider-widget-interaction',
    {
      decreaseSetting: {
        press: slideLeft,
      },
      increaseSetting: {
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

const startFocusedInputListener = () => {
  if (props.inputListener) {
    focusedInputListener = useInputs().registerInputListener(
      'slider-widget-focused',
      {
        decreaseSetting: {
          press: slideLeft,
        },
        increaseSetting: {
          press: slideRight,
        },
        sliderControl: {
          press: takeControl,
        },
      },
      true,
    );
  }
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
  releaseControl();
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
  // Unregister the focused input listener when the component is destroyed
  stopFocusedInputListener();
  releaseControl();
});
</script>

<style scoped>
.slider-widget-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slider-widget {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.slider-button {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.slider-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.slider-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.number-slider {
  width: 150px;
}

.slider-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}
.slider-value {
  font-size: var(--font-base);
}
</style>
