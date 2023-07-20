import { Config } from '@/config/config-output';
import { getAssetUrl } from '../config';
import { error } from './error-handling';
import { logger } from './logger';

export const images: {
  [key: string]: HTMLImageElement | Promise<HTMLImageElement>;
} = {};

export async function getImage(path: string): Promise<HTMLImageElement> {
  if (images[path]) {
    return images[path];
  }
  return downloadImage(path, path);
}

export async function loadImages(config: Config): Promise<HTMLImageElement[]> {
  logger.log(`Loading images`);
  let loadedCount = 0;
  let toLoadCount = 0;
  const allImages: Array<Promise<HTMLImageElement>> = [];
  const loadImage = async (key: string, path: string) => {
    toLoadCount++;
    const image = await downloadImage(key, path);
    loadedCount++;
    console.log(`Loaded ${loadedCount} / ${toLoadCount} images`);
    return image;
  };
  const addImage = (key: string, path: string) => {
    allImages.push(loadImage(key, path));
  };
  for (const key in config.images) {
    const path = config.images[key];
    addImage(key, path);
  }
  // Find other images to load from config
  for (const key in config.screens.screens) {
    const screen = config.screens.screens[key];
    if (
      screen.background &&
      !config.images[screen.background] &&
      !screen.video
    ) {
      addImage(screen.background, screen.background);
    }
    if (screen.buttons) {
      for (const buttonKey in screen.buttons) {
        const button = screen.buttons[buttonKey];
        if (typeof button === 'object') {
          if (button.background && !config.images[button.background]) {
            addImage(button.background, button.background);
          }
        }
      }
    }
  }
  return Promise.all(allImages);
}

export async function downloadImage(key: string, path: string) {
  if (images[key]) {
    return images[key];
  }
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    logger.log(`Loading image ${key} at ${path}`);
    const image = new Image();
    image.onload = () => {
      images[key] = image;
      logger.log(`Loaded image ${key} successfully`);
      resolve(image);
    };
    image.onerror = (e) => {
      error(`Failed to load image ${key} at ${path}`, e);
      reject(e);
    };
    image.src = getAssetUrl(path);
  });
  images[key] = promise;
  return promise;
}
