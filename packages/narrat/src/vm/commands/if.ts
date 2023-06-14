import { getLine, runConditionCommand } from '@/vm/vm-helpers';
import { CommandPlugin, generateParser } from './command-plugin';
import { Parser } from '@/types/parser';
import { MachineBlock, useVM } from '@/stores/vm-store';
import { parseExpression } from '../vm-parser';
import { runExpression } from '../vm';

export interface IfOptions {
  condition: boolean;
}
export interface ElseIfOptions {
  branch: Parser.Branch;
  condition: Parser.ParsedExpression;
}
export interface IfStaticOptions {
  success: Parser.Branch;
  elseifs: ElseIfOptions[];
  failure?: Parser.Branch;
}

export const ifCommand = new CommandPlugin<IfOptions, IfStaticOptions>(
  'if',
  [{ name: 'condition', type: 'boolean' }],
  async (cmd) => {
    const elseIfResults: boolean[] = [];
    for (const elseif of cmd.staticOptions.elseifs) {
      const condition = elseif.condition;
      const finalCondition = await runExpression(condition);
      elseIfResults.push(finalCondition);
    }
    const newBranch = runConditionCommand(cmd, elseIfResults);
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
    let lineToTest = currentLine;
    let foundOtherThing = false;
    const elseifs: ElseIfOptions[] = [];
    while (!foundOtherThing) {
      lineToTest++;
      const nextLine = getLine(lines, lineToTest);
      if (nextLine && nextLine.code.startsWith('elseif')) {
        const expression = nextLine.expression;
        if (!Array.isArray(expression)) {
          ctx.parserContext.error(
            nextLine.line,
            'Expected an expression after elseif',
          );
          foundOtherThing = true;
          break;
        }
        if (expression.length > 2) {
          ctx.parserContext.error(
            nextLine.line,
            'Expected only one argument after elseif',
          );
          foundOtherThing = true;
          break;
        }
        elseifs.push({
          branch: ctx.processCommandsFunction(
            ctx.parserContext,
            nextLine.branch!,
            line,
          ),
          condition: parseExpression(
            ctx.parserContext,
            nextLine,
            expression[1] as Parser.Expression,
          ),
        });
      } else if (nextLine && nextLine.code === 'else:') {
        failure = ctx.processCommandsFunction(
          ctx.parserContext,
          nextLine.branch!,
          line,
        );
      } else {
        foundOtherThing = true;
        lineToTest--;
      }
    }
    command.staticOptions = {
      success: ctx.processCommandsFunction(
        ctx.parserContext,
        line.branch!,
        line,
      ),
      elseifs,
      failure,
    };
    lineToTest++;
    newLine = lineToTest;
    return {
      newLine,
    };
  },
);
