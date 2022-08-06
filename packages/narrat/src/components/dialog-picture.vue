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
      const portrait = layout.portraits;
      if (this.layoutMode === 'vertical') {
        const portraitMode = portrait.offset?.portrait ?? {
          right: 0,
          bottom: 0,
        };
        right = 20 + portraitMode.right;
        bottom = useRenderingStore().dialogHeight + portraitMode.bottom;
      } else {
        const landscape = portrait.offset?.landscape ?? { right: 0, bottom: 0 };
        right = layout.minTextWidth - 10 + landscape.right;
        bottom = 200 + landscape.bottom;
      }
      return {
        right: `${right}px`,
        bottom: `${bottom}px`,
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
