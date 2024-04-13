import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Random Generation","description":"","frontmatter":{},"headers":[],"relativePath":"commands/random-generation.md","filePath":"commands/random-generation.md","lastUpdated":1665596305000}');
const _sfc_main = { name: "commands/random-generation.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="random-generation" tabindex="-1">Random Generation <a class="header-anchor" href="#random-generation" aria-label="Permalink to &quot;Random Generation&quot;">​</a></h1><p>Narrat has a few commands to generate numbers or choose random elements</p><ul><li><code>random [min] [max]</code>: Returns an <strong>integer</strong> between [min] and [max] (inclusive)</li><li><code>random_float [min] [max]</code>: Returns a random <strong>float</strong> between [min] and [max]</li><li><code>random_from_args [arg1] [arg2] [arg3] ...</code>: Returns a random element from the args passed. Args can be any value. Useful to select a random element from a list of possibilities</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/random-generation.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const randomGeneration = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  randomGeneration as default
};
