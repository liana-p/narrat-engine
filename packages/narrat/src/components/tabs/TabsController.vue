<template>
  <div class="tabs-controller">
    <div class="tabs-controller__tabs" v-if="tabs.length > 1">
      <TabSelector
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :tab="tab"
        :active="index === activeTabIndex"
        @click="() => clickOnTab(index)"
        :inputListener="listener"
      />
    </div>
    <div class="tab-content" v-if="activeTab">
      <component
        :is="activeTab.component"
        :inputListener="listener"
        v-if="activeTab"
        @close="$emit('close')"
      />
    </div>
    <div v-else>
      <div class="tab-content__empty">
        <p>No tab selected</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import TabSelector, { TabOptions } from './tab-selector.vue';
import { InputListener, useInputs } from '@/stores/inputs-store';

export interface TabControllerProps {
  tabs: TabOptions[];
  defaultTab: number;
}
const listener = ref<InputListener | null>(
  useInputs().registerInputListener('tabs-controller', {
    cancel: {
      press: () => {
        emit('close');
      },
    },
    system: {
      press: () => {
        emit('close');
      },
    },
    menu: {
      press: () => {
        emit('close');
      },
    },
    previousTab: {
      press: () => {
        if (activeTabIndex.value > 0) {
          clickOnTab(activeTabIndex.value - 1);
        }
      },
    },
    nextTab: {
      press: () => {
        if (activeTabIndex.value < props.tabs.length - 1) {
          clickOnTab(activeTabIndex.value + 1);
        }
      },
    },
  }),
);

const emit = defineEmits(['tab-change', 'close']);
const props = defineProps<TabControllerProps>();
const activeTabIndex = ref<number>(props.defaultTab);

function clickOnTab(tab: number) {
  activeTabIndex.value = tab;
  emit('tab-change', tab);
}

const activeTab = computed(() => {
  return props.tabs[activeTabIndex.value];
});

onUnmounted(() => {
  if (listener.value) {
    useInputs().unregisterInputListener(listener.value!);
    listener.value = null;
  }
});
</script>
<style>
.tabs-controller {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px 2rem;
}
.tab-content {
  position: relative;
  width: 100%;
  flex-shrink: 1;
  overflow-y: auto;
}

.tabs-controller__tabs {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: var(--tabs-background);
}
</style>
