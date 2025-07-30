<template>
  <component :is="tag" class="nrt-text" :class="className" v-if="tag">
    {{ $t(value, options) }}
  </component>
  <div v-else-if="block" class="nrt-text text-block" :class="className">
    {{ $t(value, options) }}
  </div>
  <span v-else class="nrt-text text-span" :class="className">
    {{ $t(value, options) }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string;
  tag?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  options?: Record<string, any>;
  block?: boolean;
  className?: string;
}>();
</script>
