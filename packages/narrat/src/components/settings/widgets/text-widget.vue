<template>
  <input
    type="text"
    class="setting-text"
    :id="`setting-text-${name}`"
    :name="name"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
export interface TextWidgetProps {
  name: string;
  modelValue: string;
}

defineProps<TextWidgetProps>();
defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<style scoped>
.setting-text {
  padding: 0.5rem;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  background: var(--input-background);
  color: var(--input-text);
  min-width: 200px;
}

.setting-text:focus {
  outline: none;
  border-color: var(--input-focus-border);
}
</style>