<template>
  <div
    class="setting-item"
    :class="{ 'setting-focused': focused }"
    @click="$emit('click')"
  >
    <div class="setting-info">
      <label
        :for="settingId"
        class="nrt-label setting-label"
        :id="`setting-label-${settingId}`"
      >
        {{ $t(schema.name) }}
      </label>
      <p class="setting-description">
        {{ $t(schema.description ?? '') }}
      </p>
    </div>
    <div class="setting-widget">
      <SliderWidget
        v-if="presentation === 'slider'"
        :inputListener="inputListener"
        :name="settingId"
        :minValue="(schema as any).minValue"
        :maxValue="(schema as any).maxValue"
        :step="(schema as any).step"
        :value="settingValue"
        :decimals="(schema as any).decimals"
        :focused="focused || false"
        :liveUpdate="schema.liveUpdate"
        @change="changeValue"
      />
      <CheckboxWidget
        v-else-if="presentation === 'checkbox'"
        :name="settingId"
        :modelValue="settingValue"
        :focused="focused || false"
        @update:modelValue="settingValue = $event"
      />
      <TextWidget
        v-else-if="presentation === 'text'"
        :name="settingId"
        :modelValue="settingValue"
        @update:modelValue="settingValue = $event"
      />
      <DropdownWidget
        v-else-if="presentation === 'dropdown'"
        :name="settingId"
        :options="choiceOptions"
        :focused="focused || false"
        :modelValue="settingValue"
        @update:modelValue="settingValue = $event"
      />
      <CycleWidget
        v-else-if="presentation === 'cycle'"
        :name="settingId"
        :options="choiceOptions"
        :focused="focused || false"
        :modelValue="settingValue"
        @update:modelValue="settingValue = $event"
      />
      <div class="setting-preview" v-if="showPreview">
        {{ $t(settingValue) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useSettings } from '@/stores/settings-store';
import {
  isSettingNumber,
  isSettingBoolean,
  isSettingInteger,
  isSettingString,
  isSettingChoice,
  getSettingPresentation,
  type CustomSettingsChoice,
} from '@/config/settings-config';
import SliderWidget from './slider-widget.vue';
import CheckboxWidget from './widgets/checkbox-widget.vue';
import TextWidget from './widgets/text-widget.vue';
import DropdownWidget from './widgets/dropdown-widget.vue';
import CycleWidget from './widgets/cycle-widget.vue';
import { InputListener } from '@/stores/inputs-store';

export interface SettingWidgetProps {
  settingId: string;
  inputListener: InputListener | null;
  focused?: boolean;
}
const props = defineProps<SettingWidgetProps>();
const emit = defineEmits(['click']);

const settings = useSettings();
const startValue = computed(() => {
  return settings.getSetting(props.settingId);
});
const settingValue = ref(startValue.value);
const schema = computed(() => {
  return settings.getSettingSchema(props.settingId)!;
});

const presentation = computed(() => {
  return getSettingPresentation(schema.value);
});

const choiceOptions = computed(() => {
  if (isSettingChoice(schema.value)) {
    return (schema.value as CustomSettingsChoice).choices;
  }
  return [];
});

const showPreview = computed(() => {
  return false;
});

const changeValue = (newValue: number) => {
  settingValue.value = newValue;
};

function valueChanged(newValue: any) {
  settings.setSetting(props.settingId, newValue);
}

watch(settingValue, (newValue: any) => {
  valueChanged(newValue);
});

watch(startValue, (newValue: any) => {
  settingValue.value = newValue;
});
</script>
<style>
.setting-item {
  width: 100%;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.setting-item:hover {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.setting-item.setting-focused {
  background: linear-gradient(
    90deg,
    rgba(74, 144, 226, 0.3) 0%,
    rgba(74, 144, 226, 0.1) 100%
  );
  border: 2px solid rgba(74, 144, 226, 0.6);
}

.setting-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 0.5rem;
}

.setting-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
}

.setting-label {
  font-weight: 600;
  margin: 0;
}

.setting-description {
  margin: 0;
  font-size: var(--font-sm);
  opacity: 0.8;
  line-height: 1.4;
}

.setting-widget {
  flex-shrink: 0;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.setting-preview {
  font-size: var(--font-sm);
  opacity: 0.7;
  text-align: center;
}

.setting-separator {
  background-color: var(--separator-bg-color);
  width: var(--separator-width);
  height: var(--separator-height);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
