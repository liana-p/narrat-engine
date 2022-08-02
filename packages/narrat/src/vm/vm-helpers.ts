import { AddDialogParams, useDialogStore } from '@/stores/dialog-store';
import { SkillCheckState, useSkills } from '@/stores/skills';
import { Parser } from '@/types/parser';
import { logger } from '@/utils/logger';
import {
  getPassiveSkillCheckText,
  resolveSkillCheck,
} from '@/utils/skillchecks';
import { IfOptions, IfStaticOptions } from './commands/if';

export interface SkillCheckParams {
  skill: string;
  value: number;
  id: string;
  hideAfterRoll?: boolean;
}

export function runSkillCheck(params: SkillCheckParams): SkillCheckState {
  const skillStore = useSkills();
  const result = skillStore.getSkillCheck(params.id);
  if (result && result.happened) {
    return result;
  }
  const success = resolveSkillCheck(params);
  writeText(getPassiveSkillCheckText(success, params));
  if (success) {
    skillStore.passSkillCheck(params.id, params.hideAfterRoll);
  } else {
    skillStore.failSkillCheck(params.id, params.hideAfterRoll);
  }
  return skillStore.getSkillCheck(params.id);
}

export function runConditionCommand(
  command: Parser.Command<IfOptions, IfStaticOptions>,
): Parser.Branch | undefined {
  const options = command.options;
  const staticOptions = command.staticOptions;
  const result = !!options.condition;
  logger.log(result);
  if (result) {
    return staticOptions.success;
  }
  if (!result && staticOptions.failure) {
    return staticOptions.failure;
  }
  return undefined;
}

export function isExpression(arg: Parser.Arg): arg is Parser.ParsedExpression {
  return typeof arg === 'object';
}

export type Variable = string | number | boolean | undefined | null;
export function isVariable(arg: Parser.Arg): arg is Variable {
  if (typeof arg === 'string' && arg.search(/\$/) === 0) {
    return true;
  }
  return false;
}

export function writeText(text: string) {
  const dialog: AddDialogParams = {
    speaker: 'game',
    text,
    interactive: false,
  };
  const dialogStore = useDialogStore();
  dialogStore.addDialog(dialog);
}

export async function textCommand(dialog: AddDialogParams) {
  const dialogStore = useDialogStore();
  dialogStore.addDialog(dialog);
}

export function getLine(lines: Parser.Line[], index: number) {
  if (index < lines.length) return lines[index];
}
