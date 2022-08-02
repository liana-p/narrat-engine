<template>
  <div class="dialog-box w-full override" :style="dialogBoxStyle">
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
        v-html="options.text"
      ></span>
      <div class="dialog-choices" v-if="canInteract && choices">
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
      <div v-else-if="canInteract && options.textField">
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
      <div v-else-if="canInteract" class="buttons-container">
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
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { defineComponent, PropType } from 'vue';
import { DialogChoice } from './stores/dialog-store';
import { useMain } from './stores/main-store';
import { DialogStyle } from './types/character-types';
import { DialogBoxParameters } from './types/dialog-box-types';
import { getCharacterStyle } from './utils/characters';
import { inputEvents } from './utils/InputsListener';

export default defineComponent({
  data() {
    return {
      playerText: '',
      passed: false,
      listener: null as any,
      timeout: null as any,
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
    if (this.canInteract) {
      // const button = this.$refs.continue as HTMLElement;
      // const choice = (this.$refs.choices as any)[0] as HTMLElement;
      // if (button) {
      //   button.focus();
      // } else if (choice) {
      //   choice.focus();
      // }
      const listener = (e: KeyboardEvent) => {
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
          if (choice !== -1) {
            if (this.choices && choice < this.choices.length) {
              this.chooseOption(this.choices[choice]);
            } else {
              this.chooseOption(choice);
            }
          }
        }
      };
      this.listener = inputEvents.on('debouncedKeydown', listener);
      this.timeout = setTimeout(() => {
        if (this.options.textField) {
          (this.$refs.playerInput as any).focus();
        }
      }, 10);
    }
  },
  unmounted() {
    this.clearListeners();
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
    style(): DialogStyle {
      return getCharacterStyle((this.options as any)!.styleId);
    },
    dialogBoxStyle(): any {
      const style = getCharacterStyle((this.options as any)!.styleId);
      const css: any = {
        opacity: (this.options as any)!.old ? '0.7' : '1',
      };
      if (!(this.options as any)!.title) {
        css.marginTop = '-20px';
      }
      return { ...style.boxCss, ...css };
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
    choices(): DialogChoice[] | undefined {
      if ((this.options as any)!.choices) {
        return (this.options as any)!.choices;
      }
      return undefined;
    },
    canInteract(): boolean {
      return (
        this.active &&
        !this.passed &&
        (this.options as any).interactive &&
        !this.paused
      );
    },
  },

  methods: {
    clearListeners() {
      if (this.listener) {
        inputEvents.off('keydown', this.listener);
        this.listener = null;
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
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
  },
});
</script>

<style>
.dialog-title {
  font-size: 20px;
  font-weight: bold;
}

.dialog-text {
  font-size: 16px;
}

.dialog-box {
  /* border-radius: 10px; */
  /* border: 1px solid #a8a8a8; */
  color: var(--text-color);
  /* background-color: #2e2e2e; */
  padding: 10px;
  padding-left: 2em;
  margin-bottom: 10px;
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
  height: 50px;
  color: var(--text-color);
  border: 1px solid black;
  font-weight: bold;
  font-size: 24px;
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
