import { charactersConfig } from '@/config';
import { CharacterConfig, DialogStyleConfig } from '@/config/characters-config';

export function getCharacterInfo(character: string): CharacterConfig {
  return charactersConfig().characters[character];
}

export function getCharacterPictureUrl(
  character: string,
  pose?: string,
): string | undefined {
  const info = getCharacterInfo(character);
  if (!pose) {
    pose = 'default';
  }
  if (info.sprites) {
    return `${charactersConfig().config.imagesPath}${info.sprites[pose]}`;
  }
}

export function getCharacterStyle(character?: string): DialogStyleConfig {
  if (!character) {
    return {};
  }
  return getCharacterInfo(character).style || {};
}
