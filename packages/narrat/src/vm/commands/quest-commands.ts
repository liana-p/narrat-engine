import { useQuests } from '@/stores/quest-log';
import { CommandPlugin } from './command-plugin';

// Write a CommandPlugin for starting a quest with the useQuests quests store
export const startQuestPlugin = new CommandPlugin<{ questId: string }>(
  'start_quest',
  [{ name: 'questId', type: 'string' }],
  async (cmd) => {
    const questId = cmd.options.questId;
    const quests = useQuests();
    quests.startQuest(questId);
  },
);

// Write a CommandPlugin for starting a quest objective with the cmd having arguments questId and objectiveId, using the useQuests store's startObjective method
export const startObjectivePlugin = new CommandPlugin<{
  questId: string;
  objectiveId: string;
}>(
  'start_objective',
  [
    { name: 'questId', type: 'string' },
    { name: 'objectiveId', type: 'string' },
  ],
  async (cmd) => {
    const { questId, objectiveId } = cmd.options;
    const quests = useQuests();
    quests.startObjective(questId, objectiveId);
  },
);

// Write a CommandPlugin for completing a quest objective with the cmd having arguments questId and objectiveId, using the useQuests store's completeObjective method
export const completeObjectivePlugin = new CommandPlugin<{
  questId: string;
  objectiveId: string;
}>(
  'complete_objective',
  [
    { name: 'questId', type: 'string' },
    { name: 'objectiveId', type: 'string' },
  ],
  async (cmd) => {
    const { questId, objectiveId } = cmd.options;
    const quests = useQuests();
    quests.completeObjective(questId, objectiveId);
  },
);

// Write a CommandPlugin for completing a quest with the cmd having arguments questId, using the useQuests store's completeQuest method
export const completeQuestPlugin = new CommandPlugin<{
  questId: string;
  ending?: string;
}>(
  'complete_quest',
  [
    { name: 'questId', type: 'string' },
    { name: 'ending', type: 'string', optional: true },
  ],
  async (cmd) => {
    const { questId, ending } = cmd.options;
    const quests = useQuests();
    quests.completeQuest(questId, ending);
  },
);

// Write a CommandPlugin for a command named 'quest_completed?' that returns true if the quest with the given questId has status value completed, false otherwise, using the useQuests store's isQuestCompleted method
export const questCompletedPlugin = new CommandPlugin<{
  questId: string;
}>('quest_completed?', [{ name: 'questId', type: 'string' }], async (cmd) => {
  const { questId } = cmd.options;
  const quests = useQuests();
  return quests.isQuestCompleted(questId);
});

// Write a CommandPlugin for a command named 'objective_completed?' that returns true if the quest with the given questId has the given objectiveId completed, false otherwise, using the useQuests store's isObjectiveCompleted method
export const objectiveCompletedPlugin = new CommandPlugin<{
  questId: string;
  objectiveId: string;
}>(
  'objective_completed?',
  [
    { name: 'questId', type: 'string' },
    { name: 'objectiveId', type: 'string' },
  ],
  async (cmd) => {
    const { questId, objectiveId } = cmd.options;
    const quests = useQuests();
    return quests.isObjectiveCompleted(questId, objectiveId);
  },
);

// Write a CommandPlugin for a command named 'quest_started?' that returns true if the quest with the given questId has status value started, false otherwise, using the useQuests store's isQuestStarted method
export const questStartedPlugin = new CommandPlugin<{
  questId: string;
}>('quest_started?', [{ name: 'questId', type: 'string' }], async (cmd) => {
  const { questId } = cmd.options;
  const quests = useQuests();
  return quests.isQuestStarted(questId);
});

// Write a CommandPlugin for a command named 'objective_started?' that returns true if the quest with the given questId has the given objectiveId started, false otherwise, using the useQuests store's isObjectiveStarted method
export const objectiveStartedPlugin = new CommandPlugin<{
  questId: string;
  objectiveId: string;
}>(
  'objective_started?',
  [
    { name: 'questId', type: 'string' },
    { name: 'objectiveId', type: 'string' },
  ],
  async (cmd) => {
    const { questId, objectiveId } = cmd.options;
    const quests = useQuests();
    return quests.isObjectiveStarted(questId, objectiveId);
  },
);
