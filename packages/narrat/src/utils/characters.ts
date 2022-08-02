import { CharacterData, CharactersConfigFile, DialogStyle } from '@/types/character-types';
let config: CharactersConfigFile;

export function setCharactersConfig(data: CharactersConfigFile) {
  config = data;
}

export function getCharacterInfo(character: string): CharacterData {
  return config.characters[character];
}

export function getCharacterPictureUrl(character: string, pose?: string): string | undefined {
  const info = getCharacterInfo(character);
  if (!pose) {
    pose = 'default';
  }
  if (info.sprites) {
    return `${config.config.imagesPath}${info.sprites[pose]}`;
  }
}

export function getCharacterStyle(character?: string): DialogStyle {
  if (!character) {
    return {};
  }
  return getCharacterInfo(character).style || {};
}