import { getLine, runConditionCommand } from '@/vm/vm-helpers';
import { CommandPlugin, generateParser } from './command-plugin';
import { Parser } from '@/types/parser';
import { MachineBlock, useVM } from '@/stores/vm-store';

export interface IfOptions {
  condition: boolean;
}
export interface IfStaticOptions {
  success: Parser.Branch;
  failure?: Parser.Branch;
}

export const ifCommand = new CommandPlugin<IfOptions, IfStaticOptions>(
  'if',
  [{ name: 'condition', type: 'boolean' }],
  async (cmd) => {
    const newBranch = runConditionCommand(cmd);
    const vmStore = useVM();
    if (newBranch) {
      const newBlock: MachineBlock = {
        branchData: {
          branch: newBranch,
        },
        currentIndex: 0,
      };
      return vmStore.addAndRunBlock(newBlock);
    }
  },
  (ctx, parsed) => {
    let newLine = ctx.currentLine;
    const parser = generateParser('if', [
      { name: 'condition', type: 'string' },
    ]);
    parser(ctx, parsed as any);
    const { lines, currentLine, line } = ctx;
    const command = parsed.command;
    let failure: Parser.Branch | undefined;
    const nextLine = getLine(lines, currentLine + 1);
    if (nextLine && nextLine.code === 'else:') {
      failure = ctx.processCommandsFunction(
        ctx.parserContext,
        nextLine.branch!,
        line,
      );
      newLine++;
    }
    command.staticOptions = {
      success: ctx.processCommandsFunction(
        ctx.parserContext,
        line.branch!,
        line,
      ),
      failure,
    };
    newLine++;
    return {
      newLine,
    };
  },
);
