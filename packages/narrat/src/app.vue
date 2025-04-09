<template>
  <div id="narrat">
    <div id="narrat-app-container" :style="appStyle">
      <div id="narrat-app" :class="appClass" tabindex="0">
        <Transition name="screens-fade">
          <GameScene
            :key="activeScene"
            :sceneId="activeScene"
            :options="scenesStore.currentOptions"
          />
        </Transition>

        <DebugMenu v-if="options!.debug && ready" />
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
    <InputsLegend :extraInputs="[`movement`]" />
    <div id="modals"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import DebugMenu from './components/debug/debug-menu.vue';
import NotificationToast from './components/notification-toast.vue';
import { debounce } from './utils/debounce';
import { vm } from './vm/vm';
import { useMain } from './stores/main-store';
import { useRenderingStore } from './stores/rendering-store';
import { inputEvents } from './utils/InputsListener';
import AlertModal from './components/utils/alert-modal.vue';
import { AppOptions } from './types/app-types';
import { useMenu } from './stores/menu-store';
import TooltipsUi from './components/tooltips/tooltips-ui.vue';
import { preloadAndSetupGame } from '@/application/application-start';
import { useScenes } from './stores/scenes-store';
import GameScene from './components/GameScene.vue';
import '@/data/all-stores';
import InputsLegend from './components/input-prompt/inputs-legend.vue';

const props = defineProps<{
  options: AppOptions;
}>();

const mainStore = useMain();
const scenesStore = useScenes();
const activeScene = computed(() => scenesStore.activeScene);
const alerts = computed(() => mainStore.alerts);
const rendering = useRenderingStore();
const ready = ref(false);

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
function updateScreenSize() {
  useRenderingStore().refreshScreenSize();
}

onMounted(async () => {
  vm.callHook('onAppMounted');
  await preloadAndSetupGame();
  rendering.inputsContainer.addEventListener(
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
  ready.value = true;
  setTimeout(() => {
    updateScreenSize();
  }, 50);
});
</script>

<style>
#narrat {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
}
#narrat-app-container {
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

#narrat-app {
  z-index: 2;
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
