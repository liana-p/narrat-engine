import EngineSplash from '@/components/engine-splash/engine-splash.vue';
import GameSplash from '@/components/game-splash/game-splash.vue';
import StartMenu from '@/components/StartMenu.vue';
import InGame from '@/components/in-game.vue';
import ChapterTitle from '@/components/scenes/chapter-title.vue';
import { shallowRef } from 'vue';
import { SceneConfig, SceneKey } from './scene-types';

export enum BuiltInScene {
  EngineSplash = 'engine-splash',
  GameSplash = 'game-splash',
  StartMenu = 'start-menu',
  Playing = 'playing',
  ChapterTitle = 'chapter-title',
}

export const defaultScenes = {
  [BuiltInScene.EngineSplash]: {
    id: BuiltInScene.EngineSplash,
    component: shallowRef(EngineSplash),
    props: {},
  },
  [BuiltInScene.GameSplash]: {
    id: BuiltInScene.GameSplash,
    component: shallowRef(GameSplash),
    props: {},
  },
  [BuiltInScene.StartMenu]: {
    id: BuiltInScene.StartMenu,
    component: shallowRef(StartMenu),
    props: {},
  },
  [BuiltInScene.Playing]: {
    id: BuiltInScene.Playing,
    component: shallowRef(InGame),
    props: {},
  },
  [BuiltInScene.ChapterTitle]: {
    id: BuiltInScene.ChapterTitle,
    component: shallowRef(ChapterTitle),
    props: {},
  },
} as Record<SceneKey, SceneConfig>;
