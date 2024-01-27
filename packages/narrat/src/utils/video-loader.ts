import { Config } from '@/config/config-output';
import { getAssetUrl } from '../config';
import { error } from './error-handling';
import { logger } from './logger';

export const videos: {
  [key: string]: HTMLVideoElement | Promise<HTMLVideoElement>;
} = {};

export async function getVideo(path: string): Promise<HTMLVideoElement> {
  if (videos[path]) {
    return videos[path];
  }
  return downloadVideo(path, path);
}

export async function loadVideos(config: Config): Promise<HTMLVideoElement[]> {
  logger.log('Loading videos');
  let loadedCount = 0;
  let toLoadCount = 0;
  const allVideos: Array<Promise<HTMLVideoElement>> = [];
  const loadVideo = async (key: string, path: string) => {
    toLoadCount++;
    const video = await downloadVideo(key, path);
    loadedCount++;
    // console.log(`Loaded ${loadedCount} / ${toLoadCount} videos`);
    return video;
  };
  const addVideo = (key: string, path: string) => {
    allVideos.push(loadVideo(key, path));
  };
  if (config.preload.video) {
    for (const key in config.preload.video.assets) {
      const path = config.preload.video.assets[key];
      addVideo(key, path);
    }
  }
  return Promise.all(allVideos);
}

export async function downloadVideo(key: string, path: string) {
  if (videos[key]) {
    return videos[key];
  }
  const promise = new Promise<HTMLVideoElement>((resolve, reject) => {
    // Preload the video at path
    const video = document.createElement('video');
    video.onloadeddata = () => {
      resolve(video);
    };
    video.onerror = (e) => {
      error(`Could not load video ${path}`, e);
      reject(e);
    };
    video.src = getAssetUrl(path);
  });
  videos[key] = promise;
  return promise;
}
