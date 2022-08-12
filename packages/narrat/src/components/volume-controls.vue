<template>
  <div class="volume-controls">
    <h3 class="subtitle">Volume</h3>
    <div
      class="volume-control"
      v-for="(volume, index) in volumes"
      :key="volume.mode"
    >
      <label for="volume" class="volume-label">{{
        modeNames[volume.mode]
      }}</label>
      <input
        ref="slider"
        class="volume-slider"
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="1"
        step="0.1"
        v-model="volumes[index].volume"
        @change="(e) => changeVolume(volume.mode, e)"
      />
    </div>
    <!-- <button @click="toggleMute">Mute/Unmute</button> -->
  </div>
</template>
<script lang="ts">
import { AudioModeKey, useAudio } from '@/stores/audio-store';
import { Howler } from 'howler';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      muted: false,
      volumes: [] as Array<{ mode: 'master' | AudioModeKey; volume: number }>,
      modeNames: {
        master: 'Master volume:',
        music: 'Music:',
        ambiant: 'Ambiant:',
        sound: 'Sound effects:',
      },
    };
  },
  mounted() {
    const audio = useAudio();
    const volume = Howler.volume();
    this.volumes.push({ mode: 'master', volume });
    audio.modes.forEach((modeState, mode) => {
      this.volumes.push({
        mode,
        volume: audio.modes.get(mode)!.options.volume,
      });
    });
    // (this.$refs.slider as any).value = volume;
  },
  methods: {
    changeVolume(mode: 'master' | AudioModeKey, event: Event) {
      const target = event.target as HTMLInputElement;
      if (mode === 'master') {
        useAudio().setMasterVolume(target.value as any);
      } else {
        useAudio().setModeVolume(mode, target.value as any);
      }
    },
    toggleMute() {
      if (this.muted) {
        Howler.mute(false);
        this.muted = false;
      } else {
        Howler.mute(true);
        this.muted = true;
      }
    },
  },
});
</script>
<style>
.volume-label {
  /* margin: 5px 20px; */
  margin-right: 10px;
  font-size: 1.25rem;
  font-weight: 700;
  width: 180px;
  text-align: right;
  margin-right: 20px;
}

.volume-controls {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--light-background);
  border: 1px dashed white;
  padding: 20px;
  margin: 20px 0;
}
.volume-control {
  width: 100%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
}

.volume-slider {
  flex-grow: 2;
  background-color: blue;
}
</style>
