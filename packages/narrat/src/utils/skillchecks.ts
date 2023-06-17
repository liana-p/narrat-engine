import { getSkillConfig, skillChecksConfig, skillsConfig } from '@/config';
import { SkillCheckParams } from '@/vm/vm-helpers';
import { logger } from './logger';
import { useSkills } from '@/stores/skills';
import { audioEvent } from './audio-loader';
import { SkillCheckOptionsConfig } from '@/config/skillchecks-config';

export type Roll = {
  unmodified: number;
  modified: number;
};
export type DiceRoll = Roll[];

export function getSkillCheckDifficultyScore(value: number, level: number) {
  return value - level * skillChecksConfig().options.extraPointsPerLevel;
}

export function getSkillCheckDifficultyText(value: number, level: number) {
  const { options } = skillChecksConfig();
  let difficultyScore = value;
  if (!options.showDifficultyWithoutModifiers) {
    difficultyScore = getSkillCheckDifficultyScore(value, level);
  }
  const checks = skillChecksConfig().options;
  let found = false;
  let i = 0;
  let checkText = checks.difficultyText[0][1];
  while (!found) {
    if (checks.difficultyText.length > i) {
      if (difficultyScore >= checks.difficultyText[i][0]) {
        checkText = checks.difficultyText[i][1];
      } else {
        found = true;
      }
    } else {
      found = true;
    }
    i++;
  }
  let finalText = '';
  if (options.showDifficultyText && options.showDifficultyNumber) {
    finalText = `${checkText} (${difficultyScore})`;
  } else if (options.showDifficultyText) {
    finalText = checkText;
  } else if (options.showDifficultyNumber) {
    finalText = difficultyScore.toString();
  }
  return finalText;
}

export function getSkillCheckText({
  skill,
  skillCheckId,
  value,
}: {
  skill: string;
  skillCheckId: string;
  value: number;
}): { difficultyText: string; allowed: boolean } {
  const skillStore = useSkills();
  const skillCheckState = skillStore.getSkillCheck(skillCheckId);
  const skillConfig = getSkillConfig(skill);
  const level = skillStore.skills[skill].level;
  const difficultyText = getSkillCheckDifficultyText(value, level);
  let allowed = true;
  let text = `<span class='skill-check'>[<span class='skill-check-name'>${skillConfig.name}</span> - `;
  if (!skillCheckState.happened) {
    text += ` <span class='skill-check-difficulty'>${difficultyText}</span>]</span>`;
  } else if (skillCheckState.succeeded) {
    text = '';
  } else {
    allowed = false;
    text += ` <span class='skill-check-difficulty'>${difficultyText}</span> - <span class='skill-check-failed'>FAILED</span>]</span>`;
  }
  return {
    difficultyText: text,
    allowed,
  };
}

export function getPassiveSkillCheckText(
  success: boolean,
  params: SkillCheckParams,
) {
  const skillStore = useSkills();
  const skillConf = getSkillConfig(params.skill);
  const difficultyText = getSkillCheckDifficultyText(
    params.difficulty,
    skillStore.skills[params.skill].level,
  );
  return `<span class='passive-skill-check skill-check'>[<span class='skill-check-name'>${
    skillConf.name
  }</span> - <span class='skill-check-difficulty'>${difficultyText}</span> - ${
    success
      ? '<span class="skill-check-success">Success</span>'
      : '<span class="skill-check-failed">Failure</span>'
  }]</span>`;
}

export function calculateSkillCheckRoll(skill: string) {
  const { options } = skillChecksConfig();
  const rolls = rollAllDice(options, skill);
  const skillStore = useSkills();
  const skillData = skillStore.skills[skill];
  const rollModifier = skillData.level * options.extraPointsPerLevel;
  // Add all the dice together, and add the modifier at the end
  let finalRoll = rolls.reduce(
    (acc, roll) => acc + roll.unmodified,
    rollModifier,
  );
  // Optional mode where we only keep the highest or lowest roll
  if (options.finalRollIsHighest) {
    finalRoll = rolls.reduce((acc, roll) => {
      if (roll.modified > acc) {
        return roll.modified;
      }
      return acc;
    }, 0);
    logger.log(`[SKILL CHECK] Keeping only highest roll: ${finalRoll}`);
  } else if (options.finalRollIsLowest) {
    finalRoll = rolls.reduce((acc, roll) => {
      if (roll.modified < acc) {
        return roll.modified;
      }
      return acc;
    }, rolls[0].modified);
    logger.log(`[SKILL CHECK] Keeping only lowest roll: ${finalRoll}`);
  }
  return {
    roll: finalRoll,
    rolls,
  };
}

export function rollAllDice(
  options: SkillCheckOptionsConfig,
  skill: string,
): DiceRoll {
  const skillStore = useSkills();
  const skillData = skillStore.skills[skill];
  const rollModifier = skillData.level * options.extraPointsPerLevel;
  let { diceRange, diceCount } = options;
  if (options.extraDicePerLevel) {
    diceCount += options.extraDicePerLevel * skillData.level;
  }
  const rolls = [];
  for (let i = 0; i < diceCount; i++) {
    const unmodifiedRoll = rollDice(diceRange);
    const roll = unmodifiedRoll + rollModifier;
    logger.log(
      `[SKILL CHECK] Roll ${
        i + 1
      }/${diceCount}: ${roll}. (Base roll: ${unmodifiedRoll}, modifier: ${rollModifier} - Skill level: ${
        skillData.level
      })`,
    );
    rolls.push({
      unmodified: unmodifiedRoll,
      modified: roll,
    });
  }
  return rolls;
}

export function rollDice(diceRange: [number, number]) {
  return Math.floor(Math.random() * diceRange[1]) + diceRange[0];
}

export function resolveSkillCheck(params: SkillCheckParams): boolean {
  const { skills } = skillsConfig();
  const { roll, rolls } = calculateSkillCheckRoll(params.skill);
  // TODO: Replace this with unlucky rolls
  // if (roll <= options.failureChance - 1) {
  //   success = false;
  // }
  const skill = skills[params.skill];
  let success = false;
  if (typeof params.winsNeeded === 'number') {
    const successes = rolls.reduce((acc, roll) => {
      if (checkIfRollSucceeded(roll.modified, params.difficulty)) {
        acc++;
      }
      return acc;
    }, 0);
    if (successes >= params.winsNeeded) {
      success = true;
    }
    logger.log(
      `[SKILL CHECK ${skill.name}] - Dice pool mode. ${
        params.winsNeeded
      } wins needed. Got ${successes} successes.
      (${params.id} - ${successes}/${
        params.winsNeeded
      } - rolls: ${JSON.stringify(rolls.map((r) => r.modified))})`,
    );
  } else {
    success = checkIfRollSucceeded(roll, params.difficulty);
    logger.log(
      `[SKILL CHECK ${skill.name}]: ${success ? '✅' : '❌'}`,
      `(${params.id}) - ${roll}/${params.difficulty}`,
    );
  }
  success
    ? audioEvent('onSkillCheckSuccess')
    : audioEvent('onSkillCheckFailure');
  return success;
}

export function checkIfRollSucceeded(roll: number, value: number) {
  const { options } = skillChecksConfig();
  let success = roll >= value;
  if (options.successOnRollsBelowThreshold) {
    success = roll <= value;
  }
  if (options.failOnRollsEqualToThreshold && roll === value) {
    success = false;
  }
  return success;
}
