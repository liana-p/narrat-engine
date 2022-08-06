<template>
  <transition name="fade">
    <DialogPicture :pictureUrl="picture" v-if="picture" />
  </transition>
  <transition name="dialog-transition">
    <div
      class="dialog override"
      ref="dialogRef"
      :style="dialogStyle"
      v-if="inGame && showDialog"
    >
      <transition-group
        name="list"
        tag="div"
        class="dialog-container w-full override"
        :style="dialogContainerStyle"
      >
        <DialogBox
          v-for="(val, i) in dialog"
          :key="val.id"
          :options="getDialogBoxOptions(val, i)"
          :active="isDialogActive(i)"
        />
      </transition-group>
      <div class="anchor"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { getConfig } from '@/config';
import { useVM } from '@/stores/vm-store';
import { DialogBoxParameters } from '@/types/dialog-box-types';
import { getCharacterInfo, getCharacterPictureUrl } from '@/utils/characters';
import { processText } from '@/utils/string-helpers';
import { computed, PropType, ref, watch } from 'vue';
import { DialogKey, useDialogStore } from '../stores/dialog-store';
import DialogPicture from './dialog-picture.vue';
import DialogBox from '@/dialog-box.vue';
import { useRenderingStore } from '@/stores/rendering-store';
import { useMain } from '@/lib';

const props = defineProps({
  layoutMode: String as PropType<'horizontal' | 'vertical'>,
  inGame: Boolean,
});

const vmStore = useVM();
const stack = computed(() => vmStore.stack);
const dialogStore = useDialogStore();
const dialog = computed(() => dialogStore.dialog);
const dialogRef = ref(null);
const dialogContainerStyle = computed((): any => {
  if (props.layoutMode === 'vertical') {
    return {};
  } else {
    return {
      paddingBottom: `${getConfig().layout.dialogBottomPadding}px`,
    };
  }
});

const lastDialog = computed((): DialogKey | undefined => {
  if (dialog.value.length > 0) {
    return dialog.value[dialog.value.length - 1];
  }
  return undefined;
});

const picture = computed((): string | undefined => {
  if (lastDialog.value) {
    return getCharacterPictureUrl(
      lastDialog.value.speaker,
      lastDialog.value.pose,
    );
  }
  return undefined;
});

const dialogWidth = computed((): number => {
  const width: any = getConfig().layout.minTextWidth;
  return width;
});

const showDialog = computed(() => {
  if (
    !useRenderingStore().overlayMode ||
    useRenderingStore().layoutMode === 'vertical'
  ) {
    return true;
  }
  return useMain().inScript;
});

const dialogStyle = computed((): any => {
  let transform: any;
  const height = `${useRenderingStore().dialogHeight}px`;
  const css: any = {};
  if (useRenderingStore().overlayMode) {
    css.position = 'absolute';
    const rightOffset = getConfig().layout.dialogPanel?.rightOffset ?? 0;
    css.right = `${rightOffset}px`;
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

function getDialogBoxOptions(
  dialogKey: DialogKey,
  index: number,
): DialogBoxParameters {
  const info = getCharacterInfo(dialogKey.speaker);
  let title: string | undefined = info.name;
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
  background: var(--bg-color);
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
</style>
