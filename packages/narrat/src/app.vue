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
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import DebugMenu from './components/debug/debug-menu.vue';
import NotificationToast from './components/notification-toast.vue';
import { debounce } from './utils/debounce';
import { vm } from './vm/vm';
import { useDialogStore } from './stores/dialog-store';
import { useVM } from './stores/vm-store';
import { useMain } from './stores/main-store';
import { useRenderingStore } from './stores/rendering-store';
import { mapState } from 'pinia';
import StartMenu from './components/StartMenu.vue';
import { inputEvents } from './utils/InputsListener';
import AlertModal from './components/utils/alert-modal.vue';
import InGame from './components/in-game.vue';
import EngineSplash from './components/engine-splash/engine-splash.vue';
import GameSplash from './components/game-splash/game-splash.vue';
import { AppOptions } from './types/app-types';

export default defineComponent({
  setup() {
    const dialogStore = useDialogStore();
    const vmStore = useVM();
    const mainStore = useMain();
    return {
      dialog: computed(() => dialogStore.dialog),
      stack: computed(() => vmStore.stack),
      modal: computed(() => mainStore.modal),
      flowState: computed(() => mainStore.flowState),
      alerts: computed(() => mainStore.alerts),
    };
  },
  $refs: {
    dialogContainer: HTMLInputElement,
  },
  inject: ['mq'],
  components: {
    DebugMenu,
    NotificationToast,
    StartMenu,
    AlertModal,
    InGame,
    EngineSplash,
    GameSplash,
  },

  data() {
    return {
      lineTitle: 'title',
      lineText: 'hello',
    };
  },
  props: {
    options: Object as PropType<AppOptions>,
  },
  async mounted() {
    vm.callHook('onAppMounted');
    await useMain().engineLoading();
    window.addEventListener(
      'resize',
      debounce(
        () => {
          this.updateScreenSize();
        },
        100,
        {
          maxWait: 200,
        },
      ),
    );
    inputEvents.setup(this.options!.debug);
    // this.updateScreenSize();
    setTimeout(() => {
      this.updateScreenSize();
    }, 50);
  },

  computed: {
    ...mapState(useRenderingStore, [
      'screenWidth',
      'screenHeight',
      'layoutMode',
      'gameWidth',
      'gameHeight',
      'gameScaleRatio',
      'actualGameHeight',
    ]),
    ...mapState(useVM, ['currentLine']),
    appStyle(): any {
      return {
        transform: `scale(${this.gameScaleRatio}, ${this.gameScaleRatio})`,
        width: `${this.gameWidth}px`,
        height: `${this.actualGameHeight}px`,
      };
    },
    appClass(): any {
      if (useMain().modal) {
        return 'app-blurred-by-modal';
      }
      return {};
    },
  },

  methods: {
    closeAlert(id: string) {
      useMain().closeAlert(id);
    },
    engineSplashDone() {
      useMain().flowState = 'game-splash';
    },
    updateScreenSize() {
      useRenderingStore().updateScreenSize(
        window.innerWidth,
        window.innerHeight,
      );
    },
  },
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
