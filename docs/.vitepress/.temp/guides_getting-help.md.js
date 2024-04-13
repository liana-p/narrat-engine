import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Getting Help","description":"Need help for something or stuck with an issue using narrat? We have support","frontmatter":{"description":"Need help for something or stuck with an issue using narrat? We have support"},"headers":[],"relativePath":"guides/getting-help.md","filePath":"guides/getting-help.md","lastUpdated":1687862260000}');
const _sfc_main = { name: "guides/getting-help.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="getting-help" tabindex="-1">Getting Help <a class="header-anchor" href="#getting-help" aria-label="Permalink to &quot;Getting Help&quot;">​</a></h1><h2 id="narrat-forum" tabindex="-1">Narrat Forum <a class="header-anchor" href="#narrat-forum" aria-label="Permalink to &quot;Narrat Forum&quot;">​</a></h2><p>Please create a thread on the <a href="https://narrat.discourse.group/c/help/5" target="_blank" rel="noreferrer">help forum</a> with as much information as you can, including: Any logs if relevant, narrat version, browser used, description of the issue, and what you&#39;ve attempted.</p><h3 id="discord-server" tabindex="-1">Discord server <a class="header-anchor" href="#discord-server" aria-label="Permalink to &quot;Discord server&quot;">​</a></h3><p>You can also ask for help <a href="https://discord.gg/Xgz7EQ2Xgh" target="_blank" rel="noreferrer">on Discord</a> if it&#39;s a small thing, but the forum is preferred as it&#39;s easier to keep track of issues and other people who have the same issue will be able to find that thread in the future.</p><h3 id="github-issues" tabindex="-1">GitHub issues <a class="header-anchor" href="#github-issues" aria-label="Permalink to &quot;GitHub issues&quot;">​</a></h3><p>It is also possible to open a <a href="https://github.com/liana-p/narrat-engine/issues" target="_blank" rel="noreferrer">GitHub issue</a> to report a bug or suggest a feature</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guides/getting-help.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const gettingHelp = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  gettingHelp as default
};
