import { ref, onMounted, onUnmounted, Ref, computed } from 'vue';
import { InputListener, useInputs } from '@/stores/inputs-store';

export interface ScrollingOptions {
  container: Ref<HTMLElement | null>;
  scrollSpeed?: number;
  scrollThreshold?: number;
  smooth?: boolean;
  onlyVertical?: boolean;
  gamepadAxes?: {
    vertical: number;
    horizontal?: number;
  };
  inputListener?: InputListener | null;
}

export function useScrolling(options: ScrollingOptions) {
  const {
    container,
    scrollSpeed = 10,
    scrollThreshold = 0.1,
    smooth = true,
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

    // Check if scrollBy is available, otherwise use scrollTop/scrollLeft
    if (typeof container.value.scrollBy === 'function') {
      const scrollOptions: ScrollToOptions = {
        top:
          direction === 'up'
            ? -scrollAmount
            : direction === 'down'
              ? scrollAmount
              : 0,
        left:
          direction === 'left'
            ? -scrollAmount
            : direction === 'right'
              ? scrollAmount
              : 0,
        behavior: smooth ? 'smooth' : 'auto',
      };

      container.value.scrollBy(scrollOptions);
    } else {
      // Fallback to direct property manipulation
      if (direction === 'up') {
        container.value.scrollTop -= scrollAmount;
      } else if (direction === 'down') {
        container.value.scrollTop += scrollAmount;
      } else if (direction === 'left') {
        container.value.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        container.value.scrollLeft += scrollAmount;
      }
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
