<template>
  <div
    class="dialog-box w-full override"
    :style="dialogBoxStyle"
    :class="dialogBoxClass"
  >
    <div class="dialog-content" v-on:click="dialogClick">
      <span
        class="dialog-title override"
        v-if="options.title"
        :style="titleStyle"
        v-html="options.title"
      ></span>
      <span
        class="dialog-text dialog-separator override"
        :style="textStyle"
        v-html="preText"
      ></span>
      <span
        class="dialog-text override"
        :style="textStyle"
        :class="options.cssClass"
        v-html="text"
      ></span>
      <div v-visible="canInteract" v-if="!options.old">
        <div class="dialog-choices" v-if="choices" ref="choicesDiv">
          <p
            v-for="(choice, index) in choices"
            :key="index"
            :style="dialogStyle(choice)"
            :class="dialogClass(choice)"
            v-on:click="chooseOption(choice)"
            class="dialog-choice override"
            v-html="`${index + 1}. –&nbsp; ${choice.choice}`"
          ></p>
        </div>
        <div v-else-if="options.textField">
          <input
            autofocus
            type="text"
            class="label-input input"
            ref="playerInput"
            id="player-input-field"
            v-model="playerText"
          />
          <button @click="submitText" class="button" id="player-input-submit">
            Submit
          </button>
        </div>
        <div v-else class="buttons-container">
          <div
            v-on:click="chooseOption(0)"
            ref="continue"
            class="interact-button button override"
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { getConfig } from './config';
import { defaultConfig } from './config/config-output';
import { DEFAULT_TEXT_SPEED } from './constants';
import { DialogChoice, useDialogStore } from './stores/dialog-store';
import { useMain } from './stores/main-store';
import { DialogBoxParameters } from './types/dialog-box-types';
import { getCharacterStyle } from './utils/characters';
import { findAllHtmlTags } from './utils/string-helpers';
import { useNavigation } from './inputs/useNavigation';
import { InputListener, useInputs } from '@/stores/inputs-store';

export interface TextAnimation {
  text: string;
  index: number;
  startTime: number;
  timer: NodeJS.Timer | null;
  skippedChars: number;
  tags: RegExpExecArray[];
  finished: boolean;
}

const choicesDiv = ref<HTMLDivElement | null>(null);
const playerText = ref('');
const passed = ref(false);
const timeout = ref<any>(null);
const textAnimation = ref<TextAnimation | null>(null);
const mounted = ref(false);
const autoTimer = ref<NodeJS.Timer | null>(null);
const skipTimer = ref<NodeJS.Timer | null>(null);
const nextLineTimer = ref<NodeJS.Timer | null>(null);
const playerInput = ref<HTMLInputElement | null>(null);
const textFieldInputGrabber = ref<InputListener | null>(null);

const props = defineProps<{
  options: DialogBoxParameters;
  active: boolean;
  inputListener: InputListener | null;
}>();

const navigation = ref<any | null>(null);
if (props.active) {
  navigation.value = useNavigation({
    mode: 'list',
    container: choicesDiv,
    listener: props.inputListener,
    onlyVertical: true,
    onChosen: (index) => {
      if (canInteract.value && choices.value) {
        chooseOption(choices.value[index]);
      } else {
        keyboardPress(' ');
      }
    },
  });
}

onMounted(() => {
  startTextAnimation();
  registerKeyboardShortcuts();
  mounted.value = true;
});
onUnmounted(() => {
  clearListeners();
  cleanUpTextFieldListener();
  endTextAnimation({ unmounted: true });
});

function clearListeners() {
  if (timeout.value) {
    clearTimeout(timeout);
    timeout.value = null;
  }
  removeNavigation();
}

function removeNavigation() {
  if (navigation.value) {
    navigation.value.disable();
    navigation.value = null;
  }
}

function keyboardEvent(e: KeyboardEvent) {
  keyboardPress(e.key);
}

function keyboardPress(key: string) {
  if (!canInteract.value) {
    if (mounted.value && textAnimation && key === ' ') {
      endTextAnimation({ pressedSpace: true });
    }
    return;
  }
  if (canInteract.value && props.options.textField) {
    if (key === 'Enter') {
      submitText();
    }
  }
  if (canInteract.value && !props.options.textField) {
    let choice: any = -1;
    switch (key) {
      case ' ':
        choice = 0;
        break;
      case '1':
        choice = 0;
        break;
      case '2':
        choice = 1;
        break;
      case '3':
        choice = 2;
        break;
      case '4':
        choice = 3;
        break;
      case '5':
        choice = 4;
        break;
      case '6':
        choice = 5;
        break;
      case '7':
        choice = 6;
        break;
      case '8':
        choice = 7;
        break;
    }
    if (choice !== -1 && choices.value && choice < choices.value.length) {
      chooseOption(choices.value[choice]);
    } else if (choice === 0) {
      // In some cases there are no "choices", so pressing space (0) just does the default action
      chooseOption(choice);
    }
  }
}
function dialogClick() {
  if (!canInteract.value) {
    if (mounted.value && textAnimation) {
      endTextAnimation({ pressedSpace: true });
    }
  }
}

function next() {
  if (!passed.value) {
    chooseOption(0);
  }
}

function chooseOption(choice: DialogChoice | number) {
  finishLine();
  let choiceValue: number;
  if (typeof choice === 'object') {
    choiceValue = choice.originalIndex;
  } else {
    choiceValue = choice;
  }
  useMain().playerAnswered(choiceValue);
}

function finishLine() {
  clearListeners();
  endTextAnimation({ unmounted: true });
  passed.value = true;
}

function dialogStyle(choice: DialogChoice) {
  const style: any = {};
  if (!choice.allowed) {
    style.pointerEvents = 'none';
    style.textDecoration = 'line-through';
  }
  return style;
}

function dialogClass(choice: DialogChoice) {
  if (!choice.allowed) {
    return 'strike-anim';
  }
}

function submitText() {
  const text = playerText.value;
  cleanUpTextFieldListener();
  useMain().playerAnswered(text);
}

function createTextFieldListener() {
  if (props.options.textField) {
    timeout.value = setTimeout(() => {
      if (canInteract.value) {
        textFieldInputGrabber.value = useInputs().registerInputListener(
          'text-field-input-grabber',
          {},
        );
        if (playerInput.value) {
          playerInput.value!.focus();
        }
      }
    }, 100);
  }
}

function cleanUpTextFieldListener() {
  if (textFieldInputGrabber.value) {
    useInputs().unregisterInputListener(textFieldInputGrabber.value);
    textFieldInputGrabber.value = null;
  }
}
function addTextSection(start: number, end: number) {
  const text = props.options.text.substring(start, end);
  textAnimation.value!.text += text;
  return end;
}

function addHtmlTag(tag: RegExpExecArray) {
  const text = tag[0];
  textAnimation.value!.text += text;
  textAnimation.value!.skippedChars += text.length;
  return text.length;
}

function startTextAnimation() {
  if (props.options.old) {
    return;
  }
  if (useDialogStore().playMode === 'skip') {
    startSkip();
  } else if (getConfig().dialogPanel.animateText) {
    textAnimation.value = {
      text: '',
      index: 0,
      startTime: Date.now(),
      timer: null as NodeJS.Timer | null,
      skippedChars: 0,
      tags: findAllHtmlTags(props.options.text),
      finished: false,
    };
    const anim = textAnimation.value;
    anim.timer = setInterval(() => {
      updateTextAnimation();
    }, 30);
  } else if (isBasicChoice.value) {
    autoTimer.value = setTimeout(
      () => {
        endTextAnimation();
      },
      (getConfig().dialogPanel.textSpeed ?? DEFAULT_TEXT_SPEED) *
        props.options.text.length,
    );
  }
}

function startSkip() {
  if (useDialogStore().playMode === 'skip' && !props.options.old) {
    if (isBasicChoice.value) {
      skipTimer.value = setTimeout(() => {
        endTextAnimation();
      }, 100);
    } else {
      useDialogStore().toggleSkip();
      endTextAnimation({ unmounted: true });
    }
  }
}

function startAutoPlay() {
  if (useDialogStore().playMode === 'auto' && !props.options.old) {
    if (isBasicChoice.value && canInteract) {
      next();
    }
  }
}

function updateTextAnimation() {
  const anim = textAnimation.value;
  if (!anim) {
    return;
  }
  const previousIndex = anim.index;
  const elapsed = Date.now() - anim.startTime;
  let ended = false;
  let lettersAmount =
    Math.round(
      elapsed / (getConfig().dialogPanel.textSpeed ?? DEFAULT_TEXT_SPEED),
    ) + anim.skippedChars;
  if (lettersAmount > props.options.text.length) {
    ended = true;
    anim.finished = true;
    lettersAmount = props.options.text.length;
  }
  if (lettersAmount !== anim.index) {
    let cursor = previousIndex;
    while (anim.tags.length > 0 && lettersAmount >= anim.tags[0].index) {
      cursor = addTextSection(cursor, anim.tags[0].index);
      const tagLength = addHtmlTag(anim.tags.shift()!);
      cursor += tagLength;
      lettersAmount += tagLength;
    }
    cursor = addTextSection(cursor, lettersAmount);
    anim.index = cursor;
  }
  if (ended) {
    endTextAnimation();
  }
}

function endTextAnimation({
  unmounted,
  pressedSpace,
}: { unmounted?: boolean; pressedSpace?: boolean } = {}) {
  createTextFieldListener();
  setTimeout(() => {
    if (navigation.value) {
      navigation.value.select(0);
    }
  }, 10);
  if (textAnimation.value) {
    if (textAnimation.value.timer) {
      clearInterval(textAnimation.value.timer);
    }
    textAnimation.value = null;
  }
  if (autoTimer.value && !pressedSpace) {
    clearTimeout(autoTimer.value);
  }
  if (skipTimer.value) {
    clearTimeout(skipTimer.value);
  }
  if (nextLineTimer.value) {
    clearTimeout(nextLineTimer.value);
  }
  if (
    !unmounted &&
    !pressedSpace &&
    useDialogStore().playMode !== 'normal' &&
    isBasicChoice
  ) {
    nextLineTimer.value = setTimeout(
      () => {
        next();
      },
      useDialogStore().playMode === 'auto'
        ? getConfig().dialogPanel.timeBetweenLines ??
            defaultConfig.dialogPanel.timeBetweenLines
        : 0,
    );
  }
}

function registerKeyboardShortcuts() {
  // empty
}

const preText = computed(() => {
  if (props.options.title) {
    return ' &nbsp;–&nbsp; ';
  } else {
    return '';
  }
});

const style = computed(() => {
  return getCharacterStyle(props.options.styleId);
});

const dialogBoxStyle = computed(() => {
  const style = getCharacterStyle(props.options.styleId);
  const css: any = {
    opacity: props.options.old ? '0.7' : '1',
  };
  return { ...style.boxCss, ...css };
});

const isBasicChoice = computed(() => {
  return !choices.value && !props.options.textField;
});

const dialogBoxClass = computed(() => {
  if (props.options.title) {
    return 'dialog-box-followup';
  }
  return false;
});

const titleStyle = computed(() => {
  const style = getCharacterStyle(props.options.styleId);
  const result = { color: style.color, ...style.nameCss };
  return result;
});

const textStyle = computed(() => {
  const style = getCharacterStyle(props.options.styleId);
  return style.textCss;
});

const text = computed(() => {
  if (textAnimation.value) {
    return textAnimation.value.text;
  } else {
    return props.options.text;
  }
});

const choices = computed(() => {
  if ((props.options as any)!.choices) {
    return (props.options as any)!.choices;
  }
  return undefined;
});

const skipping = computed(() => {
  return useDialogStore().playMode === 'skip';
});

const autoPlay = computed(() => {
  return useDialogStore().playMode === 'auto';
});

const canInteract = computed(() => {
  return (
    props.active &&
    mounted.value &&
    !passed.value &&
    !nextLineTimer.value &&
    !textAnimation.value &&
    props.options.interactive &&
    !paused.value
  );
});

const main = useMain();
const paused = computed(() => {
  return main.paused;
});

watch(
  () => props.options,
  (newOptions, oldOptions) => {
    if (!oldOptions.old && newOptions.old && textAnimation) {
      endTextAnimation({ unmounted: true });
    }
  },
);

watch(skipping, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    startSkip();
  }
});

watch(autoPlay, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    startAutoPlay();
  }
});

defineExpose({
  keyboardEvent,
});
</script>

<style>
.dialog-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.dialog-text {
  font-size: 1rem;
}

.dialog-box {
  /* border-radius: 10px; */
  /* border: 1px solid #a8a8a8; */
  color: var(--text-color);
  /* background-color: #2e2e2e; */
  margin-top: 15px;
  padding: 0px 10px;
  padding-left: 2em;
}
.dialog-box-followup {
  margin-top: 0px;
}

.dialog-choice {
  color: var(--dialog-choice-color);
}

.dialog-choice:hover {
  color: var(--dialog-choice-hover-color);
  cursor: pointer;
}

.buttons-container {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  box-sizing: border-box;
}

.interact-button {
  cursor: pointer;
  user-select: none;
  color: var(--text-color);
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  flex-grow: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.interact-button:not(:last-child) {
  margin-right: 10px;
}
</style>
