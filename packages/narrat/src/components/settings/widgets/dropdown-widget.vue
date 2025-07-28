<template>
  <select
    class="nrt-select setting-dropdown"
    :id="`setting-dropdown-${name}`"
    :name="name"
    :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
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

export interface DropdownWidgetProps {
  name: string;
  modelValue: string | number;
  options: ChoiceOption[];
}

defineProps<DropdownWidgetProps>();
defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>

<style scoped>
.setting-dropdown {
  min-width: 150px;
}
</style>