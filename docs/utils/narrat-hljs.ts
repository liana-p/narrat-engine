/*
Language: Python
Description: Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
Website: https://www.python.org
Category: common
*/

export default function (hljs: any) {
  const regex = hljs.regex;
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;
  const RESERVED_WORDS = [
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'case',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'match',
    'nonlocal|10',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'while',
    'with',
    'yield',
  ];

  const BUILT_INS = [
    'set',
    'var',
    'talk',
    'think',
    'jump',
    'run',
    'wait',
    'return',
    'save',
    'save_prompt',
    'log',
    'clear_dialog',
    'set_screen',
    'empty_layer',
    'set_button',
    'play',
    'pause',
    'stop',
    'notify',
    'enable_notifications',
    'disable_notifications',
    'set_stat',
    'get_stat_value',
    'add_stat',
    'neg',
    'abs',
    'random',
    'random_float',
    'random_from_args',
    'min',
    'max',
    'clamp',
    'floor',
    'round',
    'ceil',
    'sqrt',
    '^',
    'concat',
    'join',
    'text_field',
    'add_level',
    'set_level',
    'add_xp',
    'roll',
    'get_level',
    'get_xp',
    'add_item',
    'remove_item',
    'enable_interaction',
    'disable_interaction',
    'has_item?',
    'item_amount?',
    'start_quest',
    'start_objective',
    'complete_objective',
    'complete_quest',
    'quest_started',
    'objective_started?',
    'quest_completed?',
    'objective_completed?',
    // Other keywords
    'if',
    'choice',
    'elseif',
    'else',
    '&&',
    '||',
    '!=',
    '==',
    '>=',
    '<=',
    '<',
    '>',
    '!',
    '+',
    '-',
    '*',
    '/',
  ];

  const LITERALS = ['false', 'true'];

  // https://docs.python.org/3/library/typing.html
  // TODO: Could these be supplemented by a CamelCase matcher in certain
  // contexts, leaving these remaining only for relevance hinting?
  const TYPES = [
    'Any',
    'Callable',
    'Coroutine',
    'Dict',
    'List',
    'Literal',
    'Generic',
    'Optional',
    'Sequence',
    'Set',
    'Tuple',
    'Type',
    'Union',
  ];

  const KEYWORDS = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES,
  };

  const PROMPT = {
    className: 'meta',
    begin: /^(>>>|\.\.\.) /,
  };

  const SUBST = {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    illegal: /#/,
  };

  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0,
  };

  const STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
        relevance: 10,
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
        relevance: 10,
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [hljs.BACKSLASH_ESCAPE, PROMPT, LITERAL_BRACKET, SUBST],
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [hljs.BACKSLASH_ESCAPE, PROMPT, LITERAL_BRACKET, SUBST],
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10,
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10,
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/,
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/,
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [hljs.BACKSLASH_ESCAPE, LITERAL_BRACKET, SUBST],
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE, LITERAL_BRACKET, SUBST],
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
    ],
  };

  // https://docs.python.org/3.9/reference/lexical_analysis.html#numeric-literals
  const digitpart = '[0-9](_?[0-9])*';
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  // Whitespace after a number (or any lexical token) is needed only if its absence
  // would change the tokenization
  // https://docs.python.org/3.9/reference/lexical_analysis.html#whitespace-between-tokens
  // We deviate slightly, requiring a word boundary or a keyword
  // to avoid accidentally recognizing *prefixes* (e.g., `0` in `0x41` or `08` or `0__1`)
  const lookahead = `\\b|${RESERVED_WORDS.join('|')}`;
  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead})`,
      },
      {
        begin: `(${pointfloat})[jJ]?`,
      },

      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead})`,
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead})`,
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead})`,
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead})`,
      },

      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${digitpart})[jJ](?=${lookahead})`,
      },
    ],
  };
  const COMMENT_TYPE = {
    className: 'comment',
    begin: regex.lookahead(/\/\//),
    end: /$/,
    keywords: KEYWORDS,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/,
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: true,
      },
    ],
  };
  const PARAMS = {
    className: 'params',
    variants: [
      // Exclude params in functions without params
      {
        className: '',
        begin: /\(\s*\)/,
        skip: true,
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: ['self', PROMPT, NUMBER, STRING, hljs.HASH_COMMENT_MODE],
      },
    ],
  };
  SUBST.contains = [STRING, NUMBER, PROMPT];

  return {
    name: 'Python',
    aliases: ['py', 'gyp', 'ipython'],
    unicodeRegex: true,
    keywords: KEYWORDS,
    illegal: /(<\/|\?)|=>/,
    contains: [
      PROMPT,
      NUMBER,
      {
        // very common convention
        begin: /\bself\b/,
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: 'if',
        relevance: 0,
      },
      { match: /\bor\b/, scope: 'keyword' },
      STRING,
      COMMENT_TYPE,
      hljs.HASH_COMMENT_MODE,
      {
        match: [/\bdef/, /\s+/, IDENT_RE],
        scope: {
          1: 'keyword',
          3: 'title.function',
        },
        contains: [PARAMS],
      },
      {
        variants: [
          {
            match: [
              /\bclass/,
              /\s+/,
              IDENT_RE,
              /\s*/,
              /\(\s*/,
              IDENT_RE,
              /\s*\)/,
            ],
          },
          {
            match: [/\bclass/, /\s+/, IDENT_RE],
          },
        ],
        scope: {
          1: 'keyword',
          3: 'title.class',
          6: 'title.class.inherited',
        },
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [NUMBER, PARAMS, STRING],
      },
    ],
  };
}
