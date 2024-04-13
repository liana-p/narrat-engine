import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const _imports_0 = "/assets/jump_example.pEPRw9qQ.gif";
const __pageData = JSON.parse('{"title":"Jump","description":"","frontmatter":{},"headers":[],"relativePath":"commands/api-jump.md","filePath":"commands/api-jump.md","lastUpdated":1688069147000}');
const _sfc_main = { name: "commands/api-jump.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="jump" tabindex="-1">Jump <a class="header-anchor" href="#jump" aria-label="Permalink to &quot;Jump&quot;">​</a></h1><h2 id="jump-function" tabindex="-1">Jump Function <a class="header-anchor" href="#jump-function" aria-label="Permalink to &quot;Jump Function&quot;">​</a></h2><p>The <code>jump</code> function allows you to jump to a <code>label</code>. Labels are how you break down your scripts in reuseable and manageable chunks. You can jump from any file to a label in any other file.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Jumping to a label will save the game. Saving is only done on label jump, because it makes saves able to handle game updates.</p><p>For example, if narrat tried to keep track of which specific line of dialogue the player is at, but after a game update that dialogue line was gone, it would break.</p><p>By using labels, we can save the last label that was reached and guarantee that it will still be there next time (as long as you don&#39;t delete the whole label from your script!)</p></div><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><p>Running this code will play the script inside <code>jump_example</code>, then run the script inside <code>label_to_jump</code></p><div class="language-narrat vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">narrat</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">label_to_jump</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    talk</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> cat idle </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;The code has now jumped to this label&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">jump_example</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    talk</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> cat idle </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Hello, this is an example about jumping to other labels&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    talk</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> cat idle </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Use the jump command to jump to a different label in any of your scripts&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    jump</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> label_to_jump</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img${ssrRenderAttr("src", _imports_0)} alt="Result of the above code"></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/api-jump.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiJump = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  apiJump as default
};
