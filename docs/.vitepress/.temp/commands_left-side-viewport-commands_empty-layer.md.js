import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Empty layer","description":"","frontmatter":{},"headers":[],"relativePath":"commands/left-side-viewport-commands/empty-layer.md","filePath":"commands/left-side-viewport-commands/empty-layer.md","lastUpdated":1665596305000}');
const _sfc_main = { name: "commands/left-side-viewport-commands/empty-layer.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="empty-layer" tabindex="-1">Empty layer <a class="header-anchor" href="#empty-layer" aria-label="Permalink to &quot;Empty layer&quot;">​</a></h1><p>The <code>empty_layer</code> command removes the screen on a specified layer:</p><p>Syntax: <code>empty_layer [layerNumber]</code></p><p>Useful to remove a temporary screen effect after adding it</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/left-side-viewport-commands/empty-layer.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const emptyLayer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  emptyLayer as default
};
