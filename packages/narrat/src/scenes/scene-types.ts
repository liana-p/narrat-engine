import { Component } from 'vue';

export interface SceneConfig {
  id: string;
  component: Component;
  props: Record<string, any>;
  labelOnStart?: string;
  labelOnEnd?: string;
  // When the scene is about to be displayed
  onStarting?: () => void;
  // When the scene is about to be removed
  onLeaving?: () => void;
  // When the scene informs it has finished via the @finished emitter
  onFinished?: () => void;
}
