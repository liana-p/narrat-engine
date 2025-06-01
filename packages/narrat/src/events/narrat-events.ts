import { TypedEmitter } from '@/utils/typed-emitter';

export interface NarratEvents {
  achievementUnlocked: (achievementId: string) => void;
}

export class NarratEventsEmitter extends TypedEmitter<NarratEvents> {}

export const narratEventsEmitter = new NarratEventsEmitter();
