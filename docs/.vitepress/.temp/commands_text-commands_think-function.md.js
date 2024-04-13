import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Think","description":"","frontmatter":{},"headers":[],"relativePath":"commands/text-commands/think-function.md","filePath":"commands/text-commands/think-function.md","lastUpdated":1712778947000}');
const _sfc_main = { name: "commands/text-commands/think-function.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="think" tabindex="-1">Think <a class="header-anchor" href="#think" aria-label="Permalink to &quot;Think&quot;">​</a></h1><p>This command works exactly the same as the <a href="./talk-function.html">talk</a> command, except it will print the dialogue without quotes.</p><p>It also has a different CSS class applied to it so that it can be customised independently of the <code>talk</code> command: <code>think-command</code>.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/text-commands/think-function.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const thinkFunction = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  thinkFunction as default
};
