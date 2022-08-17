import { getConfig, getSkillConfig, skillsConfig } from '@/config';
import { SkillCheckParams } from '@/vm/vm-helpers';
import { logger } from './logger';
import { useSkills } from '@/stores/skills';
import { audioEvent } from './audio-loader';

export function getSkillCheckDifficultyScore(value: number, level: number) {
  return value - level * skillsConfig().skillChecks.skillMultiplier;
}

export function getSkillCheckDifficultyText(value: number, level: number) {
  const difficultyScore = getSkillCheckDifficultyScore(value, level);
  const checks = skillsConfig().skillChecks;
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
  return checkText;
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
    params.value,
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

export function calculateSkillCheckRoll(skill: string): {
  roll: number;
  unmodifiedRoll: number;
} {
  const { skillChecks } = skillsConfig();
  const skillStore = useSkills();
  const unmodifiedRoll = Math.floor(Math.random() * skillChecks.rollRange);
  const rollModifier =
    skillStore.skills[skill].level * skillChecks.skillMultiplier;
  const roll = unmodifiedRoll + rollModifier;
  logger.log(
    `[SKILL CHECK] Roll: ${roll}. (Base roll: ${unmodifiedRoll}, modifier: ${rollModifier} - Skill level: ${skillStore.skills[skill].level})`,
  );
  return {
    roll,
    unmodifiedRoll,
  };
}

export function resolveSkillCheck(params: SkillCheckParams): boolean {
  const { skills, skillChecks } = skillsConfig();
  let success = true;
  const { roll } = calculateSkillCheckRoll(params.skill);
  if (roll <= skillChecks.failureChance - 1) {
    success = false;
  }
  const skill = skills[params.skill];
  if (roll < params.value) {
    success = false;
  }
  logger.log(
    `[SKILL CHECK ${skill.name}]: ${success ? '✅' : '❌'}`,
    `(${params.id}) - ${roll}/${params.value}`,
  );
  success
    ? audioEvent('onSkillCheckSuccess')
    : audioEvent('onSkillCheckFailure');
  return success;
}
