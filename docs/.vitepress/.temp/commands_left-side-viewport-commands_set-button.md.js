import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Set Button","description":"The set_button function allows enabling and disabling interactive buttons in screens","frontmatter":{"description":"The set_button function allows enabling and disabling interactive buttons in screens"},"headers":[],"relativePath":"commands/left-side-viewport-commands/set-button.md","filePath":"commands/left-side-viewport-commands/set-button.md","lastUpdated":1687862260000}');
const _sfc_main = { name: "commands/left-side-viewport-commands/set-button.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="set-button" tabindex="-1">Set Button <a class="header-anchor" href="#set-button" aria-label="Permalink to &quot;Set Button&quot;">​</a></h1><p>The <code>set_button</code> function can enable or disable a button in a screen.</p><p>Syntax: <code>set_button [buttonId] [true, greyed, hidden or false]</code></p><p>Refer to the <a href="./../../features/viewport.html">screens feature</a> guide for more info</p><p>Example:</p><div class="language-narrat vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">narrat</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">set_button parkButton </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="possible-values" tabindex="-1">Possible values <a class="header-anchor" href="#possible-values" aria-label="Permalink to &quot;Possible values&quot;">​</a></h3><ul><li><code>true</code>: Makes the button enabled and clickable (as long as clicking it is allowed, see <a href="./../../features/viewport.html#button-interaction-tags">screen buttons interaction tags</a>)</li><li><code>false</code>: Makes the button completely disabled and hidden</li><li><code>greyed</code>: Makes the button disabled and greyed. It will be visible with semi-opacity, but not clickable</li><li><code>hidden</code>: Same as <code>false</code></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/left-side-viewport-commands/set-button.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const setButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  setButton as default
};
