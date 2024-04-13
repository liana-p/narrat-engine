import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Gamepad Support","description":"","frontmatter":{},"headers":[],"relativePath":"features/gamepad.md","filePath":"features/gamepad.md","lastUpdated":1688400365000}');
const _sfc_main = { name: "features/gamepad.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="gamepad-support" tabindex="-1">Gamepad Support <a class="header-anchor" href="#gamepad-support" aria-label="Permalink to &quot;Gamepad Support&quot;">​</a></h1><p>As of 3.2.0, Narrat has a first basic version of gamepad support.</p><p>It works out of the box and you have nothing to configure.</p><p>Future updates will improve gamepad support and integrate it with more features, as well as allowing games to customise keybinds.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/gamepad.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const gamepad = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  gamepad as default
};
