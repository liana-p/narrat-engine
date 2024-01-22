// Difficulty: "Moderate"
// Python language definition.
// Only trickiness is that we need to check strings before identifiers
// since they have letter prefixes. We also treat ':' as an @open bracket
// in order to get auto identation.
export const narratMonarchLanguage = {
  defaultToken: '',
  tokenPostfix: '.python',

  keywords: [
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
  ],

  brackets: [
    { open: '{', close: '}', token: 'delimiter.curly' },
    { open: '[', close: ']', token: 'delimiter.bracket' },
    { open: '(', close: ')', token: 'delimiter.parenthesis' },
  ],

  tokenizer: {
    root: [
      { include: '@whitespace' },
      { include: '@numbers' },
      { include: '@strings' },

      [/[,:;]/, 'delimiter'],
      [/[{}\[\]()]/, '@brackets'],

      [/\$[a-zA-Z]\w*/, 'tag'],
      [
        /[a-zA-Z]\w*/,
        {
          cases: {
            '@keywords': 'keyword',
            '@default': 'identifier',
          },
        },
      ],
    ],

    // Deal with white space, including single and multi-line comments
    whitespace: [
      [/\s+/, 'white'],
      [/(^\/\/.*$)/, 'comment'],
      [/('''.*''')|(""".*""")/, 'string'],
      [/'''.*$/, 'string', '@endDocString'],
      [/""".*$/, 'string', '@endDblDocString'],
    ],
    endDocString: [
      [/\\'/, 'string'],
      [/.*'''/, 'string', '@popall'],
      [/.*$/, 'string'],
    ],
    endDblDocString: [
      [/\\"/, 'string'],
      [/.*"""/, 'string', '@popall'],
      [/.*$/, 'string'],
    ],

    // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
    numbers: [
      [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'],
      [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number'],
    ],

    // Recognize strings, including those broken across lines with \ (but not without)
    strings: [
      [/'$/, 'string.escape', '@popall'],
      [/'/, 'string.escape', '@stringBody'],
      [/"$/, 'string.escape', '@popall'],
      [/"/, 'string.escape', '@dblStringBody'],
    ],
    stringBody: [
      [/[^\\']+$/, 'string', '@popall'],
      [/[^\\']+/, 'string'],
      [/\\./, 'string'],
      [/'/, 'string.escape', '@popall'],
      [/\\$/, 'string'],
    ],
    dblStringBody: [
      [/[^\\"]+$/, 'string', '@popall'],
      [/[^\\"]+/, 'string'],
      [/\\./, 'string'],
      [/"/, 'string.escape', '@popall'],
      [/\\$/, 'string'],
    ],
  },
};
