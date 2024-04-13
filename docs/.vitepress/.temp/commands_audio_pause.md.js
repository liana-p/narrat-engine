import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Pause","description":"The pause function in narrat pauses audio","frontmatter":{"description":"The pause function in narrat pauses audio"},"headers":[],"relativePath":"commands/audio/pause.md","filePath":"commands/audio/pause.md","lastUpdated":1681645040000}');
const _sfc_main = { name: "commands/audio/pause.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="pause" tabindex="-1">Pause <a class="header-anchor" href="#pause" aria-label="Permalink to &quot;Pause&quot;">​</a></h1><p>Works the same as the <a href="./stop.html">stop </a>function, but pauses instead of stopping</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/audio/pause.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pause = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  pause as default
};
