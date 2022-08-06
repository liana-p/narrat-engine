<template>
  <modal
    class="menu"
    @close="$emit('close')"
    containerCssClass="main-menu-modal"
  >
    <template v-slot:header>
      <h3 class="title">Menu</h3>
    </template>
    <template v-slot:body>
      <div class="menu-content">
        <h3>Play time: {{ getPlayTimeString() }}</h3>

        <VolumeControls />
        <button class="button title quit-button" @click="mainMenu">
          Main Menu
        </button>
        <button class="button title quit-button" @click="quit">Exit</button>
      </div>
    </template>
  </modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Modal from './utils/modal-window.vue';
import VolumeControls from './volume-controls.vue';
import { getPlayTime, toHHMMSS } from '@/utils/time-helpers';
import { useMain } from '@/stores/main-store';

export default defineComponent({
  components: {
    Modal,
    VolumeControls,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    quit() {
      window.close();
      // quit
    },
    mainMenu() {
      useMain().menuReturn();
      this.closeMenu();
    },
    closeMenu() {
      this.$emit('close');
    },
    getPlayTimeString(): string {
      const time = getPlayTime(
        useMain().playTime.start,
        useMain().playTime.previousPlaytime,
      );
      return toHHMMSS(time / 1000);
    },
  },
});
</script>

<style>
.quit-button {
  margin: 20px;
  text-align: center;
}

.main-menu-modal {
  width: 60%;
}
</style>
