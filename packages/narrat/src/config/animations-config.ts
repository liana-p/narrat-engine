import { Static, Type } from '@sinclair/typebox';

export const CSSAnimationOptionsSchema = Type.Object({
  delay: Type.Optional(Type.Number()),
  direction: Type.Optional(Type.String()),
  duration: Type.Optional(Type.Number()),
  easing: Type.Optional(Type.String()),
  endDelay: Type.Optional(Type.Number()),
  fill: Type.Optional(Type.String()),
  iterationStart: Type.Optional(Type.Number()),
  iterations: Type.Optional(Type.Number()),
  keyframes: Type.Optional(Type.Any()),
});
export type CSSAnimationOptions = Static<typeof CSSAnimationOptionsSchema>;

export const CSSAnimationKeyframesSchema = Type.Array(Type.Any());
export type CSSAnimationKeyframes = Static<typeof CSSAnimationKeyframesSchema>;

export const NarratAnimationInputSchema = Type.Object({
  keyframes: Type.Union([Type.String(), CSSAnimationKeyframesSchema]),
  options: Type.Optional(CSSAnimationOptionsSchema),
});
export type NarratAnimationInput = Static<typeof NarratAnimationInputSchema>;

export const NarratAnimationSchema = Type.Object({
  keyframes: CSSAnimationKeyframesSchema,
  options: Type.Optional(CSSAnimationOptionsSchema),
});
export type NarratAnimation = Static<typeof NarratAnimationSchema>;

export const AnimationsConfigSchema = Type.Object({
  animations: Type.Record(Type.String(), NarratAnimationInputSchema),
  keyframes: Type.Record(Type.String(), CSSAnimationKeyframesSchema),
});
export type AnimationsConfig = Static<typeof AnimationsConfigSchema>;

export const defaultAnimationsConfig: AnimationsConfig = {
  animations: {},
  keyframes: {},
};
