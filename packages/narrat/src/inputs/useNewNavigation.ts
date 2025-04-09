import { InputListener } from '@/stores/inputs-store';
import { computed, ref, onMounted, onUnmounted, Ref } from 'vue';

export type GridNavigationOptions = {
  mode: 'grid';
  columns: number;
};
export type ListNavigationOptions = {
  mode: 'horizontal' | 'vertical';
};

export type NavigationOptions<T> = {
  mode: 'horizontal' | 'vertical' | 'grid';
  listener: Ref<InputListener | null>;
  elements: T[];
  looping: boolean;
  onHighlighted?: (element: T, index: number) => void;
  onSelected?: (element: T, index: number) => void;
  noConfirm?: boolean;
  autoMount?: boolean;
} & (GridNavigationOptions | ListNavigationOptions);

export function useNavigation<T>(options: NavigationOptions<T>) {
  const selectedIndex = ref(-1);
  const selectIndex = (index: number) => {
    selectedIndex.value = index;
  };
  const selectElement = (element: T) => {
    selectedIndex.value = options.elements.indexOf(element);
  };

  const currentColumn = computed(() =>
    options.mode === 'grid'
      ? selectedIndex.value % (options as GridNavigationOptions).columns
      : 0,
  );

  const selectedElement = computed(() => options.elements[selectedIndex.value]);

  const isHorizontal = computed(() => options.mode === 'horizontal');
  const isVertical = computed(() => options.mode === 'vertical');
  const isGrid = computed(() => options.mode === 'grid');
  const isList = computed(() => isHorizontal.value || isVertical.value);

  function isElementSelected(element: T): boolean {
    return (
      selectedIndex.value !== -1 &&
      options.elements.indexOf(element) === selectedIndex.value
    );
  }

  function isValid(index: number): boolean {
    return index >= 0 && index < options.elements.length;
  }

  function select(index: number) {
    if (isValid(index)) {
      selectedIndex.value = index;
      if (options.onSelected) {
        options.onSelected(selectedElement.value, index);
      }
    }
  }

  function selectPrevious() {
    if (selectedIndex.value === 0) {
      if (options.looping) {
        select(options.elements.length - 1);
      }
    } else {
      select(selectedIndex.value - 1);
    }
  }
  function selectNext() {
    if (selectedIndex.value === options.elements.length - 1) {
      if (options.looping) {
        select(0);
      }
    } else {
      select(selectedIndex.value + 1);
    }
  }
  function selectUp() {
    const opts = options as GridNavigationOptions;
    const index = selectedIndex.value;
    if (options.looping && index < opts.columns) {
      select(options.elements.length - 1);
    } else {
      select(selectedIndex.value - (options as GridNavigationOptions).columns);
    }
  }
  function selectDown() {
    const opts = options as GridNavigationOptions;
    const index = selectedIndex.value;
    if (options.looping && index >= options.elements.length - opts.columns) {
      select(0);
    } else {
      select(selectedIndex.value + (options as GridNavigationOptions).columns);
    }
  }

  function buttonUp() {
    if (isGrid.value) {
      selectUp();
    } else if (isList.value) {
      selectPrevious();
    }
  }
  function buttonDown() {
    if (isGrid.value) {
      selectDown();
    } else if (isList.value) {
      selectNext();
    }
  }
  function buttonLeft() {
    if (isGrid.value) {
      selectPrevious();
    } else if (isList.value) {
      selectPrevious();
    }
  }
  function buttonRight() {
    if (isGrid.value) {
      selectNext();
    } else if (isList.value) {
      selectNext();
    }
  }

  function buttonConfirm() {
    if (options.onSelected) {
      options.onSelected(selectedElement.value, selectedIndex.value);
    }
  }

  onMounted(() => {
    if (
      typeof options.autoMount === 'undefined' ||
      options.autoMount === true
    ) {
      mount();
    }
  });

  function unmount() {
    if (!options.listener.value) {
      return;
    }
    const listener = options.listener.value;
    if (isGrid.value || isHorizontal.value) {
      delete listener.actions.left;
      delete listener.actions.right;
    }
    if (isGrid.value || isVertical.value) {
      delete listener.actions.up;
      delete listener.actions.down;
    }
    if (!options.noConfirm) {
      delete listener.actions.confirm;
    }
  }
  function mount() {
    if (!options.listener.value) {
      return;
    }
    const listener = options.listener.value;
    if (isGrid.value || isHorizontal.value) {
      listener.actions.left = {
        press: buttonLeft,
      };
      listener.actions.right = {
        press: buttonRight,
      };
    }
    if (isGrid.value || isVertical.value) {
      listener.actions.up = {
        press: buttonUp,
      };
      listener.actions.down = {
        press: buttonDown,
      };
    }
    if (!options.noConfirm) {
      listener.actions.confirm = {
        press: buttonConfirm,
      };
    }
    select(0);
  }

  onUnmounted(() => {
    unmount();
  });

  return {
    selectedIndex,
    selectedElement,
    selectIndex,
    selectElement,
    isElementSelected,
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
    unmount,
    mount,
  };
}

export type NavigationState<T> = ReturnType<typeof useNavigation<T>>;
