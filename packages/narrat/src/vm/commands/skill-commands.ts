import { useSkills } from '@/stores/skills';
import { runSkillCheck, SkillCheckParams } from '../vm-helpers';
import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';
import { getSkillCheckConfig, skillCheckConfigExists } from '@/config';

export interface AddLevelArgs {
  skillKey: string;
  amount: number;
}

export const addLevelPlugin = new CommandPlugin<AddLevelArgs>(
  'add_level',
  [
    {
      name: 'skillKey',
      type: 'string',
    },
    {
      name: 'amount',
      type: 'number',
    },
  ],
  async (cmd) => {
    let { skillKey, amount } = cmd.options;
    if (!skillKey || !amount) {
      commandRuntimeError(
        cmd,
        `add_level command needs a skill id and a value as parameters`,
      );
    }
    if (!Number.isInteger(amount)) {
      const oldAmount = amount;
      amount = Math.round(amount);
      console.warn(
        `add_level expects a level to be an integer. Auto Rounding ${oldAmount} to ${amount}`,
      );
    }
    useSkills().incrementSkill(skillKey, amount);
  },
);

export const setLevelPlugin = CommandPlugin.FromOptions<{
  skill: string;
  level: number;
}>({
  keyword: 'set_level',
  argTypes: [
    { name: 'skill', type: 'string' },
    { name: 'level', type: 'number' },
  ],
  runner: async (cmd) => {
    let { skill, level } = cmd.options;
    if (!skill || !level) {
      commandRuntimeError(
        cmd,
        `set_level command needs a skill id and a value as parameters`,
      );
    }
    if (!Number.isInteger(level)) {
      const oldLevel = level;
      level = Math.round(level);
      console.warn(
        `set_level expects a level to be an integer. Auto Rounding ${oldLevel} to ${level}`,
      );
    }
    useSkills().setSkillLevel(skill, level);
  },
});

export interface AddXpArgs {
  xpKey: string;
  xpToAdd: number;
}
export const addXpPlugin = new CommandPlugin<AddXpArgs>(
  'add_xp',
  [
    { name: 'xpKey', type: 'string' },
    { name: 'xpToAdd', type: 'number' },
  ],
  async (cmd) => {
    const { xpKey, xpToAdd } = cmd.options;
    if (!xpKey || !xpToAdd) {
      commandRuntimeError(
        cmd,
        `add_xp command needs a skill id and a value as parameters`,
      );
    }
    useSkills().addXp(xpKey, xpToAdd as any);
  },
);

export interface GetLevelArgs {
  skillKey: string;
}
export const getLevelPlugin = new CommandPlugin<GetLevelArgs>(
  'get_level',
  [
    {
      name: 'skillKey',
      type: 'string',
    },
  ],
  async (cmd) => {
    const { skillKey } = cmd.options;
    if (!skillKey) {
      commandRuntimeError(
        cmd,
        `get_level command needs a skill id as parameter`,
      );
    }
    const skill = useSkills().getSkill(skillKey);
    if (!skill) {
      commandRuntimeError(cmd, `Skill ${skillKey} not found`);
    }
    return skill.level;
  },
);

export interface GetXpArgs {
  xpKey: string;
}
export const getXpPlugin = new CommandPlugin<GetXpArgs>(
  'get_xp',
  [
    {
      name: 'xpKey',
      type: 'string',
    },
  ],
  async (cmd) => {
    const { xpKey } = cmd.options;
    if (!xpKey) {
      commandRuntimeError(cmd, `get_xp command needs a skill id as parameter`);
    }
    const xp = useSkills().getSkillXp(xpKey);
    if (!xp) {
      commandRuntimeError(cmd, `XP ${xpKey} not found`);
    }
    return xp;
  },
);

export interface RollArgs {
  id: string;
  skill?: string;
  difficulty?: number;
  mode?: string;
}
export const rollPlugin = new CommandPlugin<RollArgs>(
  'roll',
  [
    { name: 'id', type: 'string' },
    { name: 'skill', type: 'string', optional: true },
    { name: 'difficulty', type: 'number', optional: true },
    { name: 'mode', type: 'string', optional: true },
  ],
  async (cmd) => {
    const { id } = cmd.options;
    let config: SkillCheckParams = {
      id,
    } as any;
    if (cmd.args.length === 1 && skillCheckConfigExists(id)) {
      config = {
        ...getSkillCheckConfig(id),
        id,
      };
    } else {
      const { skill, difficulty, mode } = cmd.options;
      if (!skill || !difficulty) {
        commandRuntimeError(
          cmd,
          `roll command needs a skill and a difficulty as parameters, or the skill check id to be configured in skillChecks.yaml`,
        );
        return;
      }
      config = {
        skill,
        difficulty,
        id,
      };
      if (mode === 'hideAfterRoll') {
        config.hideAfterRoll = true;
      }
      if (mode === 'repeatable') {
        config.repeatable = true;
      }
    }
    const result = runSkillCheck(config);
    return result.succeeded;
  },
);

export const getSkillCheckPlugin = new CommandPlugin<{
  skillCheckId: string;
}>(
  'get_skill_check',
  [{ name: 'skillCheckId', type: 'string' }],
  async (cmd) => {
    return useSkills().getSkillCheck(cmd.options.skillCheckId);
  },
);

export const getSkillCheckResultPlugin = new CommandPlugin<{
  skillCheckId: string;
}>(
  'skill_check_result',
  [{ name: 'skillCheckId', type: 'string' }],
  async (cmd) => {
    const skillCheck = useSkills().getSkillCheck(cmd.options.skillCheckId);
    return skillCheck.succeeded;
  },
);

export const resetSkillCheck = new CommandPlugin<{ id: string }>(
  'reset_roll',
  [
    {
      name: 'id',
      type: 'string',
    },
  ],
  async (cmd) => {
    return useSkills().resetSkillCheck(cmd.options.id);
  },
);
