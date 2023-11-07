import { SkillsConfig } from '@/config/skills-config';
import { deepCopy } from '@/utils/data-helpers';
import { error } from '@/utils/error-handling';
import deepmerge from 'deepmerge';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { getCommonConfig, skillsConfig } from '../config';
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

export const useSkills = defineStore('skills', {
  state: () =>
    ({
      skillChecks: {},
      skills: {},
    }) as Skills,
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
    resetSkillCheck(skillCheckId: string) {
      this.skillChecks[skillCheckId].happened = false;
      this.skillChecks[skillCheckId].succeeded = false;
      this.skillChecks[skillCheckId].hidden = false;
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
    updateConfig(skillsConfig: SkillsConfig) {
      const skills = skillsConfig.skills;
      // Adds each skill in the skills object to the skills state. Add default values for startingLevel and xp of 0 if those keys are missing.
      for (const skill in skills) {
        if (!this.skills[skill]) {
          this.skills[skill] = {
            id: skill,
            level: skills[skill].startingLevel || 0,
            xp: 0,
          };
        }
      }
    },
    reset(skillsConfig: SkillsConfig) {
      this.$reset();
      this.updateConfig(skillsConfig);
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
      if (skillData.xp >= skillsConfig().skillOptions.xpPerLevel) {
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
      const skillName = skillsConfig().skills[skill].name;
      const skillLevel = this.skills[skill].level;
      if (skillsConfig().skillOptions.notifyLevelUp) {
        useNotifications().addNotification(
          `Your skill in ${skillName} is now level ${skillLevel}`,
        );
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSkills, import.meta.hot));
}
