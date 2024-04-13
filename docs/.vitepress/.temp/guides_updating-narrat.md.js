import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./image.Zvn4Vzwq.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Updating narrat","description":"Narrat frequently updates with new features, improvements and fixes, so it is advised to keep up to date.","frontmatter":{"description":"Narrat frequently updates with new features, improvements and fixes, so it is advised to keep up to date."},"headers":[],"relativePath":"guides/updating-narrat.md","filePath":"guides/updating-narrat.md","lastUpdated":1696802452000}');
const _sfc_main = { name: "guides/updating-narrat.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="updating-narrat" tabindex="-1">Updating narrat <a class="header-anchor" href="#updating-narrat" aria-label="Permalink to &quot;Updating narrat&quot;">​</a></h1><h2 id="the-changelog" tabindex="-1">The changelog <a class="header-anchor" href="#the-changelog" aria-label="Permalink to &quot;The changelog&quot;">​</a></h2><p>Before updating, it is worth noting that there is a <a href="https://github.com/liana-p/narrat-engine/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer">changelog</a> on GitHub showing what&#39;s been changed in recent versions.</p><p>When there is a <strong>breaking change</strong> (that is, a change in the engine that requires a game developer to change something in their game to not break), it is mentioned very clearly in the changelog.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>When updating to a new version, it&#39;s a good idea to at least check for <strong>breaking changes</strong> in the changelog</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>There are many new features frequently added to narrat which aren&#39;t always documented, so looking at the changelog can be a way of discovering new features.</p></div><h2 id="how-to-update" tabindex="-1">How to update <a class="header-anchor" href="#how-to-update" aria-label="Permalink to &quot;How to update&quot;">​</a></h2><p>The narrat version used in a game is the one specified in the <code>dependencies</code> part of the <code>package.json</code> file at the root of the game. For example:</p><p><img${ssrRenderAttr("src", _imports_0)} alt="package.json"></p><p>To update, simply run the command <code>npm install narrat@latest</code> in the terminal, which will pick up the latest released version.</p><p>Otherwise, it is also possible to put a specific version number in <code>package.json</code> and then run <code>npm install</code> to install that version.</p><p>To find out what versions exist and which is the latest released, visit the <a href="https://www.npmjs.com/package/narrat" target="_blank" rel="noreferrer">npm page for narrat</a></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Sometimes npm doesn&#39;t pick up new versions. If you&#39;re not sure narrat updated correctly, try deleting the whole <code>node_modules</code> folder (where libraries get installed) and re-running <code>npm install</code>.</p><p>You can also check <a href="https://docs.narrat.dev/troubleshooting/troubleshooting.html#check-which-version-of-narrat-is-running" target="_blank" rel="noreferrer">which exact build of narrat is running</a></p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guides/updating-narrat.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const updatingNarrat = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  updatingNarrat as default
};
