<template>
  <input
    type="checkbox"
    class="setting-checkbox"
    :id="`setting-checkbox-${name}`"
    :name="name"
    :checked="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
  />
</template>

<script setup lang="ts">
export interface CheckboxWidgetProps {
  name: string;
  modelValue: boolean;
}

defineProps<CheckboxWidgetProps>();
defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<style scoped>
.setting-checkbox {
  width: 1.5rem;
  height: 1.5rem;
}
</style>