<template>
  <div id="app-container" :style="appStyle">
    <div id="app" :class="appClass">
      <EngineSplash
        v-if="flowState === 'engine-splash'"
        @finished="engineSplashDone"
      />
      <Transition name="screens-fade" v-else>
        <GameSplash key="1" v-if="flowState === 'game-splash'" />
        <StartMenu key="2" v-else-if="flowState === 'menu'" />
        <InGame key="3" v-else-if="flowState === 'playing'" />
      </Transition>

      <DebugMenu v-if="options!.debug" />
      <NotificationToast />
      <AlertModal
        v-for="alert in alerts"
        :key="alert.id"
        :title="alert.title"
        :text="alert.text"
        @close="() => closeAlert(alert.id)"
      />
    </div>
  </div>
  <TooltipsUi />
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import DebugMenu from './components/debug/debug-menu.vue';
import NotificationToast from './components/notification-toast.vue';
import { debounce } from './utils/debounce';
import { vm } from './vm/vm';
import { useMain } from './stores/main-store';
import { useRenderingStore } from './stores/rendering-store';
import StartMenu from './components/StartMenu.vue';
import { inputEvents } from './utils/InputsListener';
import AlertModal from './components/utils/alert-modal.vue';
import InGame from './components/in-game.vue';
import EngineSplash from './components/engine-splash/engine-splash.vue';
import GameSplash from './components/game-splash/game-splash.vue';
import { AppOptions } from './types/app-types';
import { useMenu } from './stores/menu-store';
import TooltipsUi from './components/tooltips/tooltips-ui.vue';

const props = defineProps<{
  options: AppOptions;
}>();

const mainStore = useMain();
const flowState = computed(() => mainStore.flowState);
const alerts = computed(() => mainStore.alerts);
const rendering = useRenderingStore();

const appStyle = computed(() => {
  return {
    transform: `scale(${rendering.gameScaleRatio}, ${rendering.gameScaleRatio})`,
    width: `${rendering.gameWidth}px`,
    height: `${rendering.actualGameHeight}px`,
  };
});

const appClass = computed(() => {
  if (useMenu().activeMenu) {
    return 'app-blurred-by-modal';
  }
  return {};
});

function closeAlert(id: string) {
  useMain().closeAlert(id);
}
function engineSplashDone() {
  useMain().flowState = 'game-splash';
}
function updateScreenSize() {
  useRenderingStore().updateScreenSize(window.innerWidth, window.innerHeight);
}

onMounted(async () => {
  vm.callHook('onAppMounted');
  await useMain().engineLoading();
  window.addEventListener(
    'resize',
    debounce(
      () => {
        updateScreenSize();
      },
      100,
      {
        maxWait: 200,
      },
    ),
  );
  inputEvents.setup(props.options!.debug);
  // this.updateScreenSize();
  setTimeout(() => {
    updateScreenSize();
  }, 50);
});
</script>

<style>
#app-container {
  background-color: var(--bg-color);
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  box-sizing: border-box;
  overflow: hidden;
  transform-origin: center center;
}

#app {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  box-sizing: border-box;
  overflow: hidden;
  transform-origin: center center;
}

.app-blurred-by-modal {
  filter: blur(5px);
}
</style>
