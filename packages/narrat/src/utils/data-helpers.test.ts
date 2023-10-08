import { test, expect, it, describe } from 'vitest';

import { error } from '@/utils/error-handling';
import {
  getPathValueWithoutBrackets,
  findBracketsEnd,
  newFindDataHelper,
} from './data-helpers';
import { ParserContext } from '@/vm/vm-parser';

const ctx: ParserContext = {
  fileName: 'test.js',
  currentLine: 1,
  error: (line: number, text: string) =>
    error(`Parser error: ${ctx.fileName}:${line + 1}: ${text}`),
  indentSize: 0,
  processCommandsFunction: (ctx: any, lines: any, parentLine: any) =>
    ({}) as any,
};

describe('findBracketsEnd', () => {
  it('find the end of the brackets for a string with complicated nested parenthesis', () => {
    const testString =
      '$data.something[3][4]].hello[$data.other[$data.thing[3]]].more.values';
    const result = findBracketsEnd(testString);
    const resultString = testString.substring(0, result);
    expect(resultString).toBe('$data.something[3][4]]');
  });
});

describe('getPathValueWithoutBrackets', () => {
  it('finds the value of a base path that contains no brackets', () => {
    const testString = 'data.something';
    const testData = {
      data: {
        something: 5,
      },
    };
    const result = getPathValueWithoutBrackets(testData, testString);
    expect(result).toStrictEqual([testData.data, 'something']);
  });
  it('handle more complex cases like a string starting with a dot', () => {
    const testString = '.hello.test';
    const data = {
      hello: {
        test: 5,
      },
    };
    const result = getPathValueWithoutBrackets(data, testString);
    expect(result).toStrictEqual([data.hello, 'test']);
  });
  it('handles numbers', () => {
    const testString = 5;
    const data = [1, 2, 3, 4, 5, 6];
    const result = getPathValueWithoutBrackets(data, testString);
    expect(result).toStrictEqual([data, 5]);
  });
});

describe('newFindDataHelper', () => {
  it('should handle finding the final value for complex strings', () => {
    const testString =
      '$data.test[$data.something[3][4]].hello[$data.other[$data.thing[3]]].more.values';
    const content = {
      test: {
        aKey: {
          hello: {
            otherKey: {
              more: {
                values: 'FINAL_RESULT',
              },
            },
          },
        },
      },
      something: [0, 0, 0, [0, 0, 0, 0, 'aKey']],
      other: {
        someKey: 'otherKey',
      },
      thing: [0, 0, 0, 'someKey'],
    };
    const state = { data: content };
    const result = newFindDataHelper(state, state, testString);
    expect(result).toStrictEqual([{ values: 'FINAL_RESULT' }, 'values']);
  });
});
