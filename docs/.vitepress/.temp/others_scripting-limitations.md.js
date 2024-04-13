import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Known limmitations in narrat scripts","description":"This page lists known limitations and issues with narrat scripting","frontmatter":{"title":"Known limmitations in narrat scripts","description":"This page lists known limitations and issues with narrat scripting"},"headers":[],"relativePath":"others/scripting-limitations.md","filePath":"others/scripting-limitations.md","lastUpdated":1665851463000}');
const _sfc_main = { name: "others/scripting-limitations.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="known-limitations-in-narrat-scripts" tabindex="-1">Known limitations in narrat scripts <a class="header-anchor" href="#known-limitations-in-narrat-scripts" aria-label="Permalink to &quot;Known limitations in narrat scripts&quot;">​</a></h1><p>Narrat scripting is a custom made engine designed to make it easy to write dialogue. Because it does a lot of &quot;magic&quot; behind the scenes to mmake the engine easy to use, it has a few inherent limitations</p><h2 id="circular-references" tabindex="-1">Circular References <a class="header-anchor" href="#circular-references" aria-label="Permalink to &quot;Circular References&quot;">​</a></h2><p>Circular references in variables will cause issues with saving because the state is stringified</p><p>Note: This doesn&#39;t apply to screen objects which have special code for handling references.</p><h2 id="duplicated-references" tabindex="-1">Duplicated references <a class="header-anchor" href="#duplicated-references" aria-label="Permalink to &quot;Duplicated references&quot;">​</a></h2><p>Duplicated references to the same object can also be an issue because once the state is stringified for saving, the value will be duplicated instead of being a reference</p><p>Note: This doesn&#39;t apply to screen objects which have special code for handling references.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("others/scripting-limitations.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const scriptingLimitations = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  scriptingLimitations as default
};
