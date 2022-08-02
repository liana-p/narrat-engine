import { getAssetUrl, getConfig, getDataUrl } from '@/config';
import {
  isReturnSignal,
  JUMP_SIGNAL,
  RETURN_SIGNAL,
  STOP_SIGNAL,
} from '@/constants';
import { Parser } from '@/types/parser';
import { getFile, loadDataFile } from '@/utils/ajax';
import {
  addDataHelper,
  getModifiableDataPinia,
  setDataHelper,
} from '@/utils/data-helpers';
import { error, parserError } from '@/utils/error-handling';
import { logger } from '@/utils/logger';
import { runCommand } from '@/vm/vm';
import { ParserContext, parseScript } from '@/vm/vm-parser';
import { defineStore } from 'pinia';
import { useDialogStore } from './dialog-store';
import { useInventory } from './inventory-store';
import { useMain } from './main-store';

export type AddFrameOptions = Omit<SetFrameOptions, 'label'> & {
  label?: string;
};

export interface MachineBlock {
  currentIndex: number;
  branchData: Parser.ParsedLabel;
}

export interface MachineFrame {
  blocks: MachineBlock[];
  label: string;
  // We need to keep track of which variables belong to which scope to delete them when the scope is closed
  scope: {
    [key: string]: any;
  };
  returnValue: any;
}

export interface SetFrameOptions {
  currentIndex: number;
  branchData: Parser.ParsedLabel;
  label: string;
  scope?: {
    [key: string]: any;
  };
  args?: any[];
}

export interface DataState {
  [key: string]: any;
}

export interface VMState {
  commandsWaitingForPlayerAnswer: Parser.Command<any, any>[];
  stack: MachineFrame[];
  script: Parser.ParsedScript;
  data: DataState;
  lastLabel: string;
  jumpTarget?: SetFrameOptions;
  // Used as a hack to disable manual save until the game has jumped from where the last save was.
  hasJumped: boolean;
}

export interface VMSave {
  lastLabel: string;
  data: DataState;
}

// Create a pinia store named vm with a state using the type VMState and with save data type VMSave, with actions:
// generateSaveData(): Function that generates a VMSave object from the data in the state
// loadSaveData(data: VMSave): Function that loads the data into the state using a deepmerge of current state value and new value
// setLastLabel(label: string): Sets the last label to the given label
// reset(): Resets the state to its default values
// setScript(script: Parser.ParsedScript): Sets the script state to the given script
// overrideData(data: DataState): Overrides the data state with the given data
// setStack(stack: MachineStack): Sets the stack state to the given stack, emptying the stack first and setting lastLabel to the new stack's label
// setData(path: string, value: any): Sets the value of the data state at the given path to the given value
// addStack(newStack: AddStackOptions): Adds a new stack to the stack state. If it has no label, use the label of the last stack.
// nextLine(): Increments the current stack's currentIndex
// previousStack(): Splices away the last stack from the stack state
export const useVM = defineStore('vm', {
  state: () =>
    ({
      stack: [],
      data: {},
      lastLabel: 'main',
      script: {},
      labelStack: ['main'],
      commandsWaitingForPlayerAnswer: [],
      hasJumped: false,
    } as VMState),
  actions: {
    generateSaveData(): VMSave {
      return {
        lastLabel: this.lastLabel,
        data: this.data,
      };
    },
    loadSaveData(data: VMSave) {
      this.lastLabel = data.lastLabel;
      this.data = data.data;
    },
    setReturnValue(value: any) {
      this.currentFrame!.returnValue = value;
    },
    waitForPlayerAnswer(cmd: Parser.Command<any, any>) {
      this.commandsWaitingForPlayerAnswer.push(cmd);
    },
    popAnswerQueue() {
      const cmd = this.commandsWaitingForPlayerAnswer.pop();
      return cmd;
    },
    addScopedVariable(key: string, value: any) {
      if (this.currentFrame) {
        this.currentFrame.scope[key] = value;
      }
    },
    async loadScripts(scriptPaths: string[]) {
      const filePromises: Array<Promise<string>> = [];
      for (const path of scriptPaths) {
        filePromises.push(getFile(getDataUrl(path)));
      }
      const files = await Promise.all(filePromises);
      const start = Date.now();
      let scripts: Parser.ParsedScript = {};
      for (const index in files) {
        const file = files[index];
        scripts = {
          ...scripts,
          ...parseScript(
            (ctx: ParserContext, line: number, error: string) =>
              parserError(ctx, line, error),
            file,
            scriptPaths[index],
          ),
        };
      }
      const end = Date.now();
      logger.log(`script parsed in ${end - start} ms`);
      this.setScript(scripts);
    },
    start() {
      this.setStack({
        currentIndex: 0,
        branchData: {
          branch: this.script.main.branch,
        },
        label: 'main',
      });
      this.setStack({
        currentIndex: 0,
        branchData: {
          branch: this.script.main.branch,
        },
        label: 'main',
      });
    },
    setLastLabel(label: string) {
      this.lastLabel = label;
    },
    reset() {
      this.stack = [];
      this.data = {};
      this.hasJumped = true;
      this.setStack({
        currentIndex: 0,
        branchData: {
          branch: this.script.main.branch,
        },
        label: 'main',
      });
    },
    setScript(script: Parser.ParsedScript) {
      this.script = script;
    },
    overrideData(data: DataState) {
      this.data = data;
    },
    setStack(stack: SetFrameOptions) {
      this.stack = [];
      const newStack = this.frameOptionsToFrame(stack);
      this.lastLabel = stack.label;
      this.stack.push(newStack);
    },
    frameOptionsToFrame(frame: SetFrameOptions) {
      const branchData = frame.branchData;
      const newFrame: MachineFrame = {
        ...frame,
        blocks: [],
        scope: {},
        returnValue: null,
      };
      this.addBlock(newFrame, {
        branchData,
        currentIndex: frame.currentIndex,
      });
      if (frame.scope) {
        newFrame.scope = frame.scope;
      }
      if (frame.args && frame.branchData.args) {
        for (const [index, argName] of frame.branchData.args.entries()) {
          if (frame.args.length > index) {
            newFrame.scope[argName] = frame.args[index];
          }
        }
      }
      return newFrame;
    },
    addBlock(frame: MachineFrame, block: MachineBlock) {
      frame.blocks.push(block);
    },
    async addAndRunBlock(block: MachineBlock) {
      const frame = this.currentFrame;
      if (!frame) {
        throw new Error('No frame to add block to');
      }
      this.addBlock(frame, block);
      return await this.runBlock();
    },
    setData(path: string, value: any) {
      const dataToModify = getModifiableDataPinia();
      setDataHelper(dataToModify, path, value);
    },
    addInstruction(path: string, value: any) {
      const dataToModify = getModifiableDataPinia();
      addDataHelper(dataToModify, path, value);
    },
    addFrame(newStackOptions: AddFrameOptions) {
      if (!newStackOptions.label) {
        if (this.currentFrame) {
          newStackOptions.label = this.currentFrame.label;
        } else {
          throw new Error(
            `Tried to add a new frame but no label was passed and there is no current frame label`,
          );
        }
      }
      const newStack = this.frameOptionsToFrame(
        newStackOptions as SetFrameOptions,
      );
      this.stack.push(newStack as MachineFrame);
    },

    async addAndRunFrame(newStackOptions: AddFrameOptions) {
      await this.addFrame(newStackOptions);
      return await this.runFrame();
    },
    async runFrame(): Promise<any> {
      const frame = this.currentFrame;
      if (!frame) {
        throw new Error(`Tried to run a frame but there is no current frame`);
      }
      // frame.currentIndex = 0;
      let result: any;
      while (this.currentBlock) {
        const result = await this.runBlock();
        if (result === JUMP_SIGNAL || result === STOP_SIGNAL) {
          this.cleanFrame();
          return result;
        }
        if (result === RETURN_SIGNAL) {
          return this.cleanFrame();
        }
      }
      this.cleanFrame();
      return result;
    },
    cleanFrame() {
      const frame = this.currentFrame!;
      const { returnValue } = frame;
      this.stack.splice(this.stack.length - 1, 1);
      return returnValue;
    },
    async runBlock(): Promise<any> {
      const block = this.currentBlock;
      if (!block) {
        throw new Error(`Tried to run a block but there is no current block`);
      }
      let result: any;
      while (this.currentLine) {
        result = await this.runLineOnly();
        if (isReturnSignal(result)) {
          this.cleanBlock();
          return result;
        }
        block.currentIndex++;
      }
      this.cleanBlock();
      return result;
    },
    cleanBlock() {
      this.currentFrame!.blocks.splice(this.currentFrame!.blocks.length - 1, 1);
    },
    async runGame() {
      let result = await this.runFrame();
      while (result === JUMP_SIGNAL) {
        const target = this.jumpTarget;
        if (!target) {
          error(`Tried to jump but no target was set`);
          return;
        }
        this.hasJumped = true;
        this.setStack(target);
        await useMain().autoSaveGame({});
        result = await this.runFrame();
      }
      if (result === STOP_SIGNAL) {
        return;
      }
      if (this.stack.length === 0) {
        this.reachedEndOfScript();
      }
    },

    async nextLineOnly(): Promise<boolean> {
      if (this.stack.length === 0) {
        return false;
      }
      if (!this.isBlockFinished()) {
        this.currentBlock!.currentIndex++;
        return true;
      } else {
        return false;
      }
    },

    isBlockFinished() {
      return (
        !this.currentBlock ||
        (this.currentBlock &&
          this.currentBlock.currentIndex >=
            this.currentBlock.branchData.branch.length)
      );
    },

    reachedEndOfScript() {
      if (
        getConfig().gameFlow.labelToJumpOnScriptEnd &&
        this.lastLabel !== getConfig().gameFlow.labelToJumpOnScriptEnd
      ) {
        this.jumpToLabel(getConfig().gameFlow.labelToJumpOnScriptEnd!);
        return;
      }
      useInventory().onScriptEnd();
      const mainStore = useMain();
      if (mainStore.options.debug) {
        const dialogStore = useDialogStore();
        if (getConfig().debugging.showScriptFinishedMessage) {
          dialogStore.addDialog({
            speaker: 'game',
            text: '[DEBUG] Game Script is finished. This is the end of the game flow. This message only appears in debug mode.',
          });
        }
      }
    },
    async runLineOnly() {
      const expression = this.currentLine;
      if (!expression) {
        error(`There is no line of script to run.`);
        return;
      }
      useInventory().onScriptStart();
      return await runCommand(expression);
    },
    async runLabelFunction(label: string, ...args: any[]) {
      const branchData = this.script[label];
      if (!branchData) {
        error(`Tried to run a label that doesn't exist: ${label}`);
        return;
      }
      // TODO: Inject args
      const stack: AddFrameOptions = {
        currentIndex: 0,
        branchData,
        label,
        args,
      };
      return this.addAndRunFrame(stack);
    },
    runCustomFrame(stack: AddFrameOptions) {
      this.addAndRunFrame(stack);
    },
    async jumpToLabel(label: string, ...args: any[]) {
      const branchData = this.script[label];
      if (!branchData) {
        error(
          `Label ${label} doesn't exist. Is the file with this label added in the list of script files to load in the config?`,
        );
        return;
      }
      if (label !== this.lastLabel) {
        this.hasJumped = true;
      }
      this.setLastLabel(label);
      this.setStack({
        currentIndex: 0,
        branchData,
        args,
        label,
      });
      await useMain().autoSaveGame({});
      this.runGame();
    },
    async runThenGoBackToPreviousDialog(label: string, ...args: any[]) {
      // Kinda hacky way to run a function and return to where we were
      const dialogStore = useDialogStore();
      const lastDialog = dialogStore.dialog[dialogStore.dialog.length - 1];
      const result = await this.runLabelFunction(label, ...args);
      dialogStore.dialog.push(lastDialog);
      return result;
    },
  },
  getters: {
    currentFrame(state): MachineFrame | undefined {
      const result = state.stack[state.stack.length - 1];
      return result;
    },
    scope(): { [key: string]: any } {
      return this.currentFrame?.scope ?? {};
    },
    currentBlock(): MachineBlock | undefined {
      const frame = this.currentFrame;
      if (!frame) {
        return;
      }
      const block = frame.blocks[frame.blocks.length - 1];
      return block;
    },
    currentLine(): Parser.ParsedExpression | undefined {
      const currentBlock = this.currentBlock;
      if (
        currentBlock &&
        currentBlock.branchData.branch.length > currentBlock.currentIndex
      ) {
        return currentBlock.branchData.branch[currentBlock.currentIndex];
      }
    },
    commandWaitingForAnswer(): Parser.Command<any, any> | undefined {
      if (this.commandsWaitingForPlayerAnswer.length > 0) {
        return this.commandsWaitingForPlayerAnswer[0];
      }
    },
  },
});
