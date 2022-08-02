<template>
  <div class="dialog-picture override" :style="boxStyle">
    <img :src="getAssetUrl(pictureUrl!)" class="picture override" />
  </div>
</template>

<script lang="ts">
import { getConfig, getAssetUrl } from '@/config';
import { useRenderingStore } from '@/stores/rendering-store';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    pictureUrl: String,
  },
  methods: {
    getAssetUrl(url: string) {
      return getAssetUrl(url);
    },
  },
  computed: {
    ...mapState(useRenderingStore, ['layoutMode']),
    boxStyle(): any {
      const layout = getConfig().layout;
      let right: any = 0;
      let bottom: any = 0;
      if (this.layoutMode === 'vertical') {
        right = '50%';
        bottom = `${layout.mobileDialogHeightPercentage - 5}%`;
      } else {
        right = `${layout.minTextWidth - 10}px`;
        bottom = '20%';
      }
      return {
        right,
        bottom,
        width: `${layout.portraits.width}px`,
        height: `${layout.portraits.height}px`,
      };
    },
  },
});
</script>

<style>
.dialog-picture {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid white;
  border-radius: 10px;
  background-color: grey;
  z-index: 99;
}

.dialog-picture img {
  width: 100%;
  height: 100%;
}
</style>
