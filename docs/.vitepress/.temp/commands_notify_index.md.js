import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Notify","description":"The notify function in narrat makes a notification appear on the screen","frontmatter":{"description":"The notify function in narrat makes a notification appear on the screen"},"headers":[],"relativePath":"commands/notify/index.md","filePath":"commands/notify/index.md","lastUpdated":1687862260000}');
const _sfc_main = { name: "commands/notify/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="notify" tabindex="-1">Notify <a class="header-anchor" href="#notify" aria-label="Permalink to &quot;Notify&quot;">​</a></h1><p>The notify function in narrat makes a notification appear on the screen</p><p>Syntax <code>notify [text]</code></p><p>Example:</p><div class="language-narrat vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">narrat</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">notify </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Hello world!&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Notifications appear on the corner of the screen with the provided text and stay on screen for some time as setup in the <code>notifications</code> part of the config</p><p>Some notifications also appear automatically, created by the engine. For example on level up.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/notify/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
