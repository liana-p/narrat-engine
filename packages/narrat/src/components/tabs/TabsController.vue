<template>
  <div class="tabs-controller">
    <div class="tabs-controller__tabs" v-if="tabs.length > 1">
      <TabSelector
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :tab="tab"
        :active="tab.id === activeTabId"
        @click="() => clickOnTab(index)"
      />
    </div>
    <div class="tab-content" v-if="activeTab">
      <component
        :is="activeTab.component"
        v-if="activeTab"
        @close="$emit('close')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import TabSelector, { TabOptions } from './tab-selector.vue';

export interface TabControllerProps {
  tabs: TabOptions[];
  defaultTab: string;
}
const emit = defineEmits(['tab-change']);
const props = defineProps<TabControllerProps>();
const activeTabId = ref(props.defaultTab);

function clickOnTab(tab: number) {
  activeTabId.value = props.tabs[tab].id;
  emit('tab-change', tab);
}

const activeTab = computed(() => {
  return props.tabs.find((t) => t.id === activeTabId.value);
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
  margin-top: 2rem;
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
