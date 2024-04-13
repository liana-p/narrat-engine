import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Other math operations","description":"","frontmatter":{},"headers":[],"relativePath":"commands/math-commands/other-math-operations.md","filePath":"commands/math-commands/other-math-operations.md","lastUpdated":1665596305000}');
const _sfc_main = { name: "commands/math-commands/other-math-operations.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="other-math-operations" tabindex="-1">Other math operations <a class="header-anchor" href="#other-math-operations" aria-label="Permalink to &quot;Other math operations&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Most of the functions below are implemented the same way as their counterpart in JavaScript, and often use it under the hood</p></div><h3 id="absolute-numbers-and-negative-numbers" tabindex="-1">Absolute numbers and negative numbers <a class="header-anchor" href="#absolute-numbers-and-negative-numbers" aria-label="Permalink to &quot;Absolute numbers and negative numbers&quot;">​</a></h3><ul><li><code>abs [number]</code> Returns absolute value for number (makes it positive)</li><li><code>neg [number]</code>: Makes number negative</li></ul><h3 id="keeping-numbers-between-minimum-and-maximums" tabindex="-1">Keeping numbers between minimum and maximums: <a class="header-anchor" href="#keeping-numbers-between-minimum-and-maximums" aria-label="Permalink to &quot;Keeping numbers between minimum and maximums:&quot;">​</a></h3><ul><li><code>min [number1] [number2]</code>: Returns the <strong>smallest</strong> of the two numbers</li><li><code>max [number1] [number2]</code>: Returns the <strong>biggest</strong> of the two numbers</li><li><code>clamp [min] [max] [value]</code>: Returns value, or min if value is below min, or max if value is above max</li></ul><h3 id="rounding-numbers" tabindex="-1">Rounding numbers <a class="header-anchor" href="#rounding-numbers" aria-label="Permalink to &quot;Rounding numbers&quot;">​</a></h3><ul><li><code>floor [number]</code>: Rounds [number] <strong>down</strong> to an integer (ie. 1.7 becomes 1)</li><li><code>ceil [number]:</code> Rounds [number] <strong>up</strong> to an integer (1.2 becomes 2)</li><li><code>round [number]</code>: Rounds [number] to <strong>nearest</strong> integer. 1.2 becomes 1, 1.8 becomes 2, 1.5 becomes 2, 1.49999 becomes 1</li></ul><h3 id="powers" tabindex="-1">Powers <a class="header-anchor" href="#powers" aria-label="Permalink to &quot;Powers&quot;">​</a></h3><ul><li><code>sqrt [number]</code>: Returns square root of the number</li><li><code>^ [base] [exponent]</code>: Returns [base] to the power of [exponent]</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/math-commands/other-math-operations.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const otherMathOperations = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  otherMathOperations as default
};
