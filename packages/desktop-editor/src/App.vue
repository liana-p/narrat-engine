<script setup lang="ts">
function reload() {
  window.location.reload();
}
</script>
<template>
  <div class="narrat-ide">
    <button class="absolute" @click="reload">reload</button>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
