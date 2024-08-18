<template>
  <div class="debug-menu-section">
    <h2 class="debug-section-title" :id="link">{{ title }}</h2>
    <a href="#table-of-contents" class="debug-menu-link"
      ><button class="debug-link-button">Back</button></a
    >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  title: string;
  link: string;
}>();
</script>

<style scoped>
.debug-menu-section {
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  border-top: 4px solid orange;
}

.debug-section-title {
  text-align: center;
}

.debug-menu-link {
  position: absolute;
  top: 10px;
  left: 10px;
}

.debug-link-button {
  color: white;
  background-color: black;
  border: 1px solid orange;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
