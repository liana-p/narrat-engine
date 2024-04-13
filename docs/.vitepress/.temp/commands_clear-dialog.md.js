import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Clear Dialog","description":"The clear_dialog function empties the dialogue screen of previous entries","frontmatter":{"description":"The clear_dialog function empties the dialogue screen of previous entries"},"headers":[],"relativePath":"commands/clear-dialog.md","filePath":"commands/clear-dialog.md","lastUpdated":1687862260000}');
const _sfc_main = { name: "commands/clear-dialog.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="clear-dialog" tabindex="-1">Clear Dialog <a class="header-anchor" href="#clear-dialog" aria-label="Permalink to &quot;Clear Dialog&quot;">​</a></h1><div class="language-narrat vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">narrat</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">clear_dialog</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Use <code>clear_dialog</code> to empty the dialogue screen on the right of all previous entries. Useful on scene transitions or for dramatic effect.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/clear-dialog.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const clearDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  clearDialog as default
};
