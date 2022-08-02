<template>
  <div id="app" :style="appStyle">
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import DebugMenu from './components/debug/debug-menu.vue';
import NotificationToast from './components/notification-toast.vue';
import { aspectRatioFit } from './utils/helpers';
import { debounce } from './utils/debounce';
import { getConfig } from './config';
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
      'canvasWidth',
      'canvasHeight',
      'topOffset',
      'leftOffset',
      'layoutMode',
    ]),
    ...mapState(useVM, ['currentLine']),
    backgroundStyle(): any {
      let height: any;
      if (this.layoutMode === 'vertical') {
        height = `${100 - getConfig().layout.mobileDialogHeightPercentage}%`;
      }
      return {
        // width: `${this.backgroundSize.width}px`,
        // height: `${this.backgroundSize.height}px`,
        // top: `${this.backgroundSize.top}px`,
        // left: `${this.backgroundSize.left}px`,
        backgroundColor: 'red',
        height,
        // position: 'absolute',
      };
    },
    layoutWidth(): number {
      return getConfig().layout.backgrounds.width;
    },
    layoutHeight(): number {
      return getConfig().layout.backgrounds.height;
    },
    backgroundSize(): {
      width: number;
      height: number;
      left: number;
      top: number;
    } {
      return {
        width: this.canvasWidth,
        height: this.canvasHeight,
        top: this.topOffset,
        left: this.leftOffset,
      };
    },
    gameWidth(): number {
      const config = getConfig();
      if (this.layoutMode === 'vertical') {
        return window.innerWidth;
      } else {
        return config.layout.backgrounds.width + config.layout.minTextWidth;
      }
    },
    gameHeight(): number {
      const config = getConfig();
      if (this.layoutMode === 'vertical') {
        return window.innerHeight;
      } else {
        return config.layout.backgrounds.height;
      }
    },
    appStyle(): any {
      const config = getConfig();
      if (
        this.screenWidth &&
        this.screenHeight &&
        config &&
        this.layoutMode === 'horizontal'
      ) {
        const ratio = aspectRatioFit(
          this.screenWidth,
          this.screenHeight,
          this.gameWidth,
          this.gameHeight,
        );
        return {
          transform: `scale(${ratio}, ${ratio})`,
          width: `${this.gameWidth}px`,
          height: `${this.gameHeight}px`,
        };
      }
      return {};
    },
    gameStyle(): any {
      let direction = 'row';
      if (this.layoutMode === 'vertical') {
        direction = 'column';
      }
      return {
        flexDirection: direction,
      };
    },
    screenRatio(): number {
      const config = getConfig();
      const baseWidth =
        config.layout.minTextWidth + config.layout.backgrounds.width;
      const widthRatio = this.screenWidth / baseWidth;
      return widthRatio;
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
        this.layoutMode === 'horizontal'
          ? getConfig().layout.minTextWidth * this.screenRatio
          : 0,
      );
    },
  },
});
</script>

<style>
#app {
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

.interact-button {
  height: 50px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  flex-grow: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.interact-button:not(:last-child) {
  margin-right: 10px;
}
</style>
