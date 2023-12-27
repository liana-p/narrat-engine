<template>
  <div
    id="game-splash-screen"
    style="height: 100%; padding: 20px"
    class="flex justify-center items-center"
  >
    <div
      id="game-splash-screen-header flex justify-center flex-col items-center"
      class="flex justify-center flex-col items-center"
    >
      <h1 class="title" id="game-splash-title">{{ gameTitle }}</h1>
      <button
        v-if="gameLoaded"
        class="button menu-button main-menu-button large splash-start-button override"
        @click="goToStartMenu"
      >
        {{ startButtonText }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMain } from '@/stores/main-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { getCommonConfig } from '../../config';
import { InputListener, useInputs } from '@/stores/inputs-store';
import { useScenes } from '@/stores/scenes-store';
const inputListener = ref<InputListener | null>(null);

const main = useMain();
const splashConfig = computed(
  () => getCommonConfig().splashScreens?.gameSplashScreen ?? {},
);
const startButtonText = computed(() =>
  typeof splashConfig.value.startButtonText === 'string'
    ? splashConfig.value.startButtonText
    : 'Press to start',
);
const gameLoaded = computed(() => main.loading.loaded);
const gameTitle = computed(() => getCommonConfig().gameTitle || 'Narrat Game');

function goToStartMenu() {
  useScenes().changeScene('start-menu');
}
onMounted(() => {
  inputListener.value = useInputs().registerInputListener('game-splash', {
    continue: {
      press: () => {
        goToStartMenu();
      },
    },
    system: {
      press: () => {
        goToStartMenu();
      },
    },
  });
  if (main.options.debug) {
    goToStartMenu();
  }
});
onUnmounted(() => {
  if (inputListener.value) {
    useInputs().unregisterInputListener(inputListener.value);
  }
});
</script>
<style>
.game-splash-screen-header {
}

#game-splash-title {
  font-size: 4.3rem;
  text-align: center;
  margin-bottom: 40px;
}

#game-splash-screen {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
}

.splash-start-button {
  padding: 10px 20px;
  font-size: 2rem;
}
</style>
