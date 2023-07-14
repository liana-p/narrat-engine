<template>
  <div class="sub-tabs-controller">
    <div class="sub-tabs-controller__tabs" v-if="tabs.length > 1">
      <TabSelector
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :tab="tab"
        :active="index === activeTabIndex"
        @click="() => clickOnTab(index)"
      />
    </div>
    <div class="sub-tab-content" v-if="activeTab">
      <component
        :is="activeTab.component"
        :key="activeTab.id"
        :inputListener="inputListener"
        v-bind="activeTab.extraProps"
        v-if="activeTab"
        @close="$emit('close')"
      />
    </div>
    <div v-else>
      <div class="sub-tab-content__empty">
        <p>No tab selected</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import TabSelector, { TabOptions } from './tab-selector.vue';
import { InputListener } from '@/stores/inputs-store';

export interface SubTabControllerProps {
  tabs: TabOptions[];
  defaultTab: number;
  inputListener: InputListener;
}

const emit = defineEmits(['tab-change', 'close']);
const props = defineProps<SubTabControllerProps>();
const activeTabIndex = ref<number>(props.defaultTab);

function clickOnTab(tab: number) {
  activeTabIndex.value = tab;
  emit('tab-change', tab);
}

const activeTab = computed(() => {
  return props.tabs[activeTabIndex.value];
});

onMounted(() => {
  // eslint-disable-next-line vue/no-mutating-props
  props.inputListener.actions.subPreviousTab = {
    press: () => {
      if (activeTabIndex.value > 0) {
        clickOnTab(activeTabIndex.value - 1);
      }
    },
  };
  // eslint-disable-next-line vue/no-mutating-props
  props.inputListener.actions.subNextTab = {
    press: () => {
      if (activeTabIndex.value < props.tabs.length - 1) {
        clickOnTab(activeTabIndex.value + 1);
      }
    },
  };
});
onUnmounted(() => {
  // eslint-disable-next-line vue/no-mutating-props
  delete props.inputListener.actions.subPreviousTab;
  // eslint-disable-next-line vue/no-mutating-props
  delete props.inputListener.actions.subNextTab;
});
</script>
<style>
.sub-tabs-controller {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px 2rem;
}
.sub-tab-content {
  position: relative;
  width: 100%;
  margin-top: 2rem;
}

.sub-tabs-controller__tabs {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: var(--tabs-background);
}
</style>
