<template>
  <ModalWindow @close="$emit('close')" containerCssClass="jump-menu-container">
    <template v-slot:header>
      <h3 class="title">Jump to label</h3>
    </template>
    <template v-slot:body>
      <input
        type="text"
        class="label-input input"
        ref="search"
        v-model="searchString"
        @input="onSearchInput"
      />
      <div class="search-results" v-if="matches.length > 0">
        <div
          class="search-result"
          v-for="(match, index) in matches"
          :style="getMatchResultStyle(index)"
          :key="index"
        >
          {{ match }}
        </div>
      </div>
      <div v-else><h3>No matches found</h3></div>
    </template>
  </ModalWindow>
</template>
<script setup lang="ts">
import Fuse from 'fuse.js';
import { useVM } from '@/stores/vm-store';
import { InputListener, useInputs } from '@/stores/inputs-store';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { vm } from '@/vm/vm';
import ModalWindow from '../utils/modal-window.vue';
import { useMain } from '@/stores/main-store';

const emit = defineEmits(['close', 'jump']);

let fuse: Fuse<string>;

const inputListener = ref<InputListener | null>(null);
const searchString = ref('');
const matches = ref<string[]>([]);
const matchCursor = ref(0);
const search = ref<HTMLDivElement | null>(null);

function onSearchInput() {
  const value = searchString.value;
  const result = fuse.search(value);
  matches.value = result.map((element) => element.item);
  if (
    matches.value.length > 0 &&
    matchCursor.value > matches.value.length - 1
  ) {
    matchCursor.value = matches.value.length - 1;
  }
}

function getMatchResultStyle(index: number) {
  if (index === matchCursor.value) {
    return {
      background: 'var(--light-background)',
    };
  }
}

const labels = computed(() => {
  return Object.keys(vm.script).sort();
});

onMounted(() => {
  useMain().debugMode = true;
  fuse = new Fuse(labels.value, {
    includeScore: true,
  });
  matches.value = labels.value;
  matchCursor.value = 0;
  setTimeout(() => {
    nextTick(() => {
      if (search.value) {
        search.value.focus();
      }
    });
  }, 10);
  inputListener.value = useInputs().registerInputListener('debug-jumping', {
    up: {
      press: () => {
        if (matchCursor.value > 0) {
          matchCursor.value--;
        } else {
          matchCursor.value = matches.value.length - 1;
        }
      },
    },
    down: {
      press: () => {
        if (matches.value.length > matchCursor.value + 1) {
          matchCursor.value++;
        } else {
          matchCursor.value = 0;
        }
      },
    },
    continue: {
      press: () => {
        if (
          matches.value.length > 0 &&
          matchCursor.value < matches.value.length
        ) {
          const match = matches.value[matchCursor.value];
          useVM().jumpToLabel(match);
          emit('close');
        }
      },
    },
    escape: {
      press: () => {
        emit('close');
      },
    },
  });
});

onUnmounted(() => {
  if (inputListener.value) {
    useInputs().unregisterInputListener(inputListener.value);
  }
  useMain().debugMode = false;
});
</script>

<style>
.search-result {
  border: 1px solid var(--text-color);
  padding: 10px;
  font-weight: 700;
  font-size: 1.25rem;
  width: 100;
}

.jump-menu-container {
  width: 80%;
}
</style>
