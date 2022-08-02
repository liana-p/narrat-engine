<template>
  <div id="loading-bar">
    <div id="inner-loading-bar" :style="loadingStyle()"></div>
    <div id="loading-text">
      <h3>Loading {{ Math.floor(percentage! * 100) }}% - {{ step }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    percentage: Number,
    step: String,
  },

  methods: {
    loadingStyle(): any {
      const maxWidth = 60;
      const width = this.percentage! * maxWidth;
      return {
        width: `${width}vw`,
      };
    },
  },
  computed: {},
});
</script>

<style>
#loading-bar {
  position: relative;
  width: 60vw;
  height: 50px;
  border-radius: 50px;
  background: var(--loading-bar-outer-bg);
  border: 3px solid white;
}

#inner-loading-bar {
  height: 100%;
  border-radius: 50px 0px 0px 50px;
  background: var(--loading-bar-inner-bg);
}

#loading-text {
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
</style>
