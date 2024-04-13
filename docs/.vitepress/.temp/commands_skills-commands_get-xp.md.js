import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Get XP","description":"","frontmatter":{},"headers":[],"relativePath":"commands/skills-commands/get-xp.md","filePath":"commands/skills-commands/get-xp.md","lastUpdated":1665596305000}');
const _sfc_main = { name: "commands/skills-commands/get-xp.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="get-xp" tabindex="-1">Get XP <a class="header-anchor" href="#get-xp" aria-label="Permalink to &quot;Get XP&quot;">​</a></h1><p>The <code>get_xp</code> command in narrat returns the amount of xp the player has in a skill</p><p>Syntax: <code>get_xp [skill]</code></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/skills-commands/get-xp.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const getXp = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  getXp as default
};
