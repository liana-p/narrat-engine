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
      trackChoice(prompt: string, choice: string) {
        if (!this.choices[prompt]) {
          this.choices[prompt] = {};
        }
        this.choices[prompt][choice] = true;
      },
      hasSeenChoice(prompt: string, choice: string) {
        return this.choices[prompt]?.[choice] ?? false;
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
