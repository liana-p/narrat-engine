import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const _imports_0 = "/assets/text-field.vxu7w4Jp.png";
const _imports_1 = "/assets/text-field-result.M6yFAqeJ.png";
const __pageData = JSON.parse('{"title":"Text Field","description":"In narrat, text fields can be used to ask the player to enter text","frontmatter":{"description":"In narrat, text fields can be used to ask the player to enter text"},"headers":[],"relativePath":"commands/text-field.md","filePath":"commands/text-field.md","lastUpdated":1688069147000}');
const _sfc_main = { name: "commands/text-field.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="text-field" tabindex="-1">Text Field <a class="header-anchor" href="#text-field" aria-label="Permalink to &quot;Text Field&quot;">​</a></h1><h4 id="new-feature-text-fields" tabindex="-1">New feature: Text Fields <a class="header-anchor" href="#new-feature-text-fields" aria-label="Permalink to &quot;New feature: Text Fields&quot;">​</a></h4><p>New text fields feature to let players type answers to questions.</p><p>Usage: <code>text_field [prompt]</code></p><p>Example:</p><div class="language-narrat vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">narrat</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">main</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">  set</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> player.name (</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">text_field</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;Enter your name&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  &quot;Your name is %{</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">playerName</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">}&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img${ssrRenderAttr("src", _imports_0)} alt="Text field example"></p><p><img${ssrRenderAttr("src", _imports_1)} alt="Text field result"></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/text-field.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const textField = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  textField as default
};
