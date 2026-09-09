import { deepCopy } from '@/utils/data-helpers';
import { defineStore } from 'pinia';

export type ChoiceBranchTracking = Record<string, boolean>;
export type ChoiceTrackingState = {
  choices: Record<string, ChoiceBranchTracking>;
};

export type ChoiceTrackingSave = ChoiceTrackingState;

export const useChoicesTrackingStoreStore = defineStore(
  'choices-tracking-store',
  {
    state: () =>
      ({
        choices: {},
      }) as ChoiceTrackingState,
    getters: {},
    actions: {
      getPromptCodeForPromptAndLabel(prompt: string, lastLabel: string) {
        return `${lastLabel}:${prompt}`;
      },
      trackChoice(prompt: string, choice: string, lastLabel: string) {
        const promptCode = this.getPromptCodeForPromptAndLabel(
          prompt,
          lastLabel,
        );
        if (!this.choices[promptCode]) {
          this.choices[promptCode] = {};
        }
        this.choices[promptCode][choice] = true;
      },
      hasSeenChoice(prompt: string, choice: string, lastLabel: string) {
        const promptCode = this.getPromptCodeForPromptAndLabel(
          prompt,
          lastLabel,
        );
        return this.choices[promptCode]?.[choice] ?? false;
      },
      generateSaveData(): ChoiceTrackingSave {
        return {
          choices: deepCopy(this.choices),
        };
      },
      loadSaveData(save: ChoiceTrackingSave) {
        this.choices = deepCopy(save.choices);
      },
      reset() {
        this.$reset();
      },
    },
  },
);
