import { useQuests } from '@/stores/quest-log';
import { CommandPlugin } from './command-plugin';

export const startQuestPlugin = new CommandPlugin<{ questId: string }>(
  'start_quest',
  [{ name: 'questId', type: 'string' }],
  async (cmd) => {
    const questId = cmd.options.questId;
    const quests = useQuests();
    quests.startQuest(questId);
  },
);

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

export const questCompletedPlugin = new CommandPlugin<{
  questId: string;
}>('quest_completed?', [{ name: 'questId', type: 'string' }], async (cmd) => {
  const { questId } = cmd.options;
  const quests = useQuests();
  return quests.isQuestCompleted(questId);
});

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

export const questStartedPlugin = new CommandPlugin<{
  questId: string;
}>('quest_started?', [{ name: 'questId', type: 'string' }], async (cmd) => {
  const { questId } = cmd.options;
  const quests = useQuests();
  return quests.isQuestStarted(questId);
});

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
