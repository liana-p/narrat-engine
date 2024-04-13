import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Useful Links","description":"This page contains a list of important and useful links","frontmatter":{"description":"This page contains a list of important and useful links"},"headers":[],"relativePath":"others/useful-links.md","filePath":"others/useful-links.md","lastUpdated":1687035500000}');
const _sfc_main = { name: "others/useful-links.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="useful-links" tabindex="-1">Useful Links <a class="header-anchor" href="#useful-links" aria-label="Permalink to &quot;Useful Links&quot;">​</a></h1><ul><li>Narrat <a href="https://github.com/liana-p/narrat-engine" target="_blank" rel="noreferrer">GitHub repo</a></li><li><a href="https://github.com/liana-p/narrat-engine/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer">Changelog</a> (Find out what&#39;s different between your version and newer ones, including potential breaking changes!)</li><li><a href="https://nalaria.itch.io/narrat" target="_blank" rel="noreferrer">itch.io page</a></li><li><a href="https://narrat.dev/" target="_blank" rel="noreferrer">Narrat website</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("others/useful-links.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const usefulLinks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  usefulLinks as default
};
