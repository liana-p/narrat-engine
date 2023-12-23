import { audioConfig } from '@/config';
import { getAudio } from '@/utils/audio-loader';

export function dialogAudioConfig() {
  return audioConfig().dialogAudio;
}

export function getDialogAudioConfigForCharacter(character: string) {
  const conf = dialogAudioConfig();
  if (!conf) {
    return;
  }
  if (conf.characterAudio && conf.characterAudio[character]) {
    return conf.characterAudio[character];
  } else if (conf.defaultAudio) {
    return conf.defaultAudio;
  }
}

export function getLetterAudio(speakingCharacter: string, letter: string) {
  if (typeof letter !== 'string') {
    return;
  }
  const conf = getDialogAudioConfigForCharacter(speakingCharacter);
  if (!conf) {
    return;
  }
  if (conf.soundPerLetter && conf.soundPerLetter[letter]) {
    return conf.soundPerLetter[letter];
  }
}

export function playLetterAudio(speakingCharacter: string, baseLetter: string) {
  if (typeof baseLetter !== 'string') {
    return;
  }
  const letter = baseLetter.toLowerCase();
  const soundForLetter = getLetterAudio(speakingCharacter, letter);
  if (!soundForLetter) {
    return;
  }
  let soundToPlay = '';
  if (soundForLetter.prefix) {
    soundToPlay += soundForLetter.prefix;
  }
  soundToPlay += baseLetter;
  if (soundForLetter.suffix) {
    soundToPlay += soundForLetter.suffix;
  }
  const audio = getAudio(soundToPlay);
  if (audio) {
    audio.play();
  }
}

export function playDialogLineAudio(speakingCharacter: string) {
  const conf = getDialogAudioConfigForCharacter(speakingCharacter);
  if (conf?.soundOnNewLine) {
    const audio = getAudio(conf.soundOnNewLine);
    if (audio) {
      audio.play();
    }
  }
}
