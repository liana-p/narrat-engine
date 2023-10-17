import {
  AnimationsConfig,
  CSSAnimationKeyframes,
  CSSAnimationOptions,
  NarratAnimation,
  NarratAnimationInput,
} from '@/config/animations-config';
import { error } from './error-handling';
import { animationsConfig } from '@/config';

export const defaultAnimations: AnimationsConfig = {
  keyframes: {
    'narrat-screenshake': [
      { transform: 'translateX(0)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' },
    ],
  },
  animations: {
    'narrat-screenshake': {
      keyframes: 'narrat-screenshake',
      options: {
        duration: 150,
        iterations: 3,
      },
    },
  },
};

export function getElementOrQuery(elementOrQuery: string | HTMLElement) {
  const element =
    typeof elementOrQuery === 'string'
      ? document.querySelector(elementOrQuery)
      : elementOrQuery;
  return element;
}

export function getAnimationKeyframes(
  animation: string | CSSAnimationKeyframes,
): CSSAnimationKeyframes {
  if (typeof animation === 'string') {
    const config = animationsConfig();
    if (config.keyframes[animation]) {
      animation = config.keyframes[animation];
    } else if (defaultAnimations.keyframes[animation]) {
      animation = defaultAnimations.keyframes[animation];
    } else {
      error(`[Animation] Animation not found: ${animation}`);
      animation = defaultAnimations.keyframes['narrat-screenshake'];
    }
  }
  return animation as CSSAnimationKeyframes;
}

export function getNarratAnimation(
  animationInput: string | NarratAnimationInput,
): NarratAnimation {
  let animation: NarratAnimationInput;
  if (typeof animationInput === 'string') {
    const config = animationsConfig();
    if (config.animations[animationInput]) {
      animation = config.animations[animationInput];
    } else if (defaultAnimations.animations[animationInput]) {
      animation = defaultAnimations.animations[animationInput];
    } else {
      error(`[Animation] Animation not found: ${animationInput}`);
      animation = defaultAnimations.animations['narrat-screenshake'];
    }
  } else {
    animation = animationInput;
  }
  return animationInputToAnimation(animation);
}

export function animationInputToAnimation(
  animation: NarratAnimationInput,
): NarratAnimation {
  return {
    keyframes: [...getAnimationKeyframes(animation.keyframes)],
    options: { ...animation.options },
  };
}

export async function animate(
  elementOrQuery: string | HTMLElement,
  animationInput: string,
  extraOptions?: string | CSSAnimationOptions,
) {
  return new Promise((resolve) => {
    const element = getElementOrQuery(elementOrQuery)!;
    if (!element) {
      error(`[Animation] Element not found: ${elementOrQuery}`);
      resolve({});
    }
    const animationInfo = getNarratAnimation(animationInput);
    if (extraOptions) {
      Object.assign(animationInfo.options as any, extraOptions);
    }
    const animation = element.animate(
      animationInfo.keyframes,
      animationInfo.options as any,
    );
    animation.addEventListener('finish', resolve);
  });
}

export async function screenshake(elementOrQuery: string | HTMLElement) {
  return animate(elementOrQuery, 'narrat-screenshake');
}
