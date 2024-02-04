import EngineSplash from '@/components/engine-splash/engine-splash.vue';
import GameSplash from '@/components/game-splash/game-splash.vue';
import StartMenu from '@/components/StartMenu.vue';
import InGame from '@/components/in-game.vue';
import ChapterTitle from '@/components/scenes/chapter-title.vue';
import { shallowRef } from 'vue';
import { SceneConfig, SceneKey } from './scene-types';

export const defaultScenes = {
  'engine-splash': {
    id: 'engine-splash',
    component: shallowRef(EngineSplash),
    props: {},
  },
  'game-splash': {
    id: 'game-splash',
    component: shallowRef(GameSplash),
    props: {},
  },
  'start-menu': {
    id: 'start-menu',
    component: shallowRef(StartMenu),
    props: {},
  },
  playing: {
    id: 'playing',
    component: shallowRef(InGame),
    props: {},
  },
  'chapter-title': {
    id: 'chapter-title',
    component: shallowRef(ChapterTitle),
    props: {},
  },
} as Record<SceneKey, SceneConfig>;
