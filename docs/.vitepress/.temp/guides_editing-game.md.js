import { defineComponent, ref, shallowRef, onMounted, useSSRContext, resolveComponent, withCtx, createVNode } from "vue";
import { ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttrs } from "vue/server-renderer";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import yaml from "highlight.js/lib/languages/yaml";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const _imports_0 = "/assets/open-folder._crZIuYN.png";
const _imports_1 = "/assets/narrat-extension.isBSfS7o.png";
const gameConfig = {
  screens: {
    screens: {
      default: {
        background: "/placeholder-narrat-bg-darker.webp",
        buttons: ["replay"]
      }
    }
  },
  buttons: {
    buttons: {
      replay: {
        enabled: true,
        text: "Replay",
        position: {
          left: 100,
          top: 100
        },
        action: "main",
        cssClass: "replay-button"
      }
    }
  },
  skills: {},
  audio: {
    files: {},
    audioTriggers: {},
    options: {
      volume: 1,
      musicFadeInTime: 0,
      musicFadeOutTime: 0,
      musicFadeInDelay: 0
    }
  },
  characters: {
    config: {
      imagesPath: "/"
    },
    characters: {
      narrat: {
        name: "Narrat",
        sprites: {
          idle: "narrat-portrait.webp"
        }
      },
      game: {
        name: "",
        style: {
          color: "white"
        },
        sprites: {
          idle: "narrat-portrait.webp"
        }
      },
      player: {
        name: "You",
        style: {
          color: "orange"
        }
      }
    }
  },
  common: {
    gameTitle: "Docs demo",
    saveFileName: "docs-demo",
    layout: {
      backgrounds: {
        width: 1280,
        height: 720
      },
      dialogBottomPadding: 70,
      verticalLayoutThreshold: 600,
      portraits: {
        width: 120,
        height: 175
      }
    },
    dialogPanel: {
      overlayMode: true,
      rightOffset: 100,
      bottomOffset: 50,
      width: 600,
      height: 700
    },
    hudStats: {}
  }
};
function narrat(hljs2) {
  const regex = hljs2.regex;
  const RESERVED_WORDS = [
    // 'and',
    // 'as',
    // 'assert',
    // 'async',
    // 'await',
    // 'break',
    // 'case',
    // 'class',
    // 'continue',
    // 'def',
    // 'del',
    // 'elif',
    // 'else',
    // 'except',
    // 'finally',
    // 'for',
    // 'from',
    // 'global',
    // 'if',
    // 'import',
    // 'in',
    // 'is',
    // 'lambda',
    // 'match',
    // 'nonlocal|10',
    // 'not',
    // 'or',
    // 'pass',
    // 'raise',
    // 'return',
    // 'try',
    // 'while',
    // 'with',
    // 'yield',
  ];
  const BUILT_INS = [
    "$",
    "%",
    "set",
    "var",
    "talk",
    "think",
    "jump",
    "run",
    "wait",
    "return",
    "save",
    "save_prompt",
    "log",
    "clear_dialog",
    "set_screen",
    "empty_layer",
    "set_button",
    "play",
    "pause",
    "stop",
    "notify",
    "enable_notifications",
    "disable_notifications",
    "set_stat",
    "get_stat_value",
    "add_stat",
    "neg",
    "abs",
    "random",
    "random_float",
    "random_from_args",
    "min",
    "max",
    "clamp",
    "floor",
    "round",
    "ceil",
    "sqrt",
    "^",
    "concat",
    "join",
    "text_field",
    "add_level",
    "set_level",
    "add_xp",
    "roll",
    "get_level",
    "get_xp",
    "add_item",
    "remove_item",
    "enable_interaction",
    "disable_interaction",
    "has_item?",
    "item_amount?",
    "start_quest",
    "start_objective",
    "complete_objective",
    "complete_quest",
    "quest_started",
    "objective_started?",
    "quest_completed?",
    "objective_completed?",
    // Other keywords
    "if",
    "choice",
    "elseif",
    "else",
    "&&",
    "||",
    "!=",
    "==",
    ">=",
    "<=",
    "<",
    ">",
    "!",
    "+",
    "-",
    "*",
    "/"
  ];
  const LITERALS = ["false", "true"];
  const KEYWORDS = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: BUILT_INS,
    // built_in: BUILT_INS,
    literal: LITERALS
  };
  const PROMPT = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  };
  const VARIABLE = {
    variants: [
      {
        begin: /\$[\w\.\[\]\d]+/,
        end: /(?=[ $\)\}])/,
        excludeEnd: true
      },
      {
        begin: /data\.[\w\d\.\[\]]+/,
        end: /(?=[\s\)\]])/,
        excludeEnd: true
      }
    ],
    className: "variable"
  };
  const SUBST = {
    className: "subst",
    begin: /%\{/,
    end: /\}/,
    keywords: KEYWORDS,
    contains: [VARIABLE]
  };
  const STRING = {
    className: "string",
    contains: [hljs2.BACKSLASH_ESCAPE],
    begin: '"',
    end: '"'
  };
  STRING.contains = [SUBST];
  const digitpart = "[0-9](_?[0-9])*";
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  const lookahead = `\\b|${RESERVED_WORDS.join("|")}`;
  const NUMBER = {
    className: "number",
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
        begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead})`
      },
      {
        begin: `(${pointfloat})[jJ]?`
      },
      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead})`
      },
      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${digitpart})[jJ](?=${lookahead})`
      }
    ]
  };
  const COMMENT_TYPE = {
    className: "comment",
    begin: regex.lookahead(/\/\//),
    end: /$/,
    keywords: KEYWORDS,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: true
      }
    ]
  };
  ({
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: ["self", PROMPT, NUMBER, STRING, hljs2.HASH_COMMENT_MODE]
      }
    ]
  });
  const LABEL_NAME_REG = /^[\w\d]+/;
  const NARRAT_LABEL = {
    begin: LABEL_NAME_REG,
    end: /: */,
    excludeEnd: true,
    className: "title.function"
  };
  const NARRAT_LABEL_CONTENT = {
    begin: /^ */,
    end: /(?=\n[\w\d])/,
    excludeBegin: true,
    excludeEnd: true
  };
  const NARRAT_BODY = {
    endsWithParent: true,
    relevance: 0,
    keywords: KEYWORDS
  };
  const EXPRESSION = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS
  };
  NARRAT_LABEL_CONTENT.contains = [NARRAT_BODY];
  NARRAT_BODY.contains = [
    // {
    //   className: 'name',
    //   variants: [
    //     {
    //       begin: NARRAT_IDENT_RE,
    //       relevance: 0,
    //     },
    //     // { begin: MEC_RE }
    //   ],
    // },
    // PROMPT,
    NUMBER,
    // { match: /\bor\b/, scope: 'keyword' },
    STRING,
    COMMENT_TYPE,
    VARIABLE,
    EXPRESSION
    // hljs.HASH_COMMENT_MODE,
    // {
    //   match: [/\bdef/, /\s+/, IDENT_RE],
    //   scope: {
    //     1: 'keyword',
    //     3: 'title.function',
    //   },
    //   contains: [PARAMS],
    // },
    // {
    //   variants: [
    //     {
    //       match: [
    //         /\bclass/,
    //         /\s+/,
    //         IDENT_RE,
    //         /\s*/,
    //         /\(\s*/,
    //         IDENT_RE,
    //         /\s*\)/,
    //       ],
    //     },
    //     {
    //       match: [/\bclass/, /\s+/, IDENT_RE],
    //     },
    //   ],
    //   scope: {
    //     1: 'keyword',
    //     3: 'title.class',
    //     6: 'title.class.inherited',
    //   },
    // },
    // {
    //   className: 'meta',
    //   begin: /^[\t ]*@/,
    //   end: /(?=#)|$/,
    //   contains: [NUMBER, PARAMS, STRING],
    // },
  ];
  EXPRESSION.contains = ["self", NARRAT_BODY];
  return {
    name: "Narrat",
    aliases: ["narrat", "nar"],
    unicodeRegex: true,
    keywords: KEYWORDS,
    // illegal: /(<\/|\?)|=>/,
    contains: [NARRAT_LABEL, COMMENT_TYPE, NARRAT_LABEL_CONTENT]
  };
}
let codeInput;
let codeInputResolver;
let codeInputPromise;
function lookForCodeInput() {
  if (window.codeInput) {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("python", python);
    hljs.registerLanguage("narrat", narrat);
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("yaml", yaml);
    codeInput = window.codeInput;
    codeInput.registerTemplate(
      "syntax-highlighted",
      codeInput.templates.hljs(
        hljs,
        []
        /* Array of plugins (see below) */
      )
    );
    codeInputResolver(codeInput);
  } else {
    setTimeout(lookForCodeInput, 100);
  }
}
async function getCodeInput() {
  if (codeInputPromise) {
    return codeInputPromise;
  } else {
    codeInputPromise = new Promise((resolve) => {
      codeInputResolver = resolve;
    });
    lookForCodeInput();
  }
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NarratPreview",
  __ssrInlineRender: true,
  props: {
    scriptContent: {},
    autoJumpOnChange: { type: Boolean },
    codeHeight: {}
  },
  setup(__props) {
    const narratContainer = ref(null);
    const isNarratRunning = ref(false);
    async function importNarrat() {
      const narrat22 = await import("./narrat.es.zc9Omtqt.js");
      return narrat22;
    }
    const narrat2 = shallowRef(null);
    const loaded = ref(false);
    const props = __props;
    const script = ref({
      fileName: "demo-script.narrat",
      code: props.scriptContent,
      id: "demo-script",
      type: "script"
    });
    function scriptToNarratModule() {
      return {
        default: {
          fileName: script.value.fileName,
          code: script.value.code,
          id: script.value.id,
          type: "script"
        }
      };
    }
    function codeInputChanged(el) {
      const newCode = el.target.value;
      script.value.code = newCode;
      narrat2.value.handleHMR(scriptToNarratModule());
      if (props.autoJumpOnChange) {
        jumpBackToLabel();
      }
    }
    onMounted(async () => {
      await readyCodeInput();
      loaded.value = true;
      narrat2.value = await importNarrat();
      launchNarratGame();
    });
    async function readyCodeInput() {
      const codeInput2 = await getCodeInput();
      console.log("uwu ", codeInput2);
    }
    function launchNarratGame() {
      if (narratContainer.value) {
        if (!isNarratRunning.value) {
          startNarratApp();
        }
      } else {
        console.error("narratContainer is null");
      }
    }
    function jumpBackToLabel() {
      const vm = narrat2.value.useVM();
      vm.jumpToLabel("main");
    }
    function startNarratApp() {
      narrat2.value.startApp({
        debug: true,
        logging: false,
        scripts: [script.value],
        container: narratContainer.value,
        config: gameConfig
      });
      isNarratRunning.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (loaded.value) {
        _push(`<code-input lang="narrat" placeholder="Type code here" template="syntax-highlighted"${ssrRenderAttr("oninput", codeInputChanged)} style="${ssrRenderStyle({
          width: "100%",
          height: props.codeHeight + "px"
        })}" data-v-882f7474>${ssrInterpolate(props.scriptContent)}</code-input>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="narrat-preview" data-v-882f7474></div><!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NarratPreview.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const NarratPreview = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-882f7474"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NarratSnippetClient",
  __ssrInlineRender: true,
  props: {
    scriptContent: {},
    autoJumpOnChange: { type: Boolean },
    codeHeight: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(NarratPreview, {
              scriptContent: _ctx.scriptContent,
              autoJumpOnChange: _ctx.autoJumpOnChange,
              codeHeight: _ctx.codeHeight
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(NarratPreview, {
                scriptContent: _ctx.scriptContent,
                autoJumpOnChange: _ctx.autoJumpOnChange,
                codeHeight: _ctx.codeHeight
              }, null, 8, ["scriptContent", "autoJumpOnChange", "codeHeight"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NarratSnippetClient.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Editing a narrat game","description":"This documentation page explains how to edit a narrat game","frontmatter":{"description":"This documentation page explains how to edit a narrat game"},"headers":[],"relativePath":"guides/editing-game.md","filePath":"guides/editing-game.md","lastUpdated":1706638399000}');
const __default__ = { name: "guides/editing-game.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const demoScript = `main:
  think player idle "Where am I..."
  choice:
    talk narrat idle "You just woke up in some sort of game engine demo."
    "I'm in a game engine?":
      talk narrat idle "Yes, you're inside an example narrat game with the documentation website."
    "What?":
      talk narrat idle "Eh, you'll get it later."
  think player idle "I see..."`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FeedbackForm = resolveComponent("FeedbackForm");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="editing-a-narrat-game" tabindex="-1">Editing a narrat game <a class="header-anchor" href="#editing-a-narrat-game" aria-label="Permalink to &quot;Editing a narrat game&quot;">​</a></h1><p>There are two types of content to edit to make a narrat game:</p><ul><li>Dialogue scripts: <code>.narrat</code> files that contain the branching narrative of the game</li><li>Config files: <code>.yaml</code> files that contain config data about the game</li></ul><h2 id="example-narrat-game" tabindex="-1">Example narrat game <a class="header-anchor" href="#example-narrat-game" aria-label="Permalink to &quot;Example narrat game&quot;">​</a></h2><p>Here&#39;s an example narrat game with the following <code>.narrat</code> script:</p>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        scriptContent: demoScript,
        autoJumpOnChange: true,
        codeHeight: 300
      }, null, _parent));
      _push(`<h2 id="opening-the-narrat-project-and-getting-ready-to-edit-files" tabindex="-1">Opening the narrat project and getting ready to edit files <a class="header-anchor" href="#opening-the-narrat-project-and-getting-ready-to-edit-files" aria-label="Permalink to &quot;Opening the narrat project and getting ready to edit files&quot;">​</a></h2><p><strong>A narrat game is just a folder with files in it</strong>. To start editing your game, open that folder in your text editor (VS Code).</p><ol><li>Open VS Code</li><li>In &quot;File&quot; menu, click &quot;Open Folder&quot;</li><li>Choose the folder of the narrat game you created</li><li>Now you can browse the files.</li><li>A lot of the files may not be relevant to you and you don&#39;t need to worry about them outside of advanced usage.</li><li>Most of the files you&#39;re interested in will be in the <code>public/data</code> folders (where assets and config are), and the <code>src/scripts</code> folder (where code and narrat scripts are)</li></ol><p><img${ssrRenderAttr("src", _imports_0)} alt="Open a folder in VS Code"></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Install the <a href="https://marketplace.visualstudio.com/items?itemName=NarratEngine.language-narrat" target="_blank" rel="noreferrer">Narrat Language</a> Visual Studio Code extension to get pretty syntax highlighting when editing narrat scripts.</p><p>VS Code should prompt you to install it when you open a narrat game. If not, click on the Extensions button on the left, then type &quot;Narrat&quot; in the search bar and install the extension.</p><p><img${ssrRenderAttr("src", _imports_1)} alt="Narrat VS Code extension install process"></p></div><h2 id="what-s-in-a-narrat-game" tabindex="-1">What&#39;s in a narrat game? <a class="header-anchor" href="#what-s-in-a-narrat-game" aria-label="Permalink to &quot;What&#39;s in a narrat game?&quot;">​</a></h2><p>The following sections will explain what folders and files are important to know about to edit your narrat game.</p><h3 id="public-folder" tabindex="-1"><code>public</code> folder <a class="header-anchor" href="#public-folder" aria-label="Permalink to &quot;\`public\` folder&quot;">​</a></h3><p>The assets (image, music etc) and config files are inside the <code>public</code> folder from the root of the game. This public folder is a folder for static assets which will be added to the final build.</p><p>Any image, config file, or other asset that the game needs to load outside of code will be in this folder.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Assets in the public folder can be referred via their path from that folder. For example in css, to use an image that is in <code>public/img/button-background.png</code>, you would use <code>/img/button-background.png</code>.</p></div><h3 id="src-folder" tabindex="-1"><code>src</code> folder <a class="header-anchor" href="#src-folder" aria-label="Permalink to &quot;\`src\` folder&quot;">​</a></h3><p>The <code>src</code> folder is where scripts live. There are TypeScript files to setup the engine (which you won&#39;t normally need to edit), and more importantly in the <code>script</code> subfolder are the <code>.narrat</code> script files that make up your game.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>For advanced uses, it is also possible to change code itself or integrate plugins, which also would be in the <code>src</code> folder.</p></div><h2 id="narrat-scripts" tabindex="-1">Narrat scripts <a class="header-anchor" href="#narrat-scripts" aria-label="Permalink to &quot;Narrat scripts&quot;">​</a></h2><p><a href="./../examples/example-narrat-script.html">example-narrat-script.md</a></p><p>Narrat scripts are the main way a game is created. They contain the flow of the game and lines of dialogue. The <a href="./../scripting/language-syntax.html">narrat scripting language</a> is specifically made for narrat.</p><p>In the <code>src/scripts</code> folder of the game, there is a <code>game.narrat</code> file (or named differently depending on which template you used). This is where the actual game dialogue is written. The example dialogue there shows how to use a few basic features, so you can easily start writing your own dialogue. Just above is a link to the example narrat script page to find more examples as needed.</p><h3 id="importing-scripts" tabindex="-1">Importing scripts <a class="header-anchor" href="#importing-scripts" aria-label="Permalink to &quot;Importing scripts&quot;">​</a></h3><p>All the narrat scripts used in a game are imported and listed in <code>src/scripts.ts</code>. If you want to add or remove narrat scripts from your game, import them at the top of that file and remember to add or remove them from the list of scripts exported at the end of the file.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You can make your entire game in a single script file if you want, but it&#39;s useful for organisation to separate it into multiple files. Just remember to import them like below</p></div><p>Example <code>scripts.ts</code>:</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> demo </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;./scripts/demo.narrat&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> quest </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;./scripts/quest.narrat&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">export</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> default</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [demo, quest];</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Narrat scripts are in a custom language nade for narrat, see the <a href="./../scripting/language-syntax.html">language syntax guide</a> page for more info.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>We advise using <a href="https://code.visualstudio.com" target="_blank" rel="noreferrer">Visual Studio Code</a> for editing narrat scripts. There is a <a href="https://marketplace.visualstudio.com/items?itemName=NarratEngine.language-narrat" target="_blank" rel="noreferrer">Narrat Language VS Code extension</a> which will give you great syntax highlighting.</p></div><p>See the <a href="./../scripting/language-syntax.html">language syntax guide</a> to learn more about how to edit narrat scripts.</p><h3 id="example-scripts" tabindex="-1">Example scripts <a class="header-anchor" href="#example-scripts" aria-label="Permalink to &quot;Example scripts&quot;">​</a></h3><p>There are a number of <a href="./../examples/example-narrat-script.html">example narrat scripts</a> available. Reading through their <code>.narrat</code> script files can be a good support for finding out how to do various things.</p><h2 id="config-files" tabindex="-1">Config files <a class="header-anchor" href="#config-files" aria-label="Permalink to &quot;Config files&quot;">​</a></h2><p>There are various config files in narrat games which allow to extensively customise how the engine behaves.</p><p>By default, games ship with a default config so you don&#39;t need to do anything. As you start using more features, you will need to edit the config as needed.</p><h3 id="config-yaml" tabindex="-1">config.yaml <a class="header-anchor" href="#config-yaml" aria-label="Permalink to &quot;config.yaml&quot;">​</a></h3><p>The config file contains basic info about the game. In it are defined images, screens, buttons, musics, skill checks, items, quests and more.</p><p>More info about the config files in the <a href="./config-files.html">Config Files guide</a></p><h3 id="characters-yaml" tabindex="-1">characters.yaml <a class="header-anchor" href="#characters-yaml" aria-label="Permalink to &quot;characters.yaml&quot;">​</a></h3><p>The <code>characters.yaml</code> file contains the config for all characters that can speak in the game. They should all at least have a name value, and an <code>idle</code> sprite. The sprite is used for displaying character portraits during dialogue, and the value should be a file path relative to the <code>imagesPath</code> value defined in the config part of this file</p><p>The color character names appears as can be changed with the <code>color</code> value in the <code>style</code> property of the character (the value can be any valid CSS color).</p><p>See more details at <a href="./../features/characters-and-portraits.html">characters and portraits</a></p><h3 id="other-config-files" tabindex="-1">Other config files <a class="header-anchor" href="#other-config-files" aria-label="Permalink to &quot;Other config files&quot;">​</a></h3><p>There are individual config files for most narrat features which you can edit. The best way to learn about them is to look at example games and see how they are used.</p><ul><li><a href="https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games" target="_blank" rel="noreferrer">Example test games in the narrat repo</a></li><li><a href="https://github.com/liana-p/narrat-examples" target="_blank" rel="noreferrer">Example games in the narrat-examples repo</a></li></ul><h2 id="what-s-next" tabindex="-1">What&#39;s next? <a class="header-anchor" href="#what-s-next" aria-label="Permalink to &quot;What&#39;s next?&quot;">​</a></h2><p>To make your game, open your <code>.narrat</code> script files and start writing your game!</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>You can look at the sidebar on the left of this documentation website to find various guides and pages about narrat features and how to use them.</strong></p></div><p>There are other things you might want to learn about, so here are some ideas:</p><h3 id="language-syntax-guide" tabindex="-1">Language Syntax Guide <a class="header-anchor" href="#language-syntax-guide" aria-label="Permalink to &quot;Language Syntax Guide&quot;">​</a></h3><p><a href="./../scripting/language-syntax.html">Learn the narrat scripting syntax</a> to write your game.</p><h3 id="all-commands-reference-cheatsheet" tabindex="-1">All commands reference cheatsheet <a class="header-anchor" href="#all-commands-reference-cheatsheet" aria-label="Permalink to &quot;All commands reference cheatsheet&quot;">​</a></h3><p><a href="./../commands/all-commands.html">This page</a> contains a cheatsheet table of all the commands available for use in narrat scripts.</p><h3 id="viewport" tabindex="-1">Viewport <a class="header-anchor" href="#viewport" aria-label="Permalink to &quot;Viewport&quot;">​</a></h3><p><a href="./../features/viewport.html">Learn about the viewport</a> to add visual backgrounds and interactive buttons to the viewport of your game</p><h3 id="ui-theming-and-customisation-guide" tabindex="-1">UI Theming and customisation guide <a class="header-anchor" href="#ui-theming-and-customisation-guide" aria-label="Permalink to &quot;UI Theming and customisation guide&quot;">​</a></h3><p><a href="./../guides/customising-ui.html">Learn how to theme your game visually with CSS</a></p><h3 id="building-and-releasing-your-game" tabindex="-1">Building and releasing your game <a class="header-anchor" href="#building-and-releasing-your-game" aria-label="Permalink to &quot;Building and releasing your game&quot;">​</a></h3><p><a href="./../guides/building-and-exporting.html">Learn how to make a build of your game to release it</a></p><h3 id="skills-system" tabindex="-1">Skills System <a class="header-anchor" href="#skills-system" aria-label="Permalink to &quot;Skills System&quot;">​</a></h3><p><a href="./../features/skills.html">Learn how to use the skills system</a></p><h3 id="inventory-system" tabindex="-1">Inventory system <a class="header-anchor" href="#inventory-system" aria-label="Permalink to &quot;Inventory system&quot;">​</a></h3><p><a href="./../features/inventory.html">Learn how to use the inventory system</a></p><h3 id="updating-narrat" tabindex="-1">Updating Narrat <a class="header-anchor" href="#updating-narrat" aria-label="Permalink to &quot;Updating Narrat&quot;">​</a></h3><p>It&#39;s important to know <a href="./updating-narrat.html">how to update narrat</a> to get the frequently released new features and bug fixes.</p>`);
      _push(ssrRenderComponent(_component_FeedbackForm, {
        title: "Editing the game",
        slug: "guides/editing-game"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guides/editing-game.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
