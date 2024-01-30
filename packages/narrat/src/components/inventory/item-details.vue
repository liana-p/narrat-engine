<template>
  <div>
    <div class="flex flex-row item-description-container">
      <div class="flex item-left">
        <div class="item-display" :style="itemStyle"></div>
      </div>
      <div class="flex item-right">
        <h2>{{ itemData.name }}</h2>
        <hr class="hr-solid" />
        <h3>Amount: {{ item.amount }}</h3>
        <p>{{ itemData.description }}</p>
        <button
          @click="use"
          class="nrt-button"
          :class="canUse ? '' : 'nrt-disabled'"
        >
          Use
        </button>
      </div>
    </div>
    <button class="nrt-button" @click="close">{{ '<--' }}</button>
  </div>
</template>
<script lang="ts" setup>
import { getAssetUrl, getItemConfig } from '@/config';
import { InputListener, useInputs } from '@/stores/inputs-store';
import { ItemState, useInventory } from '@/stores/inventory-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  item: ItemState;
}>();

const listener = ref<InputListener | null>(null);
const itemData = computed(() => {
  return getItemConfig(props.item.id);
});

const itemStyle = computed(() => {
  return {
    backgroundImage: `url(${getAssetUrl(itemData.value.icon)})`,
  };
});

const emit = defineEmits(['use', 'close']);
const canUse = computed(() => {
  return useInventory().canUseItem(props.item);
});

function use() {
  if (canUse.value) {
    emit('use');
  }
}

function close() {
  emit('close');
}

onMounted(() => {
  listener.value = useInputs().registerInputListener('item-details', {
    continue: {
      press: () => {
        if (canUse.value) {
          use();
        }
      },
    },
    cancel: {
      press: () => {
        close();
      },
    },
  });
});
onUnmounted(() => {
  if (listener.value) {
    useInputs().unregisterInputListener(listener.value);
    listener.value = null;
  }
});
</script>
<style>
.item-description-container {
  justify-content: space-between;
  align-items: stretch;
}

.item-left {
  border: 1px dashed white;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
}

.item-right {
  border: 1px dashed white;
  flex-direction: column;
  flex-grow: 2;
  align-items: baseline;
  padding: 10px;
}
</style>
