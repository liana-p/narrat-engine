<template>
  <transition name="fade">
    <div class="modal-mask" @click="close">
      <div
        class="modal-container bg-gray-800 nrt-card-4"
        :class="containerCssClass"
        @click="(e) => e.stopPropagation()"
      >
        <div class="modal-header">
          <button class="close-button" @click="close" v-if="!cantClose">
            X
          </button>
          <slot name="header"> default header </slot>
        </div>

        <div class="modal-body">
          <slot name="body"> default body </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    containerCssClass: [String, Object],
    cantClose: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      if (!this.cantClose) {
        this.$emit('close');
      }
    },
  },
});
</script>

<style>
.modal-mask {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* filter: blur(5px); */
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  flex-shrink: 2 2;
  align-items: center;
  justify-content: center;
}

.modal-container {
  min-width: 300px;
  max-width: 90vw;
  max-height: 100%;
  overflow-y: hidden;
  margin: 10px auto;
  padding: 20px 30px;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  background: var(--modal-background);
  display: flex;
  flex-direction: column;
}

.modal-header {
  position: relative;
}
.modal-header h3 {
  flex-shrink: 0;
  margin-top: 0;
  color: var(--secondary);
}

.modal-body {
  overflow-y: hidden;
  flex-shrink: 2;
  min-height: 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.close-button {
  border: 1px solid var(--text-color);
  border-radius: 50px;
  font-size: 1.8rem;
  font-weight: 700;
  position: absolute;
  right: -20px;
  top: -10px;
  width: 50px;
  height: 50px;
}

.close-button:hover {
  background-color: var(--focus);
}
</style>
