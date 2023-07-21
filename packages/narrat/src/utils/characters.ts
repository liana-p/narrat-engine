import { charactersConfig } from '@/config';
import {
  CharacterConfig,
  DialogStyleConfig,
  VideoCharacterPose,
} from '@/config/characters-config';
import { error } from './error-handling';

export function getCharacterInfo(
  character: string,
): CharacterConfig | undefined {
  const characterInfo = charactersConfig().characters[character];
  if (!characterInfo) {
    error(`Character ${character} not found`);
  }
  return characterInfo;
}

export function getCharacterPoseData(
  character: string,
  pose?: string,
): string | undefined | VideoCharacterPose {
  const info = getCharacterInfo(character);
  if (!info) {
    return undefined;
  }
  if (!pose) {
    pose = 'default';
  }
  if (info.sprites) {
    const data = info.sprites[pose];
    return data;
  }
}

export function getCharacterPicUrl(url: string) {
  return `${charactersConfig().config.imagesPath}${url}`;
}

export function isImagePose(
  pose: string | VideoCharacterPose | undefined,
): pose is string {
  return typeof pose === 'string' && pose !== 'none';
}
export function isVideoPose(
  pose: string | VideoCharacterPose | undefined,
): pose is VideoCharacterPose {
  return typeof pose === 'object' && Object.hasOwn(pose, 'video');
}

export function getCharacterStyle(character?: string): DialogStyleConfig {
  if (!character) {
    return {};
  }
  return getCharacterInfo(character)?.style || {};
}
