import { getAssetUrl, skillsConfig } from '@/config';
import { useSkills } from '@/stores/skills';
import { computed } from 'vue';

export function useSkillData(skill: string) {
  const skillsStore = useSkills();
  const skills = computed(() => skillsStore.skills);
  const skillState = computed(() => skills.value[skill]);
  const skillConfig = computed(() => {
    return skillsConfig().skills;
  });
  const xpPerLevel = computed(() => {
    return skillsConfig().skillOptions.xpPerLevel;
  });
  const skillStyle = computed(() => {
    return {
      backgroundImage: `url(${getAssetUrl(skillConfig.value[skill].icon)})`,
    };
  });
  const skillName = computed(() => {
    return skillConfig.value[skill].name;
  });
  const skillDescription = computed(() => {
    return skillConfig.value[skill].description;
  });
  const skillLevelText = computed(() => {
    return `Level ${skills.value[skill].level}`;
  });
  const level = computed(() => {
    return skills.value[skill].level;
  });

  return {
    skills,
    skillsStore,
    skillConfig,
    xpPerLevel,
    skillState,
    skillStyle,
    skillName,
    skillDescription,
    skillLevelText,
    level,
  };
}
