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
      <div v-visible="choicesAreVisible" v-if="choices">
        <div class="dialog-choices" v-if="shouldShowChoice" ref="choicesDiv">
          <p
            v-for="(choice, index) in choices"
            :key="index"
            :style="dialogStyle(choice)"
            :class="dialogClass(choice)"
            v-on:click="choiceOnClick(choice)"
            class="dialog-choice override"
            v-html="dialogText(index, choice)"
          ></p>
        </div>
      </div>
      <div v-visible="canInteract" v-else-if="!options.old">
        <div v-if="options.textField">
          <input
            autofocus
            type="text"
            class="label-input nrt-input"
            ref="playerInput"
            id="player-input-field"
            v-model="playerText"
          />
          <button
            @click="submitText"
            class="nrt-button"
            id="player-input-submit"
          >
            Submit
          </button>
        </div>
        <div v-else class="buttons-container">
          <div
            v-on:click="chooseOption(0)"
            ref="continue"
            class="interact-button nrt-button override"
          >
            Continue
            <InputPrompt input="continue" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  getCommonConfig,
  getChoicePromptConfig,
  choicesConfig,
} from './config';
import { defaultConfig } from './config/config-output';
import { DEFAULT_TEXT_SPEED, MIN_DIALOG_TIME_ON_SCREEN } from './constants';
import { DialogChoice, useDialogStore } from './stores/dialog-store';
import { useMain } from './stores/main-store';
import { DialogBoxParameters } from './types/dialog-box-types';
import { getCharacterStyle } from './utils/characters';
import { findAllHtmlTags, stringTemplater } from './utils/string-helpers';
import { useOldNavigation } from './inputs/useNavigation';
import { InputListener, useInputs } from '@/stores/inputs-store';
import { Interval, Timeout } from '@/utils/time-helpers';
import { playLetterAudio, playDialogLineAudio } from '@/audio/audio-helpers';
import { useVM } from '@/stores/vm-store';
import InputPrompt from './components/input-prompt/input-prompt.vue';

export interface TextAnimation {
  text: string;
  index: number;
  startTime: number;
  timer: Interval | null;
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
const autoTimer = ref<Timeout | null>(null);
const skipTimer = ref<Timeout | null>(null);
const nextLineTimer = ref<Timeout | null>(null);
const playerInput = ref<HTMLInputElement | null>(null);
const textFieldInputGrabber = ref<InputListener | null>(null);

const props = defineProps<{
  options: DialogBoxParameters;
  active: boolean;
  inputListener: InputListener | null;
  index: number;
}>();

const navigation = ref<any | null>(null);
if (props.active) {
  navigation.value = useOldNavigation({
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
    clearTimeout(timeout.value);
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

function dialogText(index: number, choice: DialogChoice) {
  const context = {
    index: index + 1,
    choice: choice.choice,
  };
  let template =
    '<span class="choice-index">%{$index}. </span> <span class="choice-text">%{$choice}</span>';
  if (choicesConfig().choiceTextTemplate) {
    template = choicesConfig().choiceTextTemplate!;
  }
  if (choice.flag) {
    const flagConfig = getChoicePromptConfig(choice.flag);
    if (flagConfig?.textTemplate) {
      template = flagConfig.textTemplate;
    }
  }
  return stringTemplater(context, template);
}
function dialogClass(choice: DialogChoice) {
  const res: any = {};
  if (!choice.allowed) {
    res['strike-anim'] = true;
  }
  if (choice.seenBefore) {
    res['seen-before'] = true;
  }
  if (props.options.old) {
    res['old'] = true;
  } else {
    res['current'] = true;
  }
  if (choice.flag) {
    const flagConfig = getChoicePromptConfig(choice.flag);
    if (flagConfig?.cssClass) {
      res[flagConfig.cssClass] = true;
    }
  }
  return res;
}

function submitText() {
  const text = playerText.value;
  cleanUpTextFieldListener();
  useMain().playerAnswered(text);
}

function createTextFieldListener() {
  if (props.options.textField) {
    useInputs().startTyping();
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
  useInputs().stopTyping();
  if (textFieldInputGrabber.value) {
    useInputs().unregisterInputListener(textFieldInputGrabber.value);
    textFieldInputGrabber.value = null;
  }
}
function addTextSection(start: number, end: number) {
  const text = props.options.text.substring(start, end);
  textAnimation.value!.text += text;
  const newLetter = text.substring(0, 1);
  playLetterAudio(props.options.styleId, newLetter);
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
  } else {
    playDialogLineAudio(props.options.styleId);
    if (getCommonConfig().dialogPanel.animateText) {
      textAnimation.value = {
        text: '',
        index: 0,
        startTime: Date.now(),
        timer: null,
        skippedChars: 0,
        tags: findAllHtmlTags(props.options.text),
        finished: false,
      };
      const anim = textAnimation.value;
      anim.timer = setInterval(() => {
        updateTextAnimation();
      }, 30);
    } else if (isBasicChoice.value) {
      const textSpeed =
        (getCommonConfig().dialogPanel.textSpeed ?? DEFAULT_TEXT_SPEED) *
        props.options.text.length;
      autoTimer.value = setTimeout(
        () => {
          endTextAnimation();
        },
        Math.max(textSpeed, MIN_DIALOG_TIME_ON_SCREEN),
      );
    }
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
      elapsed / (getCommonConfig().dialogPanel.textSpeed ?? DEFAULT_TEXT_SPEED),
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
  useVM().endTextAnimation();
  if (!unmounted) {
    createTextFieldListener();
  }
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
        ? getCommonConfig().dialogPanel.timeBetweenLines ??
            defaultConfig.common.dialogPanel.timeBetweenLines
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

const dialogBoxStyle = computed(() => {
  const style = getCharacterStyle(props.options.styleId);
  return { ...style.boxCss };
});

const isBasicChoice = computed(() => {
  return !choices.value && !props.options.textField;
});

const shouldShowChoice = computed(() => {
  const showOldChoices = getCommonConfig().dialogPanel.showOldChoices;
  return (showOldChoices && props.options.old) || !props.options.old;
});

const choiceOnClick = (choice: any) => {
  if (!props.options.old) {
    chooseOption(choice);
  }
};

const dialogBoxClass = computed(() => {
  const css: any = {};
  if (props.options.title) {
    css['dialog-box-followup'] = true;
  }
  if (useDialogStore().isDialogCleared(props.index)) {
    if (useDialogStore().clearedDialogVisible) {
      css['dialog-box-cleared-visible'] = true;
    } else {
      css['dialog-box-cleared-disabled'] = true;
    }
  }

  if (isBasicChoice.value) {
    css['no-choices'] = true;
  } else {
    css['has-choices'] = true;
  }

  if (props.options.old) {
    css['dialog-box-old'] = true;
  } else {
    css['dialog-box-new'] = true;
  }

  return css;
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

// Passed is only for the choice at runtime and not old ones
const passedOrOld = computed(() => {
  return passed.value || props.options.old;
});

// Convoluted logic for if a choice should be shown based on being old. Either it's not old (always true), or it's old but there are choices + the showOldChoices config option
const shouldShowIfOld = computed(() => {
  return (
    (passedOrOld.value &&
      !isBasicChoice.value &&
      getCommonConfig().dialogPanel.showOldChoices) ||
    !passedOrOld.value
  );
});

// Note: this is for visibility, separate from the v-if which makes them not render at all. Choices need to not be visible until the text has finished animating,
// like in canInteract below, but because old choices can be shown we need extra logic in this case.
const choicesAreVisible = computed(() => {
  if (props.options.old) {
    return true;
  } else {
    return canInteract.value;
  }
});

const canInteract = computed(() => {
  return (
    props.active &&
    mounted.value &&
    shouldShowIfOld.value &&
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
  transition: 0.2s;
}

.dialog-choice {
  color: var(--dialog-choice-color);
}

.dialog-choice.seen-before {
  color: var(--dialog-choice-seen-before-color) !important;
}

.dialog-choice.old {
  color: var(--dialog-choice-old-color);
}

.key-choice {
  color: var(--dialog-choice-key-color);
}
.unimportant-choice {
  color: white;
}

.dialog-choice:hover {
  color: var(--dialog-choice-hover-color);
  cursor: pointer;
}

.dialog-choice:hover,
.dialog-choice.selected {
  transform: scale(1.05, 1.05);
  background-color: rgba(250, 173, 57, 0.3);
  transform-origin: center;
}

/* This overrides the default hover style for old choices if we are using showOldChoices */
.dialog-choice.old:hover {
  color: var(--dialog-choice-old-color);
  transform: unset;
  background-color: unset;
  cursor: default;
}

/* Somewhat arcane CSS to force the hover color to override the child style.
Otherwise hovering choices doesn't change the color of skill check prompts. */
.dialog-choice:not(:hover) > .skill-check-name,
.passive-skill-check > .skill-check-name {
  color: var(--skill-check-name-color);
}

.dialog-choice:not(:hover) > .skill-check-difficulty,
.passive-skill-check > .skill-check-difficulty {
  color: var(--skill-check-difficulty);
}

.skill-check-difficulty {
  font-weight: 700;
}

.dialog-choice:not(:hover) > .skill-check-success,
.passive-skill-check > .skill-check-success {
  color: var(--skill-check-success);
}

.dialog-choice:not(:hover) > .skill-check-failed,
.passive-skill-check > .skill-check-failed {
  color: var(--skill-check-failed);
}

.dialog-choice:not(:hover) > .skill-check,
.passive-skill-check.skill-check {
  color: var(--skill-check-color);
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

.choice-index {
  color: white;
  margin-right: 10px;
}

.dialog-box-old {
  opacity: 0.7;
}
.dialog-box-cleared-visible {
  opacity: 0.6;
}
.dialog-box-cleared-disabled {
  display: none;
}
</style>
