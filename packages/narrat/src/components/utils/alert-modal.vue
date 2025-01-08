<template>
  <ModalWindow @close="close" containerCssClass="yes-no-modal">
    <template v-slot:header>
      <h3 class="title">{{ title ?? 'Alert' }}</h3>
    </template>
    <template v-slot:body>
      <h3>{{ text }}</h3>
    </template>
  </ModalWindow>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import ModalWindow from './modal-window.vue';
import { InputListener, useInputs } from '@/stores/inputs-store';

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

const emit = defineEmits(['close']);

function close() {
  emit('close');
}

const inputListener = ref<InputListener | null>(
  useInputs().registerInputListener('yes-no', {
    cancel: {
      press: () => {
        close();
      },
    },
    confirm: {
      press: () => {
        close();
      },
    },
    system: {
      press: () => {
        close();
      },
    },
  }),
);

onUnmounted(() => {
  if (inputListener.value) {
    useInputs().unregisterInputListener(inputListener.value);
  }
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
