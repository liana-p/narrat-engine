<template>
  <transition name="fade">
    <DialogPicture
      :picture="picture"
      :video="video"
      v-if="(picture || video) && rendering.showDialog"
    />
  </transition>
  <transition name="dialog-transition">
    <div
      class="dialog override"
      ref="dialogRef"
      :style="dialogStyle"
      v-if="inGame && rendering.showDialog"
    >
      <transition-group
        name="list"
        tag="div"
        class="dialog-container w-full override"
        :style="dialogContainerStyle"
      >
        <DialogBox
          v-for="(val, i) in dialog"
          :ref="(el) => (lastDialogBox = el)"
          :key="val.id"
          :options="getDialogBoxOptions(val, i)"
          :active="isDialogActive(i)"
          :inputListener="inputListener"
        />
      </transition-group>
      <Teleport to="#app">
        <div class="auto-skip-buttons flex">
          <div
            class="button menu-toggle-button auto-button auto"
            @click="autoPlay"
          >
            Auto
          </div>
          <div class="button menu-toggle-button auto-button skip" @click="skip">
            Skip
          </div>
        </div>
      </Teleport>
      <div class="anchor"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { getConfig } from '@/config';
import { useVM } from '@/stores/vm-store';
import { DialogBoxParameters } from '@/types/dialog-box-types';
import {
  getCharacterInfo,
  getCharacterPoseData,
  getCharacterPicUrl,
  isVideoPose,
  isImagePose,
} from '@/utils/characters';
import { processText } from '@/utils/string-helpers';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { DialogKey, useDialogStore } from '../stores/dialog-store';
import DialogPicture from './dialog-picture.vue';
import DialogBox from '@/dialog-box.vue';
import { useRenderingStore } from '@/stores/rendering-store';
import { useMain } from '@/stores/main-store';
import { defaultConfig } from '@/config/config-output';
import { inputEvents } from '../utils/InputsListener';
import { InputListener } from '@/stores/inputs-store';
import {
  ImageCharacterPose,
  VideoCharacterPose,
} from '@/config/characters-config';

const props = defineProps<{
  layoutMode: 'horizontal' | 'vertical';
  inGame: boolean;
  inputListener: InputListener;
}>();
const inDialogue = ref(useMain().inScript);
const dialogueEndTimer = ref<null | NodeJS.Timer>(null);
const rendering = useRenderingStore();
const vmStore = useVM();
const stack = computed(() => vmStore.stack);
const dialogStore = useDialogStore();
const dialog = computed(() => dialogStore.dialog);
const dialogRef = ref(null);
const lastDialogBox = ref<any>(null);
const keyboardListener = ref<any>(null);

const dialogContainerStyle = computed((): any => {
  let padding = '0px';
  const layoutPadding = getConfig().layout.dialogBottomPadding;
  if (typeof layoutPadding === 'number') {
    padding = `${layoutPadding}px`;
  } else if (typeof layoutPadding === 'string') {
    padding = layoutPadding;
  }
  return {
    paddingBottom: padding,
  };
});

const lastDialog = computed((): DialogKey | undefined => {
  if (dialog.value.length > 0) {
    return dialog.value[dialog.value.length - 1];
  }
  return undefined;
});

const pose = computed(() => {
  if (lastDialog.value) {
    const speaker = lastDialog.value.speaker;
    let pose = lastDialog.value.pose;
    if (!speaker) {
      return undefined;
    }
    if (!pose) {
      pose = 'idle';
    }
    return pose;
  }
  return undefined;
});

const poseData = computed(() => {
  if (!pose.value) {
    return undefined;
  }
  const speaker = lastDialog.value!.speaker;
  const data = getCharacterPoseData(speaker, pose.value!);
  return data;
});

const picture = computed((): ImageCharacterPose | undefined => {
  const data = poseData.value;
  if (isImagePose(data)) {
    return data;
  }
  return undefined;
});

const video = computed((): VideoCharacterPose | undefined => {
  const data = poseData.value;
  if (isVideoPose(data)) {
    return data;
  }
  return undefined;
});

const dialogWidth = computed((): number => {
  return rendering.dialogWidth;
});

const inScript = computed(() => {
  return useMain().inScript;
});
watch(inScript, (val) => {
  if (val) {
    inDialogue.value = true;
  } else {
    if (useDialogStore().playMode !== 'normal') {
      if (useDialogStore().playMode === 'skip') {
        useDialogStore().playMode = 'normal';
      }
      dialogueEndTimer.value = setTimeout(() => {
        inDialogue.value = false;
      }, 500);
    } else {
      inDialogue.value = false;
    }
  }
});
onMounted(() => {
  // eslint-disable-next-line vue/no-mutating-props
  props.inputListener.actions.autoPlay = {
    press: () => {
      useDialogStore().toggleAutoPlay();
    },
  };
  // eslint-disable-next-line vue/no-mutating-props
  props.inputListener.actions.skip = {
    press: () => {
      useDialogStore().toggleSkip();
    },
  };
  const keyboardListener = (e: KeyboardEvent) => {
    if (lastDialogBox.value && lastDialogBox.value.keyboardEvent) {
      lastDialogBox.value.keyboardEvent(e);
    }
  };
  keyboardListener.value = inputEvents.on('debouncedKeydown', keyboardListener);
});
onUnmounted(() => {
  if (props.inputListener) {
    /* eslint-disable vue/no-mutating-props */
    delete props.inputListener.actions.autoPlay;
    delete props.inputListener.actions.skip;
    /* eslint-enable vue/no-mutating-props */
  }
  if (keyboardListener.value) {
    inputEvents.off('debouncedKeydown', keyboardListener.value);
  }
  if (dialogueEndTimer.value) {
    clearTimeout(dialogueEndTimer.value);
  }
});

const dialogStyle = computed((): any => {
  let transform: any;
  const height = `${useRenderingStore().dialogHeight}px`;
  const css: any = {};
  if (useRenderingStore().overlayMode) {
    css.position = 'absolute';
    const rightOffset =
      getConfig().dialogPanel.rightOffset ??
      defaultConfig.dialogPanel.rightOffset;
    css.right = `${rightOffset}px`;
    const bottomOffset =
      getConfig().dialogPanel.bottomOffset ??
      defaultConfig.dialogPanel.bottomOffset;
    css.bottom = `${bottomOffset}px`;
  }
  return {
    ...css,
    width:
      props.layoutMode === 'horizontal' ? `${dialogWidth.value}px` : '100%',
    height,
    transform,
    transformOrigin: 'right',
  };
});

function autoPlay() {
  useDialogStore().toggleAutoPlay();
}
function skip() {
  useDialogStore().toggleSkip();
}
function getDialogBoxOptions(
  dialogKey: DialogKey,
  index: number,
): DialogBoxParameters {
  const info = getCharacterInfo(dialogKey.speaker);
  let title: string | undefined = info?.name ?? 'Missing Character';
  if (index >= 1) {
    const previousDialog = dialog.value[index - 1];
    if (previousDialog.speaker === dialogKey.speaker) {
      title = undefined;
    }
  }
  if (dialogKey.choices) {
    dialogKey.choices.forEach((choice) => {
      choice.choice = processText(choice.choice);
    });
  }
  return {
    title: title ?? '',
    text: dialogKey.text,
    cssClass: dialogKey.cssClass,
    styleId: dialogKey.speaker,
    choices: dialogKey.choices!,
    old: index < dialog.value.length - 1,
    interactive: dialogKey.interactive,
    textField: dialogKey.textField,
  };
}

function isDialogActive(i: number) {
  const result = i === dialogStore.dialog.length - 1 && stack.value.length > 0;
  return result;
}

watch(dialog.value, (newValue) => {
  if (dialogRef.value) {
    const dialog = dialogRef.value as HTMLElement;
    dialog.scrollTop = dialog.scrollHeight + 100000000;
  }
});
</script>
<style>
.dialog-container {
  flex-shrink: 2;
  /* padding: 20px; */
  min-height: 100%;
  width: 100%;
  background-color: (var(--bg-color));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow-x: hidden;
}

.dialog {
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* background: url('dark.webp'); */
  background: var(--dialog-box-bg);
  border: var(--dialog-box-border);
  box-shadow:
    0 19px 38px rgba(0, 0, 0, 0.7),
    0 15px 12px rgba(0, 0, 0, 0.5);
}
.dialog::-webkit-scrollbar {
  display: none; /* webkit */
}

.dialog * {
  overflow-anchor: none;
}
.anchor {
  overflow-anchor: auto;
  height: 1px;
}

.auto-skip-buttons {
  position: absolute;
  top: 10px;
  right: 160px;
}
</style>
