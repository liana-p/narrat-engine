import { isParsedTokenString } from '@/utils/string-helpers';
import { Parser } from '../types/parser';
import { LogManager } from '../utils/logger';
import {
  CommandParsingContext,
  ProcessCommandsFunction,
} from './commands/command-plugin';
import { vm } from './vm';
import { NarratScript } from '@/types/app-types';
import { parserError } from '@/utils/error-handling';

const loggerManager = new LogManager();
loggerManager.setupDebugger(false);
const logger = loggerManager.logger;
// const logger = defaultLogger;

let localizationReport: string[] = [];

export type ErrorFunction = (line: number, text: string) => void;

export type ParserErrorHandler = (
  ctx: ParserContext,
  line: number,
  text: string,
) => void;
export interface ParserContext {
  fileName: string;
  currentLine: number;
  error: ErrorFunction;
  processCommandsFunction: ProcessCommandsFunction;
  indentSize: number;
  createLocalizationReport?: boolean;
}

export function parseScript(
  script: NarratScript,
  createLocalizationReport?: boolean,
): Parser.ParsedScript {
  localizationReport = [];
  const result = parseScriptFunction(
    (ctx: ParserContext, line: number, error: string) =>
      parserError(ctx, line, error),
    script.code,
    script.fileName,
    createLocalizationReport,
  );
  if (createLocalizationReport) {
    console.log(
      `Localization report for ${script.fileName}:`,
      localizationReport,
    );
  }
  return result;
}
export function parseScriptFunction(
  errorHandler: ParserErrorHandler,
  code: string,
  fileName: string,
  createLocalizationReport?: boolean,
): Parser.ParsedScript {
  const ctx: ParserContext = {
    fileName,
    currentLine: 0,
    error: (line: number, text: string) => errorHandler(ctx, line, text),
    processCommandsFunction: processCommands,
    indentSize: 0, // Will be overriden soon
    createLocalizationReport: createLocalizationReport ?? false,
  };
  ctx.indentSize = detectIndentation(ctx, code);
  const lines = getBranchesFromRawScript(ctx, code);
  ctx.currentLine = 0;
  logger.log(lines);
  const script: Parser.ParsedScript = {};
  for (const line of lines) {
    if (line.code.search(':') === -1) {
      ctx.error(
        line.line,
        `First indentation level should only be used to specify labels`,
      );
    }
    const labelString = line.code.replace(':', '');
    const labelWords = labelString.split(/ +/g);
    const labelName = labelWords[0];
    const labelArgs = labelWords.slice(1);
    if (!line.branch) {
      ctx.error(line.line, `This line should have a branch but doesn't`);
    }
    script[labelName] = {
      branch: processCommands(ctx, line.branch!, undefined),
      args: labelArgs,
    };
  }
  return script;
}

function processCommands(
  ctx: ParserContext,
  lines: Parser.Line[],
  parentLine: Parser.Line | undefined,
): Parser.Branch {
  const startLine = ctx.currentLine;
  if (!lines) {
    let lineNumber = 0;
    if (parentLine) {
      lineNumber = parentLine.line;
    }
    ctx.error(
      lineNumber,
      `Processing of command failed because the current branch has no lines inside`,
    );
    return [];
  }
  const branchContext: CommandParsingContext = {
    processCommandsFunction: processCommands,
    parserContext: ctx,
    lines,
    currentLine: 0,
    line: lines[0],
  };
  const branch: Parser.Branch = [];
  while (branchContext.currentLine < lines.length) {
    const line = lines[branchContext.currentLine];
    branchContext.line = line;
    const parsed = parseExpression(ctx, line, line.expression);
    const commandPlugin = vm.commands[parsed.command.operator];
    let parseFunction = commandPlugin?.parser;
    if (!parseFunction) {
      // default to text function
      parseFunction = vm.commands.text.parser;
    }
    logger.log(vm.commands.text);
    const { newLine } = parseFunction(branchContext, parsed);
    branchContext.currentLine = newLine;
    ctx.currentLine = startLine + newLine;
    branch.push(parsed);
  }
  return branch;
}

export function parseExpression(
  ctx: ParserContext,
  line: Parser.Line,
  expression: Parser.Expression,
): Parser.ParsedExpression {
  if (!Array.isArray(expression)) {
    ctx.error(
      line.line,
      `Expression should be an array. Something is wrong. ${ctx.fileName}:${ctx.currentLine} - ${line.code}`,
    );
  }
  logger.log(expression);
  if (typeof expression[0] !== 'string') {
    ctx.error(
      line.line,
      `Expression operator should be a string ${ctx.fileName}:${ctx.currentLine} - ${line.code}`,
    );
  }
  const parsed: Parser.ParsedExpression = {
    code: line.code,
    fileName: ctx.fileName,
    line: line.line,
    command: {
      staticOptions: {},
      commandType: expression[0] as string,
      operator: expression[0] as string,
      args: expression.slice(1).map((arg) => parseArgument(ctx, line, arg)),
      options: {},
    },
  };
  const firstElement = expression[0] as string;
  const command = vm.commands[firstElement];
  if (!command) {
    const otherKeywords = ['else', 'success', 'failure'];
    if (
      !isParsedTokenString(firstElement) &&
      !otherKeywords.includes(firstElement)
    ) {
      ctx.error(line.line, `Unknown command ${firstElement}`);
    }
  }

  return parsed;
}

export function parseArgument(
  ctx: ParserContext,
  line: Parser.Line,
  argument: Parser.Expression | Parser.Primitive,
): Parser.Arg {
  if (Array.isArray(argument)) {
    return parseExpression(ctx, line, argument);
  } else {
    if (ctx.createLocalizationReport && typeof argument === 'string') {
      localizationReport.push(argument);
    }
    return argument;
  }
}

function parseTokenToPrimitive(value: string) {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else if (value === 'undefined') {
    return undefined;
  } else if (value === null) {
    return null;
  } else if (!isNaN(Number(value))) {
    return Number(value);
  }
  return value;
}
export function parseCodeLine(
  ctx: ParserContext,
  codeToProcess: string,
): Parser.Expression {
  if (codeToProcess.charAt(codeToProcess.length - 1) === ':') {
    codeToProcess = codeToProcess.substr(0, codeToProcess.length - 1);
  }
  const tokens = parseCodeLineIntoTokens(codeToProcess);
  const [expression] = tokensToExpression(ctx, tokens);
  return expression;
}

export function parseCodeLineIntoTokens(code: string): Parser.Primitive[] {
  // Finds strings and processes the code around them to get all tokens
  const regex = /(["'])(?:\\\1|.)*?\1/g;
  const matches = [];
  let match;
  while ((match = regex.exec(code)) != null) {
    matches.push(match);
  }
  let currentIndex = 0;
  let tokens: Parser.Primitive[] = [];
  for (const match of matches) {
    // For each string match, process the code before it to add all tokens
    const index = match.index;
    if (index > currentIndex) {
      const inBetween = code.substr(currentIndex, index - currentIndex);
      const newTokens = splitIntoTokens(inBetween);
      tokens = [...tokens, ...newTokens];
    }
    // Remove backticks for escaped quotes
    const finalMatch = match[0].replace(/\\/g, '');
    tokens.push(`$$"${finalMatch.substring(1, finalMatch.length - 1)}`);
    currentIndex = index + match[0].length;
  }
  // Process the last tokens from after the last string
  tokens = [...tokens, ...splitIntoTokens(code.substr(currentIndex))];
  // Adding a closing parenthesis at the end of the line so users don't have to
  tokens.push(')');
  return tokens;
}

// Splits a chunk of code (without strings) into tokens
export function splitIntoTokens(code: string): Parser.Primitive[] {
  code = code.replace(/: *$/g, '');
  let result = code.split(' ').filter((el) => el);
  result = result.reduce<string[]>(
    (total, curr) =>
      [...total, ...curr.split(/(\(|\))/g)].filter((el) => el && el),
    [],
  );
  return result.map((token) => parseTokenToPrimitive(token));
}

export function tokensToExpression(
  ctx: ParserContext,
  tokens: Parser.Primitive[],
): [Parser.Expression, number] {
  logger.log('===============');
  let expression: Parser.Expression = [];
  let cursor = 0;
  // Find sub expressions inside this expression
  let parenthesisIndex = findExpressionStart(tokens) + cursor;
  let parenthesisEndIndex = findExpressionEnd(tokens) + cursor;
  logger.log(`Parsing expression: ${tokens}`);
  logger.log(
    `Parenthesis start index: ${parenthesisIndex} - end: ${parenthesisEndIndex}`,
  );
  while (parenthesisIndex !== -1 && parenthesisEndIndex > parenthesisIndex) {
    // Add everything before the sub expression
    expression = [...expression, ...tokens.slice(cursor, parenthesisIndex)];
    const subExpressionString = tokens.slice(parenthesisIndex + 1);
    logger.log(
      `Found a sub expression. Before: ${expression} - After: ${subExpressionString}`,
    );
    cursor = parenthesisIndex;
    // Process the sub expression
    const [subExpression, subExpressionLength] = tokensToExpression(
      ctx,
      subExpressionString,
    );
    const subExpressionEndIndex = cursor + subExpressionLength;
    expression.push(subExpression);
    cursor = subExpressionEndIndex + 1;
    const restOfString = tokens.slice(cursor);
    logger.log(
      `Sub expression came back: ${subExpression} - rest of string: ${restOfString}`,
    );
    // Find the next sub expression, if any
    parenthesisIndex = findExpressionStart(restOfString);
    if (parenthesisIndex !== -1) {
      parenthesisIndex += cursor;
    }
    parenthesisEndIndex = findExpressionEnd(restOfString);
    if (parenthesisEndIndex !== -1) {
      parenthesisEndIndex += cursor;
    }
  }
  if (parenthesisEndIndex !== -1) {
    logger.log(
      `Found parenthesis end before new opening parenthesis, close this expression`,
    );
  }
  // Find the end of the current expression
  const endIndex = findExpressionEnd(tokens.slice(cursor)) + cursor;
  if (endIndex === -1) {
    ctx.error(
      ctx.currentLine,
      `Expression is not closed (missing ")" closing parenthesis)`,
    );
    return [expression, endIndex];
  }
  const restOfString = tokens.slice(cursor, endIndex);
  logger.log(`End of expression: ${endIndex} - ${restOfString}`);
  logger.log('===================');
  // Add the remaining tokens to the expression
  expression = [...expression, ...restOfString];
  validateExpression(ctx, expression);
  return [expression, endIndex + 1];
}

export function validateExpression(
  ctx: ParserContext,
  expression: Parser.Expression,
) {
  if (expression.length < 1) {
    ctx.error(ctx.currentLine, `Expression is empty`);
  }
}

export function findExpressionStart(tokens: Parser.Primitive[]): number {
  return tokens.findIndex((token) => token === '(');
}

export function findExpressionEnd(tokens: Parser.Primitive[]): number {
  return tokens.findIndex((token) => token === ')');
}

export interface LineData {
  code: string;
  line: number;
  multiline: boolean;
}

/** Finds all the lines, handling merging multilines, removing comment and removing empty lines */
export function splitScriptIntoLines(
  ctx: ParserContext,
  data: string,
): LineData[] {
  const result = data
    .split(/\r?\n|$/)
    .reduce<LineData[]>((lines, line, index) => {
      const final = {
        code: line,
        line: index,
        multiline: false,
      };
      const multilineIndex = line.search(/\\$/);
      if (multilineIndex !== -1) {
        final.multiline = true;
        line = line.substring(0, multilineIndex);
      }
      const commentIndex = line.search(/ *\/\//g);
      if (commentIndex !== -1) {
        line = line.substring(0, commentIndex);
      }
      final.code = line;
      if (final.code.search(/^\s*$/) === -1) {
        // Skip empty lines
        if (lines.length > 0 && lines[lines.length - 1].multiline) {
          lines[lines.length - 1].code += line;
          lines[lines.length - 1].multiline = final.multiline;
        } else {
          lines.push(final);
        }
      }
      return lines;
    }, [] as LineData[]);
  return result;
}

export function getBranchesFromRawScript(
  ctx: ParserContext,
  data: string,
): Parser.Line[] {
  // First find all lines, combine multilines, remove comments
  const lines = splitScriptIntoLines(ctx, data);
  // Then parse them into branches
  const parsedBranches = findBranches(ctx, lines, 0, 0);
  return parsedBranches.lines;
}

function findBranches(
  ctx: ParserContext,
  code: LineData[],
  startLine: number,
  indentLevel: number,
) {
  let stillInBranch = true;
  let currentLine = startLine;
  const lines: Parser.Line[] = [];
  while (stillInBranch) {
    if (currentLine >= code.length) {
      break;
    }
    const codeLine = code[currentLine];
    let lineText = codeLine.code;

    const lineIndent = getIndentLevel(ctx, lineText);
    lineText = lineText.substring(lineIndent * ctx.indentSize);
    validateIndent(ctx, lineIndent, currentLine);
    if (lineIndent < indentLevel) {
      stillInBranch = false;
    } else if (lineIndent > indentLevel) {
      if (lines.length === 0 || lineIndent - indentLevel !== 1) {
        ctx.error(codeLine.line, `Wrong double indentation`);
      }
      const branchLines = findBranches(ctx, code, currentLine, lineIndent);
      lines[lines.length - 1].branch = branchLines.lines;
      currentLine = branchLines.endLine;
    } else {
      const expression = parseCodeLine(ctx, lineText);
      const line: Parser.Line = {
        code: lineText,
        indentation: lineIndent,
        line: codeLine.line,
        expression,
      };
      lines.push(line);
      currentLine++;
      ctx.currentLine = currentLine;
    }
  }
  return {
    lines,
    endLine: currentLine,
  };
}

function validateIndent(
  ctx: ParserContext,
  indentLevel: number,
  currentIndex: number,
) {
  if (indentLevel % 1 !== 0) {
    ctx.error(
      currentIndex,
      `Indentation level of ${indentLevel} incorrect. Expected indentation of ${ctx.indentSize} spaces for this file.`,
    );
  }
}

function getIndentLevel(ctx: ParserContext, line: string) {
  return line.search(/[^ ]/) / ctx.indentSize;
}

function detectIndentation(ctx: ParserContext, script: string): number {
  const result = script.match(/: *[\n\r]+( *)/);

  if (!result || result.length < 2) {
    ctx.error(
      0,
      `Can't detect indentation level. Make sure you indent with at least 2 spaces and consistently`,
    );
    return 0;
  }
  logger.log(result);
  return result[1].length;
}
