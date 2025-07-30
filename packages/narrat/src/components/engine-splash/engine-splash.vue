<template>
  <div id="engine-splash-screen" class="flex justify-center items-center">
    <div
      id="engine-splash-header"
      class="flex justify-center flex-col items-center"
      :style="loadingStyle"
      :class="loadingClass"
    >
      <h1 id="engine-splash-title">{{ $t(splashTitle) }}</h1>
      <img :src="spinningLogo" alt="Narrat Logo" id="engine-splash-logo" />
      <LoadingBar
        :percentage="main.loading.percentage"
        :step="$t(main.loading.step)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { getCommonConfig } from '@/config';
import { useMain } from '@/stores/main-store';
import { timeout } from '@/utils/promises';
import { computed, onMounted, ref } from 'vue';
import LoadingBar from '../loading-bar.vue';
import logo from './logo.svg';

const emit = defineEmits(['finished']);
const step = ref('hidden');
const loadingStyle = computed(() => {
  return {
    transitionDuration: `${fadeDuration.value}s`,
  };
});
const loadingClass = computed(() => {
  return {
    invisible: step.value !== 'appear',
  };
});
const main = useMain();
const splashConfig = computed(
  () => getCommonConfig().splashScreens?.engineSplashScreen ?? {},
);
const splashTitle = computed(() =>
  typeof splashConfig.value.overrideText === 'string'
    ? splashConfig.value.overrideText
    : 'narrat.engine.splash_text',
);
const spinningLogo = computed(() => splashConfig.value.overrideLogo ?? logo);
const fadeDuration = computed(() =>
  typeof splashConfig.value.fadeDuration === 'number'
    ? splashConfig.value.fadeDuration
    : 0.8,
);
const timeBeforeFadeout = computed(() =>
  typeof splashConfig.value.timeBeforeFadeout === 'number'
    ? splashConfig.value.timeBeforeFadeout
    : 1.5,
);

onMounted(async () => {
  await timeout(10);
  step.value = 'appear';
  if (splashConfig.value.skip || main.options.debug) {
    finish();
    return;
  }
  await timeout(fadeDuration.value * 1000);
  await timeout(timeBeforeFadeout.value * 1000);
  step.value = 'disappear';
  await timeout(fadeDuration.value * 1000);
  finish();
});

function finish() {
  if (main.loading.loaded) {
    emit('finished');
  } else {
    main.listener.once('gameLoaded', () => {
      emit('finished');
    });
  }
}
</script>
<style>
@keyframes animate-logo {
  /* Make an animation rotating the logo in 3d */
  0% {
    transform: perspective(10000px) rotateY(0deg) rotateX(0deg) scale(0.8, 0.8);
  }
  50% {
    transform: perspective(10000px) rotateY(180deg) rotateX(-10deg) scale(1, 1);
  }

  100% {
    transform: perspective(10000px) rotateY(360deg) rotateX(0deg)
      scale(0.8, 0.8);
  }
}

#engine-splash-header {
  position: absolute;
  width: 50%;
  perspective: 300px;
  transition-property: opacity;
}
#engine-splash-header.invisible {
  opacity: 0;
}

#engine-splash-screen {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
}

#engine-splash-logo {
  width: 300px;
  height: 300px;
  margin: 50px;
  transform-style: preserve-3d;
  animation: animate-logo infinite 10s;
  animation-timing-function: linear;
  /* animation-direction: alternate; */
}
</style>
