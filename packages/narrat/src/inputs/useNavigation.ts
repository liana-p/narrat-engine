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
  container?: Ref<HTMLElement | null>;
  elements?: Ref<HTMLElement[]>;
  listener?: InputListener | null;
  loopForbidden?: boolean;
  onChosen?: (index: number) => void;
  onSelected?: (index: number) => void;
  onlyVertical?: boolean;
  onlyHorizontal?: boolean;
  noChoosing?: boolean;
} & (GridNavigationOptions | ListNavigationOptions);

export function useNavigation(options: NavigationOptions) {
  if (!options.listener) {
    console.warn('No input listener provided for navigation');
    return null;
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
  const selectables = computed(() => {
    if (options.container?.value) {
      return options.container.value.children as any as HTMLElement[];
    } else if (options.elements?.value) {
      return options.elements.value;
    }
    return [] as HTMLElement[];
  });

  function isValid(index: number): boolean {
    if (selectables.value) {
      return index >= 0 && index < selectables.value.length;
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
        if (options.onSelected) {
          options.onSelected(index);
        }
      }
    }
  }

  function getElementAtIndex(index: number) {
    if (selectables.value) {
      return selectables.value[index];
    }
    return null;
  }

  function selectPrevious() {
    if (!selectables.value) {
      return;
    }
    if (selectedIndex.value === 0) {
      if (!options.loopForbidden) {
        select(selectables.value.length - 1);
      }
    } else {
      select(selectedIndex.value - 1);
    }
  }
  function selectNext() {
    if (!selectables.value) {
      return;
    }
    if (selectedIndex.value === selectables.value.length - 1) {
      if (!options.loopForbidden) {
        select(0);
      }
    } else {
      select(selectedIndex.value + 1);
    }
  }
  function selectUp() {
    if (!selectables.value) {
      return;
    }
    const opts = options as GridNavigationOptions;
    const index = selectedIndex.value;
    if (!options.loopForbidden && index < opts.columns) {
      select(selectables.value.length - 1);
    } else {
      select(selectedIndex.value - (options as GridNavigationOptions).columns);
    }
  }
  function selectDown() {
    if (!selectables.value) {
      return;
    }
    const opts = options as GridNavigationOptions;
    const index = selectedIndex.value;
    if (
      !options.loopForbidden &&
      index >= selectables.value.length - opts.columns
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
    if (options.onChosen) {
      options.onChosen(selectedIndex.value);
    }
  }

  onMounted(() => {
    if (!options.listener) {
      return;
    }
    if (!options.onlyVertical) {
      options.listener.actions.left = {
        press: buttonLeft,
      };
      options.listener.actions.right = {
        press: buttonRight,
      };
    }
    if (!options.onlyHorizontal) {
      options.listener.actions.up = {
        press: buttonUp,
      };
      options.listener.actions.down = {
        press: buttonDown,
      };
    }
    if (!options.noChoosing) {
      options.listener.actions.continue = {
        press: buttonContinue,
      };
    }
    select(0);
  });
  function disable() {
    if (!options.listener) {
      return;
    }
    if (!options.onlyVertical) {
      delete options.listener.actions.left;
      delete options.listener.actions.right;
    }
    if (!options.onlyHorizontal) {
      delete options.listener.actions.up;
      delete options.listener.actions.down;
    }
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

export type NavigationState = ReturnType<typeof useNavigation>;
