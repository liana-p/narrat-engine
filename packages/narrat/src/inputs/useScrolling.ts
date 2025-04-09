import { ref, onMounted, onUnmounted, computed, Ref } from 'vue';
import { InputListener } from '@/stores/inputs-store';
import { GamepadKey } from './input-key-types';

export interface ScrollingOptions {
  container: Ref<HTMLElement | null>;
  scrollSpeed?: number;
  scrollThreshold?: number;
  onlyVertical?: boolean;
  gamepadAxes?: {
    vertical: number;
    horizontal?: number;
  };
  inputListener?: InputListener;
}

export function useScrolling(options: ScrollingOptions) {
  const {
    container,
    scrollSpeed = 10,
    scrollThreshold = 0.2,
    onlyVertical = true,
    gamepadAxes = {
      vertical: 3, // Right stick vertical axis
      horizontal: 2, // Right stick horizontal axis
    },
    inputListener,
  } = options;

  const isScrolling = ref(false);
  let scrollInterval: number | null = null;

  function scrollContainer(direction: 'up' | 'down' | 'left' | 'right') {
    if (!container.value) return;

    const scrollAmount = scrollSpeed;
    switch (direction) {
      case 'up':
        container.value.scrollTop -= scrollAmount;
        break;
      case 'down':
        container.value.scrollTop += scrollAmount;
        break;
      case 'left':
        container.value.scrollLeft -= scrollAmount;
        break;
      case 'right':
        container.value.scrollLeft += scrollAmount;
        break;
    }
  }

  function handleContinuousScroll() {
    if (!container.value) return;

    const gamepad = navigator.getGamepads()[0];
    if (!gamepad) return;

    // Check right stick for continuous scrolling
    const verticalAxis = gamepad.axes[gamepadAxes.vertical];
    if (Math.abs(verticalAxis) > scrollThreshold) {
      scrollContainer(verticalAxis < 0 ? 'up' : 'down');
      isScrolling.value = true;
    } else {
      isScrolling.value = false;
    }

    // Check horizontal axis if not only vertical
    if (!onlyVertical && gamepadAxes.horizontal !== undefined) {
      const horizontalAxis = gamepad.axes[gamepadAxes.horizontal];
      if (Math.abs(horizontalAxis) > scrollThreshold) {
        scrollContainer(horizontalAxis < 0 ? 'left' : 'right');
        isScrolling.value = true;
      }
    }
  }

  function startContinuousScroll() {
    if (scrollInterval) return;
    scrollInterval = window.setInterval(handleContinuousScroll, 16); // ~60fps
  }

  function stopContinuousScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
    isScrolling.value = false;
  }

  // Register scroll action with input listener if provided
  onMounted(() => {
    startContinuousScroll();

    if (inputListener) {
      // eslint-disable-next-line vue/no-mutating-props
      inputListener.actions.scroll = {
        press: () => {},
        active: computed(() => true),
      };
    }
  });

  // Clean up interval and remove scroll action when unmounted
  onUnmounted(() => {
    stopContinuousScroll();

    if (inputListener) {
      // eslint-disable-next-line vue/no-mutating-props
      delete inputListener.actions.scroll;
    }
  });

  return {
    isScrolling,
    scrollContainer,
    container: ref(container),
  };
}

export type ScrollingState = ReturnType<typeof useScrolling>;
