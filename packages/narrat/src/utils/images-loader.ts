import { Config } from '@/config/config-output';
import { getAssetUrl } from '../config';
import { error } from './error-handling';
import { logger } from './logger';

export type VisualAsset = HTMLImageElement | HTMLVideoElement;
export const images: {
  [key: string]: VisualAsset | Promise<VisualAsset>;
} = {};

export async function getImage(path: string): Promise<HTMLImageElement> {
  if (images[path]) {
    return images[path] as HTMLImageElement;
  }
  return downloadImage(path, path) as Promise<HTMLImageElement>;
}

export async function loadImages(config: Config): Promise<HTMLImageElement[]> {
  logger.log(`Loading images`);
  let loadedCount = 0;
  let toLoadCount = 0;
  const allImages: Array<Promise<VisualAsset>> = [];
  const loadImage = async (key: string, path: string) => {
    toLoadCount++;
    const image = await downloadImage(key, path);
    loadedCount++;
    console.log(`Loaded ${loadedCount} / ${toLoadCount} images`);
    return image;
  };
  const loadVideo = async (key: string, path: string) => {
    toLoadCount++;
    const video = await downloadVideo(key, path);
    loadedCount++;
    console.log(`Loaded ${loadedCount} / ${toLoadCount} images`);
    return video;
  };
  const addImage = (key: string, path: string) => {
    allImages.push(loadImage(key, path));
  };
  const addVideo = (key: string, path: string) => {
    allImages.push(loadVideo(key, path));
  };
  for (const key in config.images) {
    const path = config.images[key];
    addImage(key, path);
  }
  // Find other images to load from config
  for (const key in config.screens.screens) {
    const screen = config.screens.screens[key];
    if (screen.background && !config.images[screen.background]) {
      if (!screen.video) {
        addImage(screen.background, screen.background);
      } else {
        addVideo(screen.background, screen.background);
      }
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
    return images[key] as HTMLImageElement;
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

export async function downloadVideo(key: string, path: string) {
  if (images[key]) {
    return images[key] as HTMLVideoElement;
  }
  const promise = new Promise<HTMLVideoElement>((resolve, reject) => {
    logger.log(`Loading video ${key} at ${path}`);
    const video = document.createElement('video');
    video.preload = 'auto';
    video.addEventListener('loadeddata', () => {
      images[key] = video;
      logger.log(`Loaded video ${key} successfully`);
      resolve(video);
    });
    video.onerror = (e) => {
      error(`Failed to load video ${key} at ${path}`, e);
      reject(e);
    };
    video.src = getAssetUrl(path);
  });
  images[key] = promise;
  return promise;
}
