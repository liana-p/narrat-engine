<template>
  <div class="dialog-picture override" :style="boxStyle">
    <img
      :src="getAssetUrl(getCharacterPicUrl(picture?.image))"
      class="picture override"
      v-if="picture"
    />
    <video
      v-if="video"
      class="picture override"
      :autoplay="video.autoplay === false ? false : true"
      :loop="video.loop === false ? false : true"
      :muted="video.muted ? true : false"
    >
      <source :src="getAssetUrl(getCharacterPicUrl(video.video))" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { getConfig, getAssetUrl, getDialogPanelWidth } from '@/config';
import { defaultConfig } from '@/config/config-output';
import { useRenderingStore } from '@/stores/rendering-store';
import { computed } from 'vue';
import {
  ImageCharacterPose,
  VideoCharacterPose,
} from '@/config/characters-config';
import { getCharacterPicUrl } from '@/utils/characters';

const props = defineProps<{
  picture: ImageCharacterPose | undefined;
  video: VideoCharacterPose | undefined;
}>();

const video = computed(() => {
  return props.video;
});

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
  let width = layout.portraits.width;
  let height = layout.portraits.height;
  if (props.video) {
    width = props.video.width ?? width;
    height = props.video.height ?? height;
  }
  if (props.picture) {
    width = props.picture.width ?? width;
    height = props.picture.height ?? height;
  }
  return {
    right: `${right}px`,
    bottom: `${bottom}px`,
    width: `${width}px`,
    height: `${height}px`,
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
  transition: all 0.5s ease-in-out;
}

.dialog-picture img {
  width: 100%;
  height: 100%;
}
</style>
