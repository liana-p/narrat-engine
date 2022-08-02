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
import ModalWindow from './modal-window.vue';

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
</script>
<style>
.save-modal {
  width: 70%;
}
.saves-container {
  padding: 20px;
}
</style>
