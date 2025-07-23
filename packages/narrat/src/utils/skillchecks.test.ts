import { expect, it, describe } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mockConfig } from '@/tests/mock-config';
import cloneDeep from 'clone-deep';
import { useConfig } from '@/stores/config-store';
import {
  SkillCheckOptionsConfig,
  SkillChecksConfig,
} from '@/config/skillchecks-config';
import {
  calculateSkillCheckRoll,
  checkIfRollSucceeded,
  getSkillCheckDifficultyText,
  resolveSkillCheck,
  rollAllDice,
  rollDice,
} from './skillchecks';

import { skillChecksConfig } from '@/config';
import { useSkills } from '@/stores/skills';
import { SkillsConfig } from '@/config/skills-config';
import { beforeEach, afterEach } from 'vitest';

const skillChecksConfigMock: SkillChecksConfig = {
  options: {
    diceRange: [1, 6],
    extraPointsPerLevel: 1,
    extraDicePerLevel: 0,
    diceCount: 2,
    successOnRollsBelowThreshold: false,
    showDifficultyText: true,
    showDifficultyNumber: false,
    showDifficultyWithoutModifiers: false,
    finalRollIsHighest: false,
    finalRollIsLowest: false,
    failOnRollsEqualToThreshold: false,
    difficultyText: [
      [2, 'Very Easy'],
      [4, 'Easy'],
      [6, 'Medium'],
      [8, 'Hard'],
      [10, 'Very Hard'],
      [11, 'Extremely Hard'],
      [12, 'Near Impossible'],
    ],
  },
  skillChecks: {
    skill1: {
      skill: 'skill1',
      difficulty: 6,
    },
  },
};
const skillsMock: SkillsConfig = {
  skills: {
    skill1: {
      name: 'Skill 1',
      description: 'Skill 1 description',
      icon: 'img/skills/skill1.png',
      startingLevel: 1,
    },
  },
  skillOptions: {
    xpPerLevel: 10,
    notifyLevelUp: false,
  },
};

const mockedRoll = {
  unmodified: 4,
  modified: 5,
};

const originalRandom = Math.random;
beforeEach(() => {
  setActivePinia(createPinia());
  const config = cloneDeep(mockConfig);
  config.skillChecks = cloneDeep(skillChecksConfigMock);
  config.skills = cloneDeep(skillsMock);
  useSkills().updateConfig(config.skills);
  useConfig().setConfig(config);
});
afterEach(() => {
  Math.random = originalRandom;
});

describe('getSkillCheckDifficultyScore', () => {
  it('gets the right difficulty score, taking level modifiers into account', () => {
    const difficultyScore = getSkillCheckDifficultyText(6, 2);
    expect(difficultyScore).toBe('Easy');
  });
});

describe('getSkillCheckDifficultyText', () => {
  it('shows the difficulty without modifier if that option is enabled', () => {
    skillChecksConfig().options.showDifficultyWithoutModifiers = true;
    const difficultyText = getSkillCheckDifficultyText(6, 2);
    expect(difficultyText).toBe('Medium');
  });
  it('shows only the text if only that option is enabled', () => {
    skillChecksConfig().options.showDifficultyText = true;
    skillChecksConfig().options.showDifficultyNumber = false;
    const difficultyText = getSkillCheckDifficultyText(6, 2);
    expect(difficultyText).toBe('Easy');
  });
  it('shows both text and number if both are enabled', () => {
    skillChecksConfig().options.showDifficultyText = true;
    skillChecksConfig().options.showDifficultyNumber = true;
    const difficultyText = getSkillCheckDifficultyText(6, 2);
    expect(difficultyText).toBe('Easy (4)');
  });
  it('shows only the number if only that option is enabled', () => {
    skillChecksConfig().options.showDifficultyText = false;
    skillChecksConfig().options.showDifficultyNumber = true;
    const difficultyText = getSkillCheckDifficultyText(6, 2);
    expect(difficultyText).toBe('4');
  });
  it('shows nothing if neither option is enabled', () => {
    skillChecksConfig().options.showDifficultyText = false;
    skillChecksConfig().options.showDifficultyNumber = false;
    const difficultyText = getSkillCheckDifficultyText(6, 2);
    expect(difficultyText).toBe('');
  });
});

describe('rollDice', () => {
  it('returns a number within the lower bounds', () => {
    Math.random = () => 0;
    const roll = rollDice([1, 6]);
    expect(roll).toBe(1);
  });
  it('returns a number within the upper bounds', () => {
    Math.random = () => 0.9999;
    const roll = rollDice([1, 6]);
    expect(roll).toBe(6);
  });
});

describe('rollAllDice', () => {
  it('returns all the rolls unmodified and modified', () => {
    Math.random = () => 0.5;
    const options: SkillCheckOptionsConfig = skillChecksConfigMock.options;
    const skill = 'skill1';
    const rolls = rollAllDice(options, skill);
    expect(rolls).toEqual([mockedRoll, mockedRoll]);
  });
  it('uses extra dice if the option is given', () => {
    Math.random = () => 0.5;
    const options: SkillCheckOptionsConfig = cloneDeep(
      skillChecksConfigMock.options,
    );
    options.extraDicePerLevel = 1;
    const skill = 'skill1';
    const rolls = rollAllDice(options, skill);
    expect(rolls).toEqual([mockedRoll, mockedRoll, mockedRoll]);
  });
});

describe('checkIfRollSucceeded', () => {
  it('fails if the roll is below the threshold by default', () => {
    const result = checkIfRollSucceeded(4, 6);
    expect(result).toBe(false);
  });
  it('succeeds if the roll is above the threshold', () => {
    const result = checkIfRollSucceeded(6, 4);
    expect(result).toBe(true);
  });
  it('Succeeds if the roll is equal to the threshold by default', () => {
    const result = checkIfRollSucceeded(4, 4);
    expect(result).toBe(true);
  });
  it('succeeds if the roll is below the threshold if the `successOnRollsBelowThreshold` option is true', () => {
    skillChecksConfig().options.successOnRollsBelowThreshold = true;
    const result = checkIfRollSucceeded(4, 6);
    expect(result).toBe(true);
    const resultFail = checkIfRollSucceeded(6, 4);
    expect(resultFail).toBe(false);
    const resultEqual = checkIfRollSucceeded(4, 4);
    expect(resultEqual).toBe(true);
  });
  it('Fails if the roll is equal to the threshold and the `failOnRollsEqualToThreshold` option is true', () => {
    skillChecksConfig().options.failOnRollsEqualToThreshold = true;
    let result = checkIfRollSucceeded(4, 4);
    expect(result).toBe(false);
    skillChecksConfig().options.successOnRollsBelowThreshold = true;
    result = checkIfRollSucceeded(4, 4);
    expect(result).toBe(false);
  });
});

describe('calculateSkillCheckRoll', () => {
  const fakeRolls = [
    {
      unmodified: 4,
      modified: 5,
    },
    {
      unmodified: 1,
      modified: 2,
    },
  ];
  it('returns an accumulation of all rolled dice + the modifier by default', () => {
    let i = 0;
    Math.random = () => (i++ === 0 ? 0.5 : 0.1);
    const skill = 'skill1';
    const result = calculateSkillCheckRoll(skill);
    expect(result).toStrictEqual({
      roll: 6,
      rolls: fakeRolls,
    });
  });
  it('returns the highest roll if the `finalRollIsHighest` option is given', () => {
    let i = 0;
    Math.random = () => (i++ === 0 ? 0.5 : 0.1);
    skillChecksConfig().options.finalRollIsHighest = true;
    const skill = 'skill1';
    const result = calculateSkillCheckRoll(skill);
    expect(result).toStrictEqual({
      roll: 5,
      rolls: fakeRolls,
    });
  });
  it('returns the lowest roll if the `finalRollIsLowest` option is given', () => {
    let i = 0;
    Math.random = () => (i++ === 0 ? 0.5 : 0.1);
    skillChecksConfig().options.finalRollIsLowest = true;
    const skill = 'skill1';
    const result = calculateSkillCheckRoll(skill);
    expect(result).toStrictEqual({
      roll: 2,
      rolls: fakeRolls,
    });
  });
});

describe('resolveSkillCheck', () => {
  it('succeeds if the roll succeeded', () => {
    // 4 + 4 + 1 = 9
    Math.random = () => 0.5;
    const skillCheck = cloneDeep(skillChecksConfigMock.skillChecks.skill1);
    const result = resolveSkillCheck({
      id: 'test',
      ...skillCheck,
    });
    expect(result).toBe(true);
  });
  it('fails if the roll failed', () => {
    // 1 + 1 + 1 = 3
    Math.random = () => 0;
    const skillCheck = cloneDeep(skillChecksConfigMock.skillChecks.skill1);
    const result = resolveSkillCheck({
      id: 'test',
      ...skillCheck,
    });
    expect(result).toBe(false);
  });
  it('winsNeeded mode succeeds if enough rolls succeeded', () => {
    // 4 + 1 = 5
    Math.random = () => 0.5;
    const skillCheck = cloneDeep(skillChecksConfigMock.skillChecks.skill1);
    skillCheck.difficulty = 5;
    skillCheck.winsNeeded = 2;
    const result = resolveSkillCheck({
      id: 'test',
      ...skillCheck,
    });
    expect(result).toBe(true);
  });
  it('windsNeeded mode fails if not enough rolls succeeded, even if one of them succeeded', () => {
    // first roll will be 2, second will be 5
    let i = 0;
    Math.random = () => (i++ === 0 ? 0.1 : 0.5);
    const skillCheck = cloneDeep(skillChecksConfigMock.skillChecks.skill1);
    skillCheck.difficulty = 5;
    skillCheck.winsNeeded = 2;
    const result = resolveSkillCheck({
      id: 'test',
      ...skillCheck,
    });
    expect(result).toBe(false);
  });
});
