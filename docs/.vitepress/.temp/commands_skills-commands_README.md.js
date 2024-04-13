import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Skills Commands","description":"Narrat has a skills feature with many commands relating to it","frontmatter":{"description":"Narrat has a skills feature with many commands relating to it"},"headers":[],"relativePath":"commands/skills-commands/README.md","filePath":"commands/skills-commands/README.md","lastUpdated":1665596305000}');
const _sfc_main = { name: "commands/skills-commands/README.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="skills-commands" tabindex="-1">Skills Commands <a class="header-anchor" href="#skills-commands" aria-label="Permalink to &quot;Skills Commands&quot;">​</a></h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/skills-commands/README.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const README = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  README as default
};
