<template>
  <div class="dialog-picture override" :style="boxStyle">
    <img
      :src="getAssetUrl(pictureUrl!)"
      class="picture override"
      v-if="pictureUrl"
    />
    <video v-if="video"></video>
  </div>
</template>

<script setup lang="ts">
import { getConfig, getAssetUrl, getDialogPanelWidth } from '@/config';
import { defaultConfig } from '@/config/config-output';
import { useRenderingStore } from '@/stores/rendering-store';
import { mapState } from 'pinia';
import { computed, defineComponent } from 'vue';
import { VideoCharacterPose } from '@/config/characters-config';

const props = defineProps<{
  pictureUrl: string | undefined;
  video: VideoCharacterPose;
}>();

const layoutMode = computed(() => {
  return useRenderingStore().layoutMode;
});
const boxStyle = computed(() => {
  const rendering = useRenderingStore();
  const layout = getConfig().layout;
  let right: any = 0;
  let bottom: any = 0;
  const portrait = layout.portraits;
  if (layoutMode.value === 'vertical') {
    const portraitMode = portrait.offset?.portrait ?? {
      right: 0,
      bottom: 0,
    };
    right = 20 + portraitMode.right;
    bottom = rendering.dialogHeight + portraitMode.bottom;
  } else {
    const landscape = portrait.offset?.landscape ?? { right: 0, bottom: 0 };
    const panelOffset =
      getConfig().dialogPanel.rightOffset ??
      defaultConfig.dialogPanel.rightOffset;
    right = getDialogPanelWidth() - 10 + landscape.right + panelOffset;
    bottom = 200 + landscape.bottom;
  }
  return {
    right: `${right}px`,
    bottom: `${bottom}px`,
    width: `${layout.portraits.width}px`,
    height: `${layout.portraits.height}px`,
  };
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
