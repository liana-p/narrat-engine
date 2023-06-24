/* eslint-disable no-case-declarations */
import { isExpression, isVariable } from '@/vm/vm-helpers';

import { error } from '@/utils/error-handling';
import { CommandPlugin } from './commands/command-plugin';
import {
  NarratPluginObject,
  NarratCustomStoreActions,
} from '@/exports/plugins';
import { Parser } from '@/types/parser';
import { DialogChoice } from '@/stores/dialog-store';
import { useVM } from '@/stores/vm-store';
import {
  findDataHelperWithoutAutoCreate,
  getModifiableDataPinia,
} from '@/utils/data-helpers';
import { processText, stringRegex } from '@/utils/string-helpers';
import { audioEvent } from '@/utils/audio-loader';
import { Pinia, Store } from 'pinia';
import { useSettings } from '@/stores/settings-store';
import { NarratScript } from '@/types/app-types';
import { ModuleNamespace } from 'vite/types/hot';
import { parseScript } from './vm-parser';

export class VM {
  plugins: NarratPluginObject<any>[] = [];
  pinia!: Pinia;
  script: Parser.ParsedScript = {};
  scripts: NarratScript[] = [];
  commands: {
    [key: string]: CommandPlugin<any>;
  } = {};

  addCommand(command: CommandPlugin<any, any>) {
    this.commands[command.keyword] = command;
  }

  addPlugin(plugin: NarratPluginObject<any>) {
    this.plugins.push(plugin);
    if (plugin.customCommands) {
      for (const command of plugin.customCommands) {
        this.addCommand(command);
      }
    }
  }

  callHook(hookName: string, ...args: any[]) {
    for (const plugin of this.plugins) {
      if (typeof (plugin as any)[hookName] === 'function') {
        (plugin as any)[hookName](...args);
      }
    }
  }

  addNarratScript(script: NarratScript) {
    const parsed = parseScript(script);
    this.script = { ...this.script, ...parsed };
    this.scripts.push(script);
  }

  customStores(): [string, Store<any, any, any, NarratCustomStoreActions>][] {
    const result: [string, Store<any, any, any, NarratCustomStoreActions>][] =
      [];
    for (const plugin of this.plugins) {
      if (plugin.customStores) {
        for (const key in plugin.customStores) {
          result.push([key, plugin.customStores[key](this.pinia)]);
        }
      }
    }
    return result;
  }

  addCustomSettings() {
    for (const plugin of this.plugins) {
      if (plugin.customSettings) {
        for (const key in plugin.customSettings) {
          useSettings().addCustomSetting(key, plugin.customSettings[key]);
        }
      }
    }
  }
}

export const vm = new VM();

export async function runCommand(
  expression: Parser.ParsedExpression,
  choices?: DialogChoice[],
) {
  const vmStore = useVM();
  try {
    const result = await runExpression(expression, choices);
    return result;
  } catch (err) {
    console.error(err);
    console.error(expression);
    error(
      `Narrat script runtime error at  <span class="error-filename">${
        expression.fileName
      }:${expression.line + 1}</span>
      <b>${err}</b>
      Script: ${expression.code}
      Label: ${vmStore.currentFrame?.label || 'none'}`,
    );
  }
}

export async function generateCommand(
  expr: Parser.ParsedExpression,
  choices?: DialogChoice[],
): Promise<Parser.Command> {
  const command = expr.command;
  const commandPlugin = vm.commands[command.commandType];
  if (commandPlugin) {
    const generatedCommand: Parser.Command = {
      args: [],
      options: {},
      operator: command.operator,
      staticOptions: command.staticOptions,
      code: expr.code,
      commandType: command.commandType,
      fileName: expr.fileName,
      line: expr.line,
    };
    // Evaluate arguments
    const argTypes = commandPlugin.argTypes;
    generatedCommand.options = {};
    for (const [i, arg] of command.args.entries()) {
      let finalArg: Parser.Primitive | any;
      if (isExpression(arg)) {
        // Arg is an expression, run it
        finalArg = await runExpression(arg, choices);
      } else if (typeof arg === 'string') {
        if (arg.search(stringRegex) === 0) {
          // This is an actual string
          finalArg = processText(arg.substring(3));
        } else if (isVariable(arg)) {
          // This is potentially a variable token
          const modifiable = getModifiableDataPinia();
          const result = findDataHelperWithoutAutoCreate<any>(modifiable, arg);
          if (result) {
            const [target, key] = result;
            finalArg = target[key];
          } else {
            finalArg = arg;
          }
        } else {
          finalArg = arg;
        }
      } else {
        finalArg = arg;
      }
      generatedCommand.args.push(finalArg);
      if (Array.isArray(argTypes) && argTypes.length > i) {
        const argType = argTypes[i];
        if (finalArg !== null) {
          generatedCommand.options[argType.name] = finalArg;
        }
      }
    }
    return generatedCommand;
  } else {
    throw new Error(`${command.commandType} is not a valid command`);
  }
}

export async function runExpression<ReturnType = any>(
  expr: Parser.ParsedExpression,
  choices?: DialogChoice[],
): Promise<ReturnType> {
  const command = await generateCommand(expr, choices);
  const commandPlugin = vm.commands[command.commandType];
  if (commandPlugin) {
    const result = await commandPlugin.run(command, choices);
    return result;
  } else {
    throw new Error(`${command.commandType} is not a valid command`);
  }
}

export async function playerAnswered(choice: string | number) {
  audioEvent('onPlayerAnswered');
  const vmStore = useVM();
  // For some super weird reason, vmStore.currentCommand has a broken type?
  const command = vmStore.popAnswerQueue();
  const currentLine = vmStore.currentLine!;
  try {
    if (command) {
      const commandPlugin = vm.commands[command.commandType];
      if (commandPlugin) {
        return await commandPlugin.processPlayerAnswer(command, choice);
      }
    }
    // return await vmStore.nextLine();
  } catch (err) {
    console.error(err);
    error(
      `Error after player answer at ${currentLine.fileName}:${
        currentLine.line + 1
      } (${currentLine.code}<br /> - Error: ${err}`,
    );
  }
}
