<template>
  <div
    class="inventory-container"
    v-if="!chosenItem && Object.keys(itemsToDisplay).length > 0"
  >
    <button
      @click="() => clickItem(item.id)"
      class="item-display"
      :style="getItemStyle(item.id)"
      v-for="item in itemsToDisplay"
      :key="item.id"
    >
      <h3 class="item-title">{{ getItemName(item.id) }}</h3>
      <h3 class="item-amount">{{ item.amount }}</h3>
    </button>
  </div>
  <div v-else-if="typeof chosenId === 'string'">
    <div class="flex flex-row item-description-container">
      <div class="flex item-left">
        <div class="item-display" :style="getItemStyle(chosenId)"></div>
      </div>
      <div class="flex item-right">
        <h2>{{ getItemName(chosenId) }}</h2>
        <hr class="hr-solid" />
        <h3>Amount: {{ chosenItem!.amount }}</h3>
        <p>{{ chosenItemConf!.description }}</p>
        <button
          @click="useItem"
          class="button"
          :class="canUseChosenItem ? '' : 'disabled'"
        >
          Use
        </button>
      </div>
    </div>
    <button class="button" @click="closeItem">{{ '<--' }}</button>
  </div>
</template>
<script lang="ts" setup></script>

<style></style>
