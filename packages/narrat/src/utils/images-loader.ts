import { Config, getAssetUrl } from '../config';
import { error } from './error-handling';
import { logger } from './logger';

export const images: {
  [key: string]: HTMLImageElement;
} = {};
let imagesToLoad = 0;
let imagesLoaded = 0;

export function loadImages(config: Config): Promise<void> {
  logger.log(`Loading images`);
  return new Promise((resolve, reject) => {
    if (Object.keys(config.images).length < 1) {
      resolve();
      return;
    }
    for (const key in config.images) {
      const path = config.images[key];
      loadImage(key, path, resolve, reject);
    }
    // Find other images to load from config
    for (const key in config.screens) {
      const screen = config.screens[key];
      if (screen.background && !config.images[screen.background]) {
        loadImage(screen.background, screen.background, resolve, reject);
      }
      if (screen.buttons) {
        for (const buttonKey in screen.buttons) {
          const button = screen.buttons[buttonKey];
          if (typeof button === 'object') {
            if (button.background && !config.images[button.background]) {
              loadImage(button.background, button.background, resolve, reject);
            }
          }
        }
      }
    }
    for (const key in config.buttons) {
      const button = config.buttons[key];
      if (typeof button === 'object') {
        if (button.background && !config.images[button.background]) {
          loadImage(button.background, button.background, resolve, reject);
        }
      }
    }
  });
}

export function loadImage(
  key: string,
  path: string,
  resolver: any,
  rejecter: any,
) {
  if (images[key]) {
    return;
  }
  imagesToLoad++;
  logger.log(`Loading image ${key} at ${path}`);
  const image = new Image();
  image.onload = () => {
    imagesLoaded += 1;
    images[key] = image;
    logger.log(`Loaded image ${key} successfully`);
    if (imagesLoaded >= imagesToLoad) {
      logger.log(`All images loaded`);
      resolver();
    }
  };
  image.onerror = (e) => {
    error(`Failed to load image ${key} at ${path}`, e);
    rejecter(e);
  };
  image.src = getAssetUrl(path);
}
