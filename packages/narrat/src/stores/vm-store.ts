import { getCommonConfig, getDataUrl } from '@/config';
import {
  isReturnSignal,
  JUMP_SIGNAL,
  RETURN_SIGNAL,
  STOP_SIGNAL,
} from '@/constants';
import { Parser } from '@/types/parser';
import { getFile } from '@/utils/ajax';
import {
  addDataHelper,
  deepCopy,
  deepCopyMap,
  getModifiableDataPinia,
  setDataHelper,
} from '@/utils/data-helpers';
import { error, warning } from '@/utils/error-handling';
import { logger } from '@/utils/logger';
import { deepEvery } from '@/utils/object-iterators';
import { runCommand, vm } from '@/vm/vm';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useDialogStore } from './dialog-store';
import { useMain } from './main-store';
import { isScreenObject, useScreenObjects } from './screen-objects-store';
import { GlobalGameSave } from '@/types/game-save';
import { getSaveFile } from '@/utils/save-helpers';
import { NarratScript } from '@/types/app-types';
import { autoSaveGame } from '@/application/saving';

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
  data: DataState;
  globalData: DataState;
  lastLabel: string;
  jumpTarget?: SetFrameOptions;
  // Used as a hack to disable manual save until the game has jumped from where the last save was.
  hasJumped: boolean;
}

export interface VMSave {
  lastLabel: string;
  data: DataState;
}

export const useVM = defineStore('vm', {
  state: () =>
    ({
      stack: [],
      data: {},
      globalData: {},
      lastLabel: 'main',
      script: {},
      labelStack: ['main'],
      commandsWaitingForPlayerAnswer: [],
      hasJumped: false,
    }) as VMState,
  actions: {
    generateSaveData(): VMSave {
      return {
        lastLabel: this.lastLabel,
        data: deepCopyMap(this.data, (value) => {
          if (isScreenObject(value)) {
            return {
              _entityType: value._entityType,
              id: value.id,
            };
          } else {
            return value;
          }
        }),
      };
    },
    generateGlobalSaveData(): Pick<GlobalGameSave, 'data'> {
      return {
        data: deepCopy(this.globalData),
      };
    },
    loadSaveData(data: VMSave) {
      this.lastLabel = data.lastLabel;
      this.data = data.data;
      this.findEntitiesInData(this.data);
    },
    loadGlobalSaveData(globalSave: Pick<GlobalGameSave, 'data'>) {
      this.globalData = globalSave.data;
    },
    findEntitiesInData(data: any) {
      deepEvery(this.data, (value, key, parent) => {
        if (isScreenObject(value)) {
          const objectFromStore = useScreenObjects().getObject(value.id);
          if (!objectFromStore) {
            warning(
              `Trying to reload sprite ${key} (${JSON.stringify(value)} - ${
                value.id
              }) but it does not exist.`,
            );
            // useScreenObjects().addObject(value);
          } else {
            parent[key] = objectFromStore;
          }
        }
      });
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
      this.readGlobalData();
      const configScripts = await this.loadConfigScriptFiles(scriptPaths);
      const builtInScripts = useMain().options.scripts;
      this.addAllScripts([...configScripts, ...builtInScripts]);
    },
    async loadConfigScriptFiles(
      scriptPaths: string[],
    ): Promise<NarratScript[]> {
      const filePromises: Array<Promise<string>> = [];
      for (const path of scriptPaths) {
        filePromises.push(getFile(getDataUrl(path)));
      }
      const files = await Promise.all(filePromises);
      return files.map((file, index) => ({
        fileName: scriptPaths[index],
        code: file,
        id: scriptPaths[index],
        type: 'script',
      }));
    },
    addAllScripts(scriptsToParse: NarratScript[]) {
      const start = Date.now();
      for (const script of scriptsToParse) {
        vm.addNarratScript(script);
      }
      const end = Date.now();
      logger.log(`scripts parsed in ${end - start} ms`);
    },
    start() {
      this.setStack({
        currentIndex: 0,
        branchData: {
          branch: vm.script.main.branch,
        },
        label: 'main',
      });
      this.setStack({
        currentIndex: 0,
        branchData: {
          branch: vm.script.main.branch,
        },
        label: 'main',
      });
    },
    setLastLabel(label: string) {
      this.lastLabel = label;
    },
    reset() {
      this.$reset();
      this.stack = [];
      this.data = {};
      this.hasJumped = true;
      this.setStack({
        currentIndex: 0,
        branchData: {
          branch: vm.script.main.branch,
        },
        label: 'main',
      });
    },
    readGlobalData() {
      this.globalData = getSaveFile().globalSave.data;
    },
    setScript(script: Parser.ParsedScript) {
      vm.script = script;
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
      if (!this.currentFrame) {
        error('Tried to clean a block but there is no current frame');
        return;
      }
      if (!this.currentFrame.blocks) {
        error('Tried to clean a block but there is no current block');
        return;
      }
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
        await autoSaveGame({});
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
        getCommonConfig().gameFlow.labelToJumpOnScriptEnd &&
        this.lastLabel !== getCommonConfig().gameFlow.labelToJumpOnScriptEnd
      ) {
        this.jumpToLabel(getCommonConfig().gameFlow.labelToJumpOnScriptEnd!);
        return;
      }
      useMain().endingScript();
      const mainStore = useMain();
      if (mainStore.options.debug) {
        // const dialogStore = useDialogStore();
        if (getCommonConfig().debugging.showScriptFinishedMessage) {
          // dialogStore.addDialog({
          //   speaker: useConfig().gameCharacter,
          //   text: '[DEBUG] Game Script is finished. This is the end of the game flow. This message only appears in debug mode.',
          // });
        }
      }
    },
    async runLineOnly() {
      const expression = this.currentLine;
      if (!expression) {
        error(`There is no line of script to run.`);
        return;
      }
      useMain().startingScript();
      return await runCommand(expression);
    },
    async runLabelFunction(label: string, ...args: any[]) {
      const branchData = vm.script[label];
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
      const branchData = vm.script[label];
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
      this.runGame();
    },
    async runThenGoBackToPreviousDialog(label: string, ...args: any[]) {
      // Kinda hacky way to run a function and return to where we were
      const dialogStore = useDialogStore();
      const lastDialog = dialogStore.dialog[dialogStore.dialog.length - 1];
      const isInDialog = useMain().inScript;
      const result = await this.runLabelFunction(label, ...args);
      if (isInDialog) {
        dialogStore.dialog.push(lastDialog);
      } else {
        useMain().endingScript();
      }
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVM, import.meta.hot));
}
