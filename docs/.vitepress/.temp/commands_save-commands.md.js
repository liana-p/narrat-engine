import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Save Commands","description":"","frontmatter":{},"headers":[],"relativePath":"commands/save-commands.md","filePath":"commands/save-commands.md","lastUpdated":1681150451000}');
const _sfc_main = { name: "commands/save-commands.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="save-commands" tabindex="-1">Save Commands <a class="header-anchor" href="#save-commands" aria-label="Permalink to &quot;Save Commands&quot;">​</a></h1><p>There are two commands for manual saving:</p><h3 id="save" tabindex="-1">save <a class="header-anchor" href="#save" aria-label="Permalink to &quot;save&quot;">​</a></h3><p>Syntax: <code>save [save_name]</code>: Saves the game, with optionally save_name being the name to use for the file. If no save name provided, the engine will generate a default one</p><h3 id="save-prompt" tabindex="-1">save_prompt <a class="header-anchor" href="#save-prompt" aria-label="Permalink to &quot;save_prompt&quot;">​</a></h3><p>Same as save, but will ask the player if they want to save first, and cancel if they choose no</p><h3 id="more-info-about-saving" tabindex="-1">More info about saving <a class="header-anchor" href="#more-info-about-saving" aria-label="Permalink to &quot;More info about saving&quot;">​</a></h3><p><a href="./../features/save-and-load.html">saving-and-reloading.md</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/save-commands.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const saveCommands = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  saveCommands as default
};
