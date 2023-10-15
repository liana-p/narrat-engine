<script setup lang="ts">
import MonacoEditor from './components/MonacoEditor.vue';

// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <h1 class="title">Narrat Editor!</h1>
    <div class="editor-layout flex justify-between">
      <MonacoEditor class="grow"/>
      <div class="in-between grow-0"></div>
      <div class="game-preview grow">
        <h2>Game preview</h2>
      </div>
    </div>
  </div>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>
