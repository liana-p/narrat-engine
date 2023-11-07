import { QuestsConfig } from '@/config/quests-config';
import { deepCopy } from '@/utils/data-helpers';
import { error } from '@/utils/error-handling';
import { acceptHMRUpdate, defineStore } from 'pinia';
import {
  getObjectiveConfig,
  getQuestConfig,
  getQuestEndingConfig,
} from '../config';
import { useNotifications } from './notification-store';

export interface QuestLogState {
  quests: {
    [key: string]: QuestState;
  };
}

export interface QuestState {
  id: string;
  state: 'hidden' | 'unlocked' | 'completed';
  // Ending id
  ending?: string;
  succeeded?: boolean;
  extraData: Record<string, any>;
  /** Note: Objectives are an object so that it's easy to access specific objectives in game scripts.
   * One side effect of this is that the order objectives appear in isn't technicaclly guaranteed. */
  objectives: {
    [key: string]: ObjectiveState;
  };
}

export interface ObjectiveState {
  id: string;
  state: 'hidden' | 'unlocked' | 'completed';
  succeeded?: boolean;
  extraData: Record<string, any>;
}

export type QuestLogSave = QuestLogState;

export const useQuests = defineStore('quests', {
  state: () =>
    ({
      quests: {},
    }) as QuestLogState,
  actions: {
    getQuest(questId: string): QuestState {
      const quest = this.quests[questId];
      if (quest) {
        return quest;
      } else {
        const err = `Quest ${questId} doesn't exist!`;
        error(err);
        throw new Error(err);
      }
    },
    getObjective(questId: string, objectiveId: string): ObjectiveState {
      const quest = this.getQuest(questId);
      if (!quest) {
        const err = `Quest ${questId} doesn't exist!`;
        error(err);
        throw new Error(err);
      }
      const questObjective = quest.objectives[objectiveId];
      if (questObjective) {
        return questObjective;
      }
      const err = `Objective ${objectiveId} doesn't exist in quest ${questId}!`;
      error(err);
      throw new Error(err);
    },
    updateConfig(questsConfig: QuestsConfig) {
      const quests = questsConfig.quests;
      // iterate through quests to generate quest states to add to this.quests object
      for (const key of Object.keys(quests)) {
        const data = quests[key];
        if (!this.quests[key]) {
          this.quests[key] = {
            id: key,
            state: 'hidden',
            objectives: {},
            extraData: {},
          };
        }
        // iterate through data.objectives to populate the objectives array of this.quests[key]
        for (const objectiveKey of Object.keys(data.objectives)) {
          const objective = data.objectives[objectiveKey];
          if (!this.quests[key].objectives[objectiveKey]) {
            this.quests[key].objectives[objectiveKey] = {
              extraData: {},
              id: objectiveKey,
              state: objective.hidden ? 'hidden' : 'unlocked',
            };
          }
        }
      }
    },
    reset(questsConfig: QuestsConfig) {
      this.$reset();
      this.updateConfig(questsConfig);
    },
    startQuest(questId: string) {
      const quest = this.getQuest(questId);
      if (quest) {
        quest.state = 'unlocked';
        useNotifications().addNotification(
          `Started quest: ${getQuestConfig(questId).title}`,
        );
      } else {
        error(`Quest ${questId} doesn't exist!`);
      }
    },
    startObjective(questId: string, objectiveId: string) {
      const objective = this.getObjective(questId, objectiveId);
      if (objective) {
        objective.state = 'unlocked';
        useNotifications().addNotification(
          `New quest objective: ${
            getObjectiveConfig(questId, objectiveId).description
          }`,
        );
      } else {
        error(`Objective ${objectiveId} doesn't exist in quest ${questId}!`);
      }
    },
    completeObjective(questId: string, objectiveId: string) {
      const objective = this.getObjective(questId, objectiveId);
      if (objective) {
        objective.state = 'completed';
        useNotifications().addNotification(
          `Completed quest objective: ${
            getObjectiveConfig(questId, objectiveId).description
          }`,
        );
      } else {
        error(`Objective ${objectiveId} doesn't exist in quest ${questId}!`);
      }
    },
    completeQuest(questId: string, result?: boolean | string) {
      const quest = this.getQuest(questId);
      if (quest) {
        quest.state = 'completed';
        if (typeof result === 'string') {
          quest.ending = result;
          const endingConfig = getQuestEndingConfig(questId, result);
          quest.succeeded = endingConfig.success;
        } else if (typeof result === 'boolean') {
          quest.succeeded = result;
        } else {
          quest.succeeded = true;
        }
        useNotifications().addNotification(
          `Completed quest: ${getQuestConfig(questId).title}`,
        );
      } else {
        error(`Quest ${questId} doesn't exist!`);
      }
    },
    isQuestCompleted(questId: string) {
      const quest = this.getQuest(questId);
      if (!quest) {
        return false;
      }
      return quest.state === 'completed';
      // return everyObject(
      //   quest.objectives,
      //   (objective) => objective.state === 'completed',
      // );
    },
    isQuestSucceeded(questId: string) {
      const quest = this.getQuest(questId);
      if (!quest) {
        return false;
      }
      return quest.state === 'completed' && quest.succeeded;
    },
    isQuestFailed(questId: string) {
      const quest = this.getQuest(questId);
      if (!quest) {
        return false;
      }
      return quest.state === 'completed' && !quest.succeeded;
    },
    getQuestEnding(questId: string) {
      const quest = this.getQuest(questId);
      if (!quest) {
        return false;
      }
      return quest.ending;
    },
    questHasEnding(questId: string, endingId: string) {
      return this.getQuestEnding(questId) === endingId;
    },
    isObjectiveCompleted(questId: string, objectiveId: string) {
      const objective = this.getObjective(questId, objectiveId);
      if (!objective) {
        return false;
      }
      return objective.state === 'completed';
    },
    isQuestStarted(questId: string) {
      const quest = this.getQuest(questId);
      if (!quest) {
        return quest;
      }
      return quest.state === 'unlocked';
    },
    isObjectiveStarted(questId: string, objectiveId: string) {
      const objective = this.getObjective(questId, objectiveId);
      return objective.state === 'unlocked';
    },
    removeQuest(id: string) {
      delete this.quests[id];
    },
    generateSaveData(): QuestLogSave {
      return {
        quests: deepCopy(this.quests),
      };
    },
    loadSaveData(data: QuestLogSave) {
      this.quests = data.quests;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuests, import.meta.hot));
}
