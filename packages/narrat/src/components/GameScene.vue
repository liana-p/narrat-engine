<template>
  <div class="game-scene" :id="`scene-${sceneId}`">
    <component
      :is="sceneInfo.component"
      @finished="finishedScene"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { useScenes } from '@/stores/scenes-store';
import { computed } from 'vue';

const props = defineProps<{
  sceneId: string;
  options: Record<string, any>;
}>();

const scenesStore = useScenes();
const sceneInfo = computed(() => scenesStore.getSceneConfig(props.sceneId));

function finishedScene() {
  scenesStore.finishedScene(props.sceneId);
}
</script>

<style>
.game-scene {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  left: 0;
  top: 0;
}
</style>
