import { test, expect, assert, vi } from 'vitest';

import { Parser } from '@/types/parser';
import {
  getBranchesFromRawScript,
  parseCodeLine,
  parseCodeLineIntoTokens,
  ParserContext,
  parseScript,
  splitIntoTokens,
  splitScriptIntoLines,
  tokensToExpression,
} from './vm-parser';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { createPinia, setActivePinia } from 'pinia';
import { NarratScript } from '@/types/app-types';
import { registerBaseCommands } from './commands';
import { vm } from './vm';

const onError = (line: number, text: string) => {
  console.trace();
  console.error(`Parser error: ${line + 1}: ${text}`);
};

const ctx: ParserContext = {
  fileName: 'test.js',
  currentLine: 1,
  error: onError,
  indentSize: 2,
  processCommandsFunction: (ctx: any, lines: any, parentLine: any) =>
    ({}) as any,
};

let simpleNarratFile: string = '';
let complexNarratFile: string = '';
const errorSpy = vi.spyOn(ctx, 'error');
beforeEach(() => {
  setActivePinia(createPinia());
  errorSpy.mockClear();
});
beforeAll(async () => {
  complexNarratFile = await readFile(
    join(__dirname, 'parser.test.narrat'),
    'utf-8',
  );
  simpleNarratFile = await readFile(
    join(__dirname, 'simple-script.test.narrat'),
    'utf-8',
  );
});
afterEach(() => {
  for (const call of errorSpy.mock.calls) {
    assert.fail(call[1]);
  }
});

test('splitScriptIntoLines', () => {
  const lines1 = splitScriptIntoLines(ctx, simpleNarratFile);
  const lines2 = splitScriptIntoLines(ctx, complexNarratFile);
  expect(lines1.length).toBe(2);
  expect(lines2[2].code).toBe(
    `  talk player idle "Multiline statement?   Yes, they work!"`,
  );
  expect(lines2[3].line).toBe(6);
});

test('getBranchesFromRawScript', async () => {
  const lines1 = getBranchesFromRawScript(ctx, simpleNarratFile);
  const lines2 = getBranchesFromRawScript(ctx, complexNarratFile);
  expect(lines1.length).toBe(1);
  expect(lines2.find((line) => line.code === 'main:')).toBeTruthy();
  expect(lines2.find((line) => line.code === 'test4:')).toBeTruthy();
  expect(lines2[0].branch![1].code).toBe(
    'talk player idle "Multiline statement?   Yes, they work!"',
  );
  expect(lines2[3].branch![0].code).toBe(
    'set data.test (add "multiline "   "statement")',
  );
});

test('parseCodeLine', () => {
  const line = 'set data.example.hello "Hello world"';
  const result = parseCodeLine(ctx, line);
  expect(result.length).toBe(3);
  expect(result[0]).toBe('set');
  expect(result[1]).toBe('data.example.hello');
  expect(result[2]).toBe('$$"Hello world');
});

test('split into tokens', () => {
  const str = 'set data.counter (add 1 2)';
  const result = splitIntoTokens(str);
  expect(result.length).toBe(7);
  expect(result[0]).toBe('set');
  expect(result[1]).toBe('data.counter');
  expect(result[2]).toBe('(');
  expect(result[3]).toBe('add');
  expect(result[4]).toBe(1);
  expect(result[5]).toBe(2);
  expect(result[6]).toBe(')');
});

test('parse code line into tokens', () => {
  const hardToParseCode =
    'set data.counter (add (add "hello world (parenthesis in strings)" (even (more nested) (nested stuff) )) 2)';
  const line = hardToParseCode;
  const result = parseCodeLineIntoTokens(line);
  expect(result.length).toBe(22);
  expect(result[0]).toBe('set');
  expect(result[1]).toBe('data.counter');
  expect(result[2]).toBe('(');
  expect(result[3]).toBe('add');
  expect(result[4]).toBe('(');
  expect(result[5]).toBe('add');
  expect(result[6]).toBe('$$"hello world (parenthesis in strings)');
  expect(result[7]).toBe('(');
  expect(result[8]).toBe('even');
  expect(result[9]).toBe('(');
  expect(result[10]).toBe('more');
  expect(result[11]).toBe('nested');
  expect(result[12]).toBe(')');
  expect(result[13]).toBe('(');
  expect(result[14]).toBe('nested');
  expect(result[15]).toBe('stuff');
  expect(result[16]).toBe(')');
  expect(result[17]).toBe(')');
  expect(result[18]).toBe(')');
  expect(result[19]).toBe(2);
  expect(result[20]).toBe(')');
});

test('tokens to expression', () => {
  const line =
    'set data.counter (add (add "hello world (parenthesis in strings)" (even (more nested) (nested stuff) )) 2)';
  const tokens = parseCodeLineIntoTokens(line);
  const [result] = tokensToExpression(ctx, tokens);
  expect(result.length).toBe(3);
  expect(result[0]).toBe('set');
  expect(result[1]).toBe('data.counter');
  expect(Array.isArray(result[2])).toBe(true);
  const r2 = result[2] as Parser.Expression;
  expect(r2.length).toBe(3);
  expect(r2[0]).toBe('add');
  expect(Array.isArray(r2[1])).toBe(true);
  const r3 = r2[1] as Parser.Expression;
  expect(r3[0]).toBe('add');
  expect(r3[1]).toBe('$$"hello world (parenthesis in strings)');
  expect(Array.isArray(r3[2])).toBe(true);
  const r4 = r3[2] as Parser.Expression;
  expect(r4.length).toBe(3);
  expect(r4[0]).toBe('even');
  expect(Array.isArray(r4[1])).toBe(true);
  expect(Array.isArray(r4[2])).toBe(true);
});

test('complicated if line', () => {
  const line = `if (&& (== (+ 1 2 3 4) 10) (== (+ 1 2 3) 6) (== (+ 1 2) 3 3 3 3)):`;
  const tokens = parseCodeLineIntoTokens(line);
  const [result] = tokensToExpression(ctx, tokens);
  expect(result[0]).toBe('if');
  const r1 = result[1] as Parser.Expression;
  expect(r1[0]).toBe('&&');
  const r2 = r1[1] as Parser.Expression;
  expect(r2[0]).toBe('==');
  const r3 = r2[1] as Parser.Expression;
  expect(r3[0]).toBe('+');
  expect(r3[1]).toBe(1);
  expect(r2[2]).toBe(10);
});

test('parseScript', () => {
  registerBaseCommands(vm);
  const script: NarratScript = {
    code: complexNarratFile,
    fileName: 'main.narrat',
    id: 'main',
    type: 'script',
  };
  const parsed = parseScript(script);
  expect(parsed.test4).toBeTruthy();
  expect(parsed.test4.branch[0].code).toBe(
    `set data.test (add "multiline "   "statement")`,
  );
});
