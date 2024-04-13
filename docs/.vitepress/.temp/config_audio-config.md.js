import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"audio config file","description":"audio config file in narrat","frontmatter":{"title":"audio config file","description":"audio config file in narrat"},"headers":[],"relativePath":"config/audio-config.md","filePath":"config/audio-config.md","lastUpdated":1706363907000}');
const _sfc_main = { name: "config/audio-config.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>TODO: Make this page</p><p>In the meantime, look at:</p><ul><li><a href="https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/audio.yaml" target="_blank" rel="noreferrer">Example config file</a></li><li><a href="https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/audio-config.ts" target="_blank" rel="noreferrer">Code defining the options of this config file</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("config/audio-config.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const audioConfig = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  audioConfig as default
};
