<template>
  <ModalWindow @close="() => chosen(false)" containerCssClass="yes-no-modal">
    <template v-slot:header>
      <h3 class="title">Confirmation</h3>
    </template>
    <template v-slot:body>
      <h3>{{ prompt }}</h3>
      <div class="flex justify-center">
        <button class="button" @click="() => chosen(true)">Yes</button>
        <button class="button" @click="() => chosen(false)">No</button>
      </div>
    </template>
  </ModalWindow>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import ModalWindow from './modal-window.vue';
import { InputListener, useInputs } from '@/stores/inputs-store';

const listener = ref<InputListener | null>(null);

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

onMounted(() => {
  listener.value = useInputs().registerInputListener({
    cancel: {
      press: () => {
        chosen(false);
      },
    },
    confirm: {
      press: () => {
        chosen(true);
      },
    },
  });
});
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
