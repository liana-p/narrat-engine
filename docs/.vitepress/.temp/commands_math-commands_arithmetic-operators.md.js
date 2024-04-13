import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Math operators (+ - * /)","description":"","frontmatter":{},"headers":[],"relativePath":"commands/math-commands/arithmetic-operators.md","filePath":"commands/math-commands/arithmetic-operators.md","lastUpdated":1665596305000}');
const _sfc_main = { name: "commands/math-commands/arithmetic-operators.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="math-operators" tabindex="-1">Math operators (+ - * /) <a class="header-anchor" href="#math-operators" aria-label="Permalink to &quot;Math operators (+ - \\* /)&quot;">​</a></h1><h3 id="operators" tabindex="-1">Operators <a class="header-anchor" href="#operators" aria-label="Permalink to &quot;Operators&quot;">​</a></h3><p>In narrat, everything is a command, including mathematical operators. There are commands for the following operators.</p><p>They are used by using the keyword of the operator (the command) followed by its parameters, like any other command in narrat.</p><p>Example:</p><p><code>set player.hp (+ player.hp $healAmount</code>)</p><p>Availale:</p><p><code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, </p><p>Other examples:</p><p><code>(/ 1 2)</code> Will divide 1 by 2</p><p><code>(* 1 2)</code> will multiply 1 by 2</p><p><code>(+ 1 2 3 4)</code> Will add 1 2 3 4</p><p><code>(- 2 1)</code> will substract 1 to 2</p><p>Those operators can accept any amount of parameters, so you can add/substract/multiply/divide many things at once </p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/math-commands/arithmetic-operators.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const arithmeticOperators = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  arithmeticOperators as default
};
