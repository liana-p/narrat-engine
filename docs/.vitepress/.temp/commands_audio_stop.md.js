import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Stop","description":"The stop function stops audio playing","frontmatter":{"description":"The stop function stops audio playing"},"headers":[],"relativePath":"commands/audio/stop.md","filePath":"commands/audio/stop.md","lastUpdated":1687862260000}');
const _sfc_main = { name: "commands/audio/stop.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="stop" tabindex="-1">Stop <a class="header-anchor" href="#stop" aria-label="Permalink to &quot;Stop&quot;">​</a></h1><h2 id="stop-function" tabindex="-1">Stop Function <a class="header-anchor" href="#stop-function" aria-label="Permalink to &quot;Stop Function&quot;">​</a></h2><p>The <code>stop</code> function stops audio, either music or sounds.</p><p>See <a href="./../../features/audio.html">playing audio</a> for more info on how to setup the audio system</p><p>Syntax: <code>play [mode] [channel]</code></p><ul><li>mode: <code>music, ambiant,</code> or <code>sound</code></li><li><code>channel:</code> The index of the channel to stop</li></ul><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-narrat vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">narrat</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">stop music</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">stop music </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/audio/stop.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const stop = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  stop as default
};
