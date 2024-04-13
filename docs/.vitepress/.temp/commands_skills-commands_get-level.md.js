import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Get Level","description":"","frontmatter":{},"headers":[],"relativePath":"commands/skills-commands/get-level.md","filePath":"commands/skills-commands/get-level.md","lastUpdated":1665596305000}');
const _sfc_main = { name: "commands/skills-commands/get-level.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="get-level" tabindex="-1">Get Level <a class="header-anchor" href="#get-level" aria-label="Permalink to &quot;Get Level&quot;">​</a></h1><p>The get level function in narrat returns the level of a skill</p><p>Syntax: <code>get_level [skill]</code></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/skills-commands/get-level.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const getLevel = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  getLevel as default
};
