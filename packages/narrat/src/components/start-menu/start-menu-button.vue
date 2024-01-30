<template>
  <button
    class="nrt-button menu-button main-menu-button large override"
    :class="button.cssClass"
    @click="$emit('click')"
  >
    {{ button.title }}
  </button>
</template>
<script lang="ts" setup>
import { StartMenuButtonProps } from './start-menu-types';
defineProps<{
  button: StartMenuButtonProps;
}>();
defineEmits(['click']);
</script>
