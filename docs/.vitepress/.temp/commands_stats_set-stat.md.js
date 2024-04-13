import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Set Stat","description":"","frontmatter":{},"headers":[],"relativePath":"commands/stats/set-stat.md","filePath":"commands/stats/set-stat.md","lastUpdated":1687862260000}');
const _sfc_main = { name: "commands/stats/set-stat.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="set-stat" tabindex="-1">Set Stat <a class="header-anchor" href="#set-stat" aria-label="Permalink to &quot;Set Stat&quot;">​</a></h1><p>The set_stat function in narrat sets a HUD stat to a specified value</p><p>Syntax: <code>set_stat [statId] [value]</code></p><p>See <a href="./../../features/hud-stats.html">HUD Stats</a> page for more info on this feature</p><p>Example:</p><div class="language-narrat vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">narrat</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> set_stat</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> currency </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">100</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/stats/set-stat.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const setStat = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  setStat as default
};
