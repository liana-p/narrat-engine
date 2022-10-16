<template>
  <h1>Counter value: {{ counter }}</h1>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useCounter } from '../custom-stores/counter-store';

export default defineComponent({
  setup() {
    console.log('counter ui');
    const counterStore = useCounter();
    const counter = computed(() => {
      return counterStore.count;
    });
    return { counter };
  },
});
</script>

<style>
/* Write CSS for this vue component */
</style>
