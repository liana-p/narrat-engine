<template>
  <div class="tab" :class="cssClass" :id="`tab-${tab.id}`" @click="tabClick">
    <div class="tab-title-container" :class="active ? 'active' : ''">
      <img :src="tab.icon" alt="tab icon" v-if="tab.icon" class="tab-icon" />
      <span class="tab-title">{{ tab.label }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Component, computed } from 'vue';

export interface TabOptions {
  id: string;
  label: string;
  icon?: string;
  component: Component | string;
}
const props = defineProps<{
  tab: TabOptions;
  active: boolean;
}>();
const emit = defineEmits(['click']);
const cssClass = computed(() => {
  return props.active ? 'tab-active' : 'tab-inactive';
});
function tabClick() {
  emit('click');
}
</script>
<style>
.tab {
  background: var(--tab-background);
  border-style: var(--tab-border-style);
  border-color: var(--tab-border-color);
  flex-grow: 1;
  padding: 5px 1rem;
  text-align: center;
}

.tab:not(:last-child) {
  border-right-width: 1px;
}
.tab-active {
  background: var(--tab-active-background);
  color: var(--tab-active-color);
  text-shadow: 0 0 20px #fff, 0 0 30px var(--tab-selected-glow-color),
    0 0 40px var(--tab-selected-glow-color),
    0 0 50px var(--tab-selected-glow-color),
    0 0 60px var(--tab-selected-glow-color),
    0 0 70px var(--tab-selected-glow-color),
    0 0 80px var(--tab-selected-glow-color);
}

.tab-inactive {
  background: var(--tab-inactive-background);
  color: var(--tab-inactive-color);
}

.tab-icon {
  width: 16px;
  height: 16px;
}

.tab-title-container {
  font-size: 1.3rem;
  font-weight: bold;
}

.tab-title-container.active {
  text-shadow: ;
}

.tab-title {
}
</style>
