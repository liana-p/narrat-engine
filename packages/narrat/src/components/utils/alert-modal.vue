<template>
  <ModalWindow @close="$emit('close')" containerCssClass="yes-no-modal">
    <template v-slot:header>
      <h3 class="title">{{ title ?? 'Alert' }}</h3>
    </template>
    <template v-slot:body>
      <h3>{{ text }}</h3>
    </template>
  </ModalWindow>
</template>

<script setup lang="ts">
import ModalWindow from './modal-window.vue';

defineProps({
  title: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
});
</script>
<style>
.save-modal {
  width: 70%;
}
.saves-container {
  padding: 20px;
}
</style>
