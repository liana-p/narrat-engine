import { InputListener } from '@/stores/inputs-store';
import { computed, ref, onMounted, onUnmounted, Ref } from 'vue';

export type GridNavigationOptions = {
  mode: 'grid';
  columns: number;
};
export type ListNavigationOptions = {
  mode: 'list';
};
export type NavigationOptions = {
  mode: 'grid' | 'list';
  container: Ref<HTMLElement | null>;
  listener?: InputListener | null;
  loopForbidden?: boolean;
  onSelected?: (index: number) => void;
} & (GridNavigationOptions | ListNavigationOptions);

export function useNavigation(options: NavigationOptions) {
  if (!options.listener) {
    console.warn('No input listener provided for navigation');
    return;
  }
  const selectedIndex = ref(0);
  const selectedElement = computed(() =>
    getElementAtIndex(selectedIndex.value),
  );
  const currentColumn = computed(() =>
    options.mode === 'grid'
      ? selectedIndex.value % (options as GridNavigationOptions).columns
      : 0,
  );
  function isValid(index: number): boolean {
    if (options.container.value) {
      return index >= 0 && index < options.container.value.children.length;
    }
    return false;
  }

  function select(index: number) {
    const previousIndex = selectedIndex.value;
    if (isValid(index)) {
      selectedIndex.value = index;
      if (selectedElement.value) {
        selectedElement.value.classList.add('selected');
        getElementAtIndex(previousIndex)!.classList.remove('selected');
      }
    }
  }

  function getElementAtIndex(index: number) {
    if (options.container.value) {
      return options.container.value.children[index];
    }
    return null;
  }

  function selectPrevious() {
    if (!options.container.value) {
      return;
    }
    if (selectedIndex.value === 0) {
      if (!options.loopForbidden) {
        select(options.container.value!.children.length - 1);
      }
    } else {
      select(selectedIndex.value - 1);
    }
  }
  function selectNext() {
    if (!options.container.value) {
      return;
    }
    if (selectedIndex.value === options.container.value.children.length - 1) {
      if (!options.loopForbidden) {
        select(0);
      }
    } else {
      select(selectedIndex.value + 1);
    }
  }
  function selectUp() {
    if (!options.container.value) {
      return;
    }
    const opts = options as GridNavigationOptions;
    const index = selectedIndex.value;
    if (!options.loopForbidden && index < opts.columns) {
      select(options.container.value!.children.length - 1);
    } else {
      select(selectedIndex.value - (options as GridNavigationOptions).columns);
    }
  }
  function selectDown() {
    if (!options.container.value) {
      return;
    }
    const opts = options as GridNavigationOptions;
    const index = selectedIndex.value;
    if (
      !options.loopForbidden &&
      index >= options.container.value!.children.length - opts.columns
    ) {
      select(0);
    } else {
      select(selectedIndex.value + (options as GridNavigationOptions).columns);
    }
  }
  function buttonUp() {
    if (options.mode === 'grid') {
      selectUp();
    } else if (options.mode === 'list') {
      selectPrevious();
    }
  }
  function buttonDown() {
    if (options.mode === 'grid') {
      selectDown();
    } else if (options.mode === 'list') {
      console.log('button down');
      selectNext();
    }
  }
  function buttonLeft() {
    if (options.mode === 'grid') {
      selectPrevious();
    } else if (options.mode === 'list') {
      selectPrevious();
    }
  }
  function buttonRight() {
    if (options.mode === 'grid') {
      selectNext();
    } else if (options.mode === 'list') {
      selectNext();
    }
  }

  function buttonContinue() {
    if (options.onSelected) {
      options.onSelected(selectedIndex.value);
    }
  }

  onMounted(() => {
    if (!options.listener) {
      return;
    }
    options.listener.actions.left = {
      press: buttonLeft,
    };
    options.listener.actions.right = {
      press: buttonRight,
    };
    options.listener.actions.up = {
      press: buttonUp,
    };
    options.listener.actions.down = {
      press: buttonDown,
    };
    options.listener.actions.continue = {
      press: buttonContinue,
    };
    select(0);
  });
  function disable() {
    if (!options.listener) {
      return;
    }
    delete options.listener.actions.left;
    delete options.listener.actions.right;
    delete options.listener.actions.up;
    delete options.listener.actions.down;
    delete options.listener.actions.continue;
  }
  onUnmounted(() => {
    disable();
  });
  return {
    selectedIndex,
    selectedElement,
    currentColumn,
    buttonDown,
    buttonUp,
    buttonLeft,
    buttonRight,
    selectUp,
    selectDown,
    selectPrevious,
    selectNext,
    select,
    disable,
  };
}
