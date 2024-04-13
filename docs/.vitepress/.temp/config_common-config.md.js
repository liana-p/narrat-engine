import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Common config file","description":"The common config file in narrat contains generic config options","frontmatter":{"title":"Common config file","description":"The common config file in narrat contains generic config options"},"headers":[],"relativePath":"config/common-config.md","filePath":"config/common-config.md","lastUpdated":1706363907000}');
const _sfc_main = { name: "config/common-config.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>TODO: Make this page</p><p>In the meantime, look at:</p><ul><li><a href="https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/common.yaml" target="_blank" rel="noreferrer">Example config file</a></li><li><a href="https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/common-config.ts" target="_blank" rel="noreferrer">Code defining the options of this config file</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("config/common-config.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const commonConfig = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  commonConfig as default
};
