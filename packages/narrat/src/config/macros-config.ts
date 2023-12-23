import { Type, Static } from '@sinclair/typebox';

export const MacroArgumentSchema = Type.Object({
  name: Type.String(),
  type: Type.String(),
  optional: Type.Optional(Type.Boolean()),
});
export type MacroArgument = Static<typeof MacroArgumentSchema>;

export const MacroSchema = Type.Object({
  keyword: Type.String(),
  label: Type.String(),
  options: Type.Optional(Type.Array(MacroArgumentSchema)),
});
export type Macro = Static<typeof MacroSchema>;

export const MacrosConfigSchema = Type.Object({
  macros: Type.Array(MacroSchema),
});
export type MacrosConfig = Static<typeof MacrosConfigSchema>;
export const defaultMacrosConfig: MacrosConfig = {
  macros: [],
};
