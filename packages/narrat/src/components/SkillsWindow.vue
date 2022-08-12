<template>
  <modal class="menu" @close="$emit('close')" containerCssClass="skills-modal">
    <template v-slot:header>
      <h3 class="title">Skills</h3>
    </template>
    <template v-slot:body>
      <div class="skills-container" v-if="!chosenSkill">
        <button
          @click="() => clickSkill(skill.id)"
          class="skill-display"
          :style="getSkillStyle(skill.id)"
          v-for="skill in skillsToDisplay"
          :key="skill.id"
        >
          <h3 class="skill-title">{{ getSkillName(skill.id) }}</h3>
          <div class="skill-xp-container">
            <div class="skill-xp-bar" :style="xpBarWidth(skill.xp)"></div>
            <h3 class="skill-xp-text">{{ skill.xp }} / {{ xpPerLevel }} XP</h3>
          </div>
          <h3 class="skill-level">{{ skill.level }}</h3>
        </button>
      </div>
      <div v-else-if="typeof chosenSkill === 'string'">
        <div class="flex flex-row skill-description-container">
          <div class="flex skill-left">
            <div
              class="skill-display"
              :style="getSkillStyle(chosenSkill)"
            ></div>
          </div>
          <div class="flex skill-right">
            <h2>{{ getSkillName(chosenSkill) }}</h2>
            <hr class="hr-solid" />
            <h3>Level: {{ skills[chosenSkill].level }}</h3>
            <p>{{ skillConf[chosenSkill].description }}</p>
          </div>
        </div>
        <button class="button" @click="closeSkill">{{ '<--' }}</button>
      </div>
    </template>
  </modal>
</template>

<script lang="ts">
import { getAssetUrl, getConfig, SkillData } from '@/config';
import { SkillsState, useSkills } from '@/stores/skills';
import { computed, defineComponent } from 'vue';
import Modal from './utils/modal-window.vue';

export default defineComponent({
  setup() {
    const store = useSkills();
    const skills = computed(() => store.skills);
    return { skills };
  },
  components: {
    Modal,
  },
  data() {
    return {
      chosenSkill: false as String | boolean,
    };
  },
  mounted() {},
  methods: {
    getSkillStyle(skill: string): any {
      return {
        backgroundImage: `url(${getAssetUrl(this.skillConf[skill].icon)})`,
      };
    },
    getSkillName(skill: string): string {
      return this.skillConf[skill].name;
    },
    clickSkill(skill: string) {
      this.chosenSkill = skill;
    },
    closeSkill() {
      this.chosenSkill = false;
    },
    xpBarWidth(xp: number) {
      return {
        width: `${Math.floor((xp / this.xpPerLevel) * 100)}%`,
      };
    },
  },
  computed: {
    skillsToDisplay(): SkillsState {
      const skills: SkillsState = {};
      for (const skill in this.skills) {
        const conf = this.skillConf[skill];
        if (conf.hidden && this.skills[skill].level < 1) {
          continue;
        }
        skills[skill] = this.skills[skill];
      }
      return skills;
    },
    skillConf(): { [key: string]: SkillData } {
      return getConfig().skills;
    },
    xpPerLevel(): number {
      return getConfig().skillOptions.xpPerLevel;
    },
  },
});
</script>

<style>
.skills-modal {
  width: 800px;
}
.skills-container {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 20px;
}

.skill-display {
  width: 200px;
  height: 300px;
  position: relative;
  background-size: cover;
}

.skill-title {
  position: absolute;
  bottom: 0px;
  text-align: center;
  width: 100%;
  color: var(--skills-text-color);
  background: var(--skills-text-background);
}

.skill-level {
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--skills-level-color);
  width: var(--skills-xp-bar-height);
  height: var(--skills-xp-bar-height);
  background-color: var(--skills-level-background);
}

.skill-description-container {
  justify-content: space-between;
  align-items: stretch;
}

.skill-left {
  flex-direction: column;
  border: 1px dashed white;
  padding: 10px;
  justify-content: center;
}

.skill-right {
  border: 1px dashed white;
  flex-direction: column;
  align-items: baseline;
  flex-grow: 2;
  align-items: baseline;
}

.skill-xp-container {
  position: absolute;
  top: 0;
  left: 0;
  height: var(--skills-xp-bar-height);
  width: calc(100% - var(--skills-xp-bar-height));
  background-color: rgba(0, 0, 0, 0.5);
}

.skill-xp-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 250, 0.5);
}

.skill-xp-text {
  z-index: 2;
}
</style>
