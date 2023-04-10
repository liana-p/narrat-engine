<template>
  <div
    class="dialog-box w-full override"
    :style="dialogBoxStyle"
    :class="dialogBoxClass"
  >
    <div class="dialog-content">
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
        <div class="dialog-choices" v-if="choices">
          <p
            v-for="(choice, index) in choices"
            :key="index"
            :style="dialogStyle(choice)"
            :class="dialogClass(choice)"
            v-on:click="chooseOption(choice)"
            class="dialog-choice override"
            ref="choices"
            v-html="`${index + 1}. –&nbsp; ${choice.choice}`"
          ></p>
        </div>
        <div v-else-if="options.textField">
          <input
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

<script lang="ts">
import { mapState } from 'pinia';
import { defineComponent, PropType } from 'vue';
import { getConfig } from './config';
import { DialogStyleConfig } from './config/characters-config';
import { defaultConfig } from './config/config-output';
import { DEFAULT_TEXT_SPEED } from './constants';
import { DialogChoice, useDialogStore } from './stores/dialog-store';
import { useMain } from './stores/main-store';
import { DialogBoxParameters } from './types/dialog-box-types';
import { getCharacterStyle } from './utils/characters';
import { findAllHtmlTags } from './utils/string-helpers';

export interface TextAnimation {
  text: string;
  index: number;
  startTime: number;
  timer: NodeJS.Timer | null;
  skippedChars: number;
  tags: RegExpExecArray[];
  finished: boolean;
}
export default defineComponent({
  data() {
    return {
      playerText: '',
      passed: false,
      timeout: null as any,
      textAnimation: null as null | TextAnimation,
      mounted: false,
      autoTimer: null as null | NodeJS.Timer,
      skipTimer: null as null | NodeJS.Timer,
      nextLineTimer: null as null | NodeJS.Timer,
    };
  },

  props: {
    options: {
      type: Object as PropType<DialogBoxParameters>,
      required: true,
    },
    active: Boolean,
  },
  mounted() {
    this.startTextAnimation();
    this.registerKeyboardShortcuts();
    this.mounted = true;
  },
  unmounted() {
    this.clearListeners();
    this.endTextAnimation({ unmounted: true });
  },
  computed: {
    ...mapState(useMain, ['paused']),
    preText(): string {
      if ((this.options as any).title) {
        return ' &nbsp;–&nbsp; ';
      } else {
        return '';
      }
    },
    style(): DialogStyleConfig {
      return getCharacterStyle((this.options as any)!.styleId);
    },
    dialogBoxStyle(): any {
      const style = getCharacterStyle((this.options as any)!.styleId);
      const css: any = {
        opacity: (this.options as any)!.old ? '0.7' : '1',
      };
      return { ...style.boxCss, ...css };
    },
    isBasicChoice() {
      return !this.choices && !this.options.textField;
    },
    dialogBoxClass() {
      if (!(this.options as any)!.title) {
        return 'dialog-box-followup';
      }
      return false;
    },
    titleStyle(): any {
      const style = getCharacterStyle((this.options as any)!.styleId);
      const result = { color: style.color, ...style.nameCss };
      return result;
    },
    textStyle(): any {
      const style = getCharacterStyle((this.options as any)!.styleId);
      return style.textCss;
    },
    text(): string {
      if (this.textAnimation) {
        return this.textAnimation.text;
      } else {
        return this.options.text;
      }
    },
    choices(): DialogChoice[] | undefined {
      if ((this.options as any)!.choices) {
        return (this.options as any)!.choices;
      }
      return undefined;
    },
    skipping() {
      return useDialogStore().playMode === 'skip';
    },
    canInteract(): boolean {
      return (
        this.active &&
        this.mounted &&
        !this.passed &&
        !this.nextLineTimer &&
        !this.textAnimation &&
        (this.options as any).interactive &&
        !this.paused
      );
    },
  },
  watch: {
    options(newOptions, oldOptions) {
      if (!oldOptions.old && newOptions.old && this.textAnimation) {
        this.endTextAnimation({ unmounted: true });
      }
    },
    skipping(newValue, oldValue) {
      if (newValue && !oldValue) {
        this.startSkip();
      }
    },
  },
  methods: {
    clearListeners() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    keyboardEvent(e: KeyboardEvent) {
      if (!this.canInteract) {
        if (this.mounted && this.textAnimation && e.key === ' ') {
          this.endTextAnimation({ pressedSpace: true });
        }
        return;
      }
      if (this.canInteract && this.options.textField) {
        if (e.key === 'Enter') {
          this.submitText();
        }
      }
      if (this.canInteract && !this.options.textField) {
        let choice: any = -1;
        switch (e.key) {
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
        if (choice !== -1  && this.choices && choice < this.choices.length) {
          if (this.choices && choice < this.choices.length) {
            this.chooseOption(this.choices[choice]);
          } else if (choice === 0) {
            this.chooseOption(choice);
          }
        }
      }
    },
    next() {
      if (!this.passed) {
        this.chooseOption(0);
      }
    },
    chooseOption(choice: DialogChoice | number) {
      this.finishLine();
      let choiceValue: number;
      if (typeof choice === 'object') {
        choiceValue = choice.originalIndex;
      } else {
        choiceValue = choice;
      }
      useMain().playerAnswered(choiceValue);
    },
    finishLine() {
      this.clearListeners();
      this.endTextAnimation({ unmounted: true });
      this.passed = true;
    },
    dialogStyle(choice: DialogChoice) {
      const style: any = {};
      if (!choice.allowed) {
        style.pointerEvents = 'none';
        style.textDecoration = 'line-through';
      }
      return style;
    },
    dialogClass(choice: DialogChoice) {
      if (!choice.allowed) {
        return 'strike-anim';
      }
    },
    submitText() {
      const text = this.playerText;
      useMain().playerAnswered(text);
    },
    addTextSection(start: number, end: number) {
      const text = this.options.text.substring(start, end);
      this.textAnimation!.text += text;
      return end;
    },
    addHtmlTag(tag: RegExpExecArray) {
      const text = tag[0];
      this.textAnimation!.text += text;
      this.textAnimation!.skippedChars += text.length;
      return text.length;
    },
    startTextAnimation() {
      if (this.options.old) {
        return;
      }
      if (useDialogStore().playMode === 'skip') {
        this.startSkip();
      } else if (getConfig().dialogPanel.animateText) {
        this.textAnimation = {
          text: '',
          index: 0,
          startTime: Date.now(),
          timer: null as NodeJS.Timer | null,
          skippedChars: 0,
          tags: findAllHtmlTags(this.options.text),
          finished: false,
        };
        const anim = this.textAnimation;
        anim.timer = setInterval(() => {
          this.updateTextAnimation();
        }, 30);
      } else if (useDialogStore().playMode !== 'auto' && this.isBasicChoice) {
        this.autoTimer = setTimeout(() => {
          this.endTextAnimation();
        }, (getConfig().dialogPanel.textSpeed ?? DEFAULT_TEXT_SPEED) * this.options.text.length);
      }
    },
    startSkip() {
      if (useDialogStore().playMode === 'skip' && !this.options.old) {
        if (this.isBasicChoice) {
          this.skipTimer = setTimeout(() => {
            this.endTextAnimation();
          }, 100);
        } else {
          useDialogStore().toggleSkip();
          this.endTextAnimation({ unmounted: true });
        }
      }
    },
    updateTextAnimation() {
      const anim = this.textAnimation;
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
      if (lettersAmount > this.options.text.length) {
        ended = true;
        anim.finished = true;
        lettersAmount = this.options.text.length;
      }
      if (lettersAmount !== anim.index) {
        let cursor = previousIndex;
        while (anim.tags.length > 0 && lettersAmount >= anim.tags[0].index) {
          cursor = this.addTextSection(cursor, anim.tags[0].index);
          const tagLength = this.addHtmlTag(anim.tags.shift()!);
          cursor += tagLength;
          lettersAmount += tagLength;
        }
        cursor = this.addTextSection(cursor, lettersAmount);
        anim.index = cursor;
      }
      if (ended) {
        this.endTextAnimation();
      }
    },
    endTextAnimation({
      unmounted,
      pressedSpace,
    }: { unmounted?: boolean; pressedSpace?: boolean } = {}) {
      if (this.textAnimation) {
        if (this.textAnimation.timer) {
          clearInterval(this.textAnimation.timer);
        }
        this.textAnimation = null;
      }
      if (this.autoTimer && !pressedSpace) {
        clearTimeout(this.autoTimer);
      }
      if (this.skipTimer) {
        clearTimeout(this.skipTimer);
      }
      if (this.nextLineTimer) {
        clearTimeout(this.nextLineTimer);
      }
      if (
        !unmounted &&
        !pressedSpace &&
        useDialogStore().playMode !== 'normal' &&
        this.isBasicChoice
      ) {
        this.nextLineTimer = setTimeout(
          () => {
            this.next();
          },
          useDialogStore().playMode === 'auto'
            ? getConfig().dialogPanel.timeBetweenLines ??
                defaultConfig.dialogPanel.timeBetweenLines
            : 0,
        );
      }
    },
    registerKeyboardShortcuts() {
      this.timeout = setTimeout(() => {
        if (this.options.textField && this.canInteract) {
          (this.$refs.playerInput as any).focus();
        }
      }, 10);
    },
  },
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
  border: 1px solid black;
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
