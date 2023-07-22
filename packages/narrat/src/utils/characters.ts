import { charactersConfig } from '@/config';
import {
  CharacterConfig,
  DialogStyleConfig,
  ImageCharacterPose,
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
): ImageCharacterPose | undefined | VideoCharacterPose {
  const info = getCharacterInfo(character);
  if (!info) {
    return undefined;
  }
  if (!pose) {
    pose = 'default';
  }
  if (info.sprites) {
    const data = info.sprites[pose];
    if (data === 'none') {
      return undefined;
    }
    if (typeof data === 'string') {
      return {
        image: data,
      };
    }
    return data;
  }
}

export function getCharacterPicUrl(url: string) {
  return `${charactersConfig().config.imagesPath}${url}`;
}

export function isImagePose(
  pose: ImageCharacterPose | VideoCharacterPose | undefined,
): pose is ImageCharacterPose {
  return typeof pose === 'object' && Object.hasOwn(pose, 'image');
}
export function isVideoPose(
  pose: ImageCharacterPose | VideoCharacterPose | undefined,
): pose is VideoCharacterPose {
  return typeof pose === 'object' && Object.hasOwn(pose, 'video');
}

export function getCharacterStyle(character?: string): DialogStyleConfig {
  if (!character) {
    return {};
  }
  return getCharacterInfo(character)?.style || {};
}
