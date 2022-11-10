import { charactersConfig } from '@/config';
import { CharacterConfig, DialogStyleConfig } from '@/config/characters-config';
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

export function getCharacterPictureUrl(
  character: string,
  pose?: string,
): string | undefined {
  const info = getCharacterInfo(character);
  if (!info) {
    return undefined;
  }
  if (!pose) {
    pose = 'default';
  }
  if (info.sprites) {
    const result = `${charactersConfig().config.imagesPath}${
      info.sprites[pose]
    }`;
    if (!result) {
      error(`Character ${character} pose ${pose} not found`);
    }
    return result;
  }
}

export function getCharacterStyle(character?: string): DialogStyleConfig {
  if (!character) {
    return {};
  }
  return getCharacterInfo(character)?.style || {};
}
