import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Left-side Viewport commands","description":"","frontmatter":{},"headers":[],"relativePath":"commands/left-side-viewport-commands/README.md","filePath":"commands/left-side-viewport-commands/README.md","lastUpdated":1665596305000}');
const _sfc_main = { name: "commands/left-side-viewport-commands/README.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="left-side-viewport-commands" tabindex="-1">Left-side Viewport commands <a class="header-anchor" href="#left-side-viewport-commands" aria-label="Permalink to &quot;Left-side Viewport commands&quot;">​</a></h1><p>Commands in this group allow interacting with the viewport on the left of the dialogue</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/left-side-viewport-commands/README.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const README = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  README as default
};
