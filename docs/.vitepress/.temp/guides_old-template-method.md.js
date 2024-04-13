import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Old Template method","description":"","frontmatter":{},"headers":[],"relativePath":"guides/old-template-method.md","filePath":"guides/old-template-method.md","lastUpdated":1665531238000}');
const _sfc_main = { name: "guides/old-template-method.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="old-template-method" tabindex="-1">Old Template method <a class="header-anchor" href="#old-template-method" aria-label="Permalink to &quot;Old Template method&quot;">​</a></h1><p>The narrat template has been archived. Please use the create-narrat tool.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guides/old-template-method.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const oldTemplateMethod = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  oldTemplateMethod as default
};
