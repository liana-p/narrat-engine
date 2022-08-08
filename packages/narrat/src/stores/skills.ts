import { deepCopy } from '@/utils/data-helpers';
import { error } from '@/utils/error-handling';
import deepmerge from 'deepmerge';
import { defineStore } from 'pinia';
import { SkillData, getConfig } from '../config';
import { useNotifications } from './notification-store';

export interface SkillState {
  id: string;
  level: number;
  xp: number;
}

export interface SkillsState {
  [key: string]: SkillState;
}

export interface SkillCheckState {
  happened: boolean;
  succeeded: boolean;
  hidden: boolean;
}

export interface Skills {
  skillChecks: {
    [key: string]: SkillCheckState;
  };
  skills: SkillsState;
}

export type SkillsSave = Skills;
// Create a pinia store named skills with a state using the type Skills, with actions:
// setupSkillCheck(skillCheck: SkillCheckState, id: string)
// passSkillCheck(skillCheckId: string)
// failSkillCheck(skillCheckId: string)
// generateSaveData(): Function that generates a Skills object from the data in the state
// loadSaveData(data: Skills): Function that loads the data into the state
// setupSkills(skills: { [key: string]: SkillData})
// addXp(skill: string, xp: number): Adds xp to a skill, increases skill level if it reaches the max xp defined in the skillOptions.xpPerLevel key of the config
// incrementSkill(skill: string, amount: number): Increments the level of a skill by amount
export const useSkills = defineStore('skills', {
  state: () =>
    ({
      skillChecks: {},
      skills: {},
    } as Skills),
  actions: {
    setupSkillCheck(skillCheck: SkillCheckState, id: string) {
      this.skillChecks[id] = skillCheck;
    },
    passSkillCheck(skillCheckId: string, hide?: boolean) {
      this.skillChecks[skillCheckId].happened = true;
      this.skillChecks[skillCheckId].succeeded = true;
      if (hide) {
        this.skillChecks[skillCheckId].hidden = true;
      }
    },
    failSkillCheck(skillCheckId: string, hide?: boolean) {
      this.skillChecks[skillCheckId].happened = true;
      this.skillChecks[skillCheckId].succeeded = false;
      if (hide) {
        this.skillChecks[skillCheckId].hidden = true;
      }
    },
    generateSaveData(): SkillsSave {
      return {
        skillChecks: deepCopy(this.skillChecks),
        skills: deepCopy(this.skills),
      };
    },
    getSkillCheck(id: string): SkillCheckState {
      if (!this.skillChecks[id]) {
        this.setupSkillCheck(this.createSkillCheckState(), id);
      }
      return this.skillChecks[id];
    },
    createSkillCheckState(): SkillCheckState {
      const skillCheck = {
        happened: false,
        succeeded: false,
        hidden: false,
      };
      return skillCheck;
    },

    loadSaveData(data: SkillsSave) {
      this.skillChecks = deepmerge(this.skillChecks, data.skillChecks);
      this.skills = deepmerge(this.skills, data.skills);
    },
    setupSkills(skills: { [key: string]: SkillData }) {
      // Adds each skill in the skills object to the skills state. Add default values for startingLevel and xp of 0 if those keys are missing.
      for (const skill in skills) {
        this.skills[skill] = {
          id: skill,
          level: skills[skill].startingLevel || 0,
          xp: 0,
        };
      }
    },
    getSkill(skill: string): SkillState {
      return this.skills[skill];
    },
    getSkillLevel(skill: string): number {
      return this.getSkill(skill).level;
    },
    getSkillXp(skill: string): number {
      return this.getSkill(skill).xp;
    },
    addXp(skill: string, xp: number) {
      const skillData = this.getSkill(skill);
      if (!skillData) {
        error(`Skill ${skill} doesn't exist`);
      }
      skillData.xp += xp;
      if (skillData.xp >= getConfig().skillOptions.xpPerLevel) {
        skillData.xp = 0;
        skillData.level++;
        this.levelledUp(skill);
      }
    },
    setSkillLevel(skill: string, level: number) {
      const skillData = this.getSkill(skill);
      if (!skillData) {
        error(`Skill ${skill} doesn't exist`);
      }
      skillData.level = level;
      this.levelledUp(skill);
    },
    incrementSkill(skill: string, amount: number) {
      this.getSkill(skill).level += amount;
      this.levelledUp(skill);
    },
    levelledUp(skill: string) {
      const skillName = getConfig().skills[skill].name;
      const skillLevel = this.skills[skill].level;
      if (getConfig().skillOptions.notifyLevelUp) {
        useNotifications().addNotification(
          `Your skill in ${skillName} is now level ${skillLevel}`,
        );
      }
    },
  },
});
