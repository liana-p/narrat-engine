import { audioConfig } from '@/config';
import { useAudio } from '@/lib';
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

export function getLetterAudioConfig(
  speakingCharacter: string,
  letter: string,
) {
  if (typeof letter !== 'string') {
    return;
  }
  const conf = getDialogAudioConfigForCharacter(speakingCharacter);
  return conf?.soundPerLetter;
}
export function getLetterAudio(speakingCharacter: string, letter: string) {
  if (typeof letter !== 'string') {
    return;
  }
  const conf = getLetterAudioConfig(speakingCharacter, letter);
  if (!conf) {
    return;
  }
  const soundForLetter = conf;
  let soundToPlay = '';
  if (soundForLetter.prefix) {
    soundToPlay += soundForLetter.prefix;
  }
  soundToPlay += letter;
  if (soundForLetter.suffix) {
    soundToPlay += soundForLetter.suffix;
  }
  return soundToPlay;
}

export function playLetterAudio(speakingCharacter: string, baseLetter: string) {
  if (typeof baseLetter !== 'string') {
    return;
  }
  const letter = baseLetter.toLowerCase();
  const soundToPlay = getLetterAudio(speakingCharacter, letter);
  if (typeof soundToPlay !== 'string') {
    return;
  }
  const audio = getAudio(soundToPlay);
  if (audio) {
    const conf = getLetterAudioConfig(speakingCharacter, letter)!;
    let volume = 1;
    if (conf.volume) {
      volume = conf.volume;
    }
    const finalVolume = useAudio().audioVolume('sound', soundToPlay) * volume;
    audio.volume(finalVolume);
    audio.play();
  }
}

export function playDialogLineAudio(speakingCharacter: string) {
  const conf = getDialogAudioConfigForCharacter(speakingCharacter);
  if (conf?.soundOnNewLine) {
    const audio = getAudio(conf.soundOnNewLine);
    if (audio) {
      const volume = useAudio().audioVolume('sound', conf.soundOnNewLine);
      audio.volume(volume);
      audio.play();
    }
  }
}
