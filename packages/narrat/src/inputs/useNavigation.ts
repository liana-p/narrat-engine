import { useInputs } from '@/lib';
import { InputListener } from '@/stores/inputs-store';
import { computed, ref, onMounted, onUnmounted } from 'vue';

export type GridNavigationOptions = {
  mode: 'grid';
  columns: number;
};
export type ListNavigationOptions = {
  mode: 'list';
};
export type NavigationOptions = {
  mode: 'grid' | 'list';
  container: HTMLElement;
  listener: InputListener;
} & (GridNavigationOptions | ListNavigationOptions);

export function useNavigation(options: NavigationOptions) {
  const selectedIndex = ref(0);
  const selectedElement = computed(() =>
    getElementAtIndex(selectedIndex.value),
  );
  const currentColumn = computed(() =>
    options.mode === 'grid'
      ? selectedIndex.value % (options as GridNavigationOptions).columns
      : 0,
  );
  function isValid(index: number) {
    return index >= 0 && index < options.container.children.length;
  }

  function select(index: number) {
    const previousIndex = selectedIndex.value;
    if (isValid(index)) {
      if (previousIndex !== index) {
        selectedIndex.value = index;
        selectedElement.value.classList.add('selected');
        getElementAtIndex(previousIndex).classList.remove('selected');
      }
    }
  }

  function getElementAtIndex(index: number) {
    return options.container.children[index];
  }

  function selectPrevious() {
    select(selectedIndex.value - 1);
  }
  function selectNext() {
    select(selectedIndex.value + 1);
  }
  function selectUp() {
    select(selectedIndex.value - (options as GridNavigationOptions).columns);
  }
  function selectDown() {
    select(selectedIndex.value + (options as GridNavigationOptions).columns);
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

  onMounted(() => {
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
  });
  onUnmounted(() => {
    delete options.listener.actions.left;
    delete options.listener.actions.right;
    delete options.listener.actions.up;
    delete options.listener.actions.down;
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
  };
}
