<template>
  <ModalWindow @close="() => chosen(false)" containerCssClass="yes-no-modal">
    <template v-slot:header>
      <h3 class="title">Confirmation</h3>
    </template>
    <template v-slot:body>
      <h3>{{ prompt }}</h3>
      <div class="flex justify-center" ref="buttonsContainer">
        <button class="nrt-button" @click="() => chosen(true)">Yes</button>
        <button class="nrt-button" @click="() => chosen(false)">No</button>
      </div>
    </template>
  </ModalWindow>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import ModalWindow from './modal-window.vue';
import { InputListener, useInputs } from '@/stores/inputs-store';
import { useNavigation } from '@/inputs/useNavigation';

const listener = ref<InputListener | null>(
  useInputs().registerInputListener('yes-no', {
    cancel: {
      press: () => {
        chosen(false);
      },
    },
    continue: {
      press: () => {
        chosen(true);
      },
    },
  }),
);
const buttonsContainer = ref<HTMLDivElement | null>(null);
useNavigation({
  mode: 'list',
  container: buttonsContainer,
  listener: listener.value,
  onChosen: (index) => {
    chosen(index === 0);
  },
});

const props = defineProps({
  prompt: {
    type: String,
    required: true,
  },
  onConfirm: {
    type: Function,
    required: false,
  },
  onRefuse: {
    type: Function,
    required: false,
  },
});
const emit = defineEmits(['choice']);

function chosen(choice: boolean) {
  if (choice === true && props.onConfirm) {
    props.onConfirm();
  } else if (choice === false && props.onRefuse) {
    props.onRefuse();
  }
  emit('choice', choice);
}
onMounted(() => {});
onUnmounted(() => {
  if (listener.value) {
    useInputs().unregisterInputListener(listener.value);
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
