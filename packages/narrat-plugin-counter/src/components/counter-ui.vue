<template>
  <ModalWindow
    class="quests"
    @close="$emit('close')"
    containerCssClass="quests-modal"
  >
    <template v-slot:header>
      <h3 class="title">Counter UI</h3>
    </template>
    <template v-slot:body>
      <h1>Counter value: {{ counter }}</h1>
    </template>
  </ModalWindow>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ModalWindow } from 'narrat';
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
  components: {
    ModalWindow,
  },
});
</script>

<style>
/* Write CSS for this vue component */
</style>
