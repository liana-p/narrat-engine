import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Méthode via template (déprécié)","description":"","frontmatter":{},"headers":[],"relativePath":"fr/guides/old-template-method.md","filePath":"fr/guides/old-template-method.md","lastUpdated":1706968256000}');
const _sfc_main = { name: "fr/guides/old-template-method.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="methode-via-template-deprecie" tabindex="-1">Méthode via template (déprécié) <a class="header-anchor" href="#methode-via-template-deprecie" aria-label="Permalink to &quot;Méthode via template (déprécié)&quot;">​</a></h1><p>Le template Narrat a été archivé. Veuillez utiliser l&#39;outil <code>create-narrat</code>.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("fr/guides/old-template-method.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const oldTemplateMethod = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  oldTemplateMethod as default
};
