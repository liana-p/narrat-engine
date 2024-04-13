import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Narrat mobile support","description":"","frontmatter":{},"headers":[],"relativePath":"others/mobile.md","filePath":"others/mobile.md","lastUpdated":1696787257000}');
const _sfc_main = { name: "others/mobile.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="narrat-mobile-support" tabindex="-1">Narrat mobile support <a class="header-anchor" href="#narrat-mobile-support" aria-label="Permalink to &quot;Narrat mobile support&quot;">​</a></h1><p>Narrat works on mobile by switching the layout to a portrait layout where the viewport appears on top of the screen, and the dialogue window takes the rest of the screen.</p><h2 id="hose-to-use-narrat-for-a-mobile-game" tabindex="-1">Hose to use Narrat for a mobile game <a class="header-anchor" href="#hose-to-use-narrat-for-a-mobile-game" aria-label="Permalink to &quot;Hose to use Narrat for a mobile game&quot;">​</a></h2><p>Narrat games should work on mobile web out of the box, you can try opening the url of your narrat game on your phone.</p><h2 id="how-to-export-a-narrat-game-as-a-mobile-app" tabindex="-1">How to export a Narrat game as a mobile app <a class="header-anchor" href="#how-to-export-a-narrat-game-as-a-mobile-app" aria-label="Permalink to &quot;How to export a Narrat game as a mobile app&quot;">​</a></h2><p>Turning a narrat game into a mobile app is more complicated and hasn&#39;t been tried yet, but might be possible with tools like <a href="https://cordova.apache.org/" target="_blank" rel="noreferrer">Cordova</a>. You&#39;ll have to experiment with it.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("others/mobile.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  mobile as default
};
