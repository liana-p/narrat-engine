import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"Disable or enable notifications","description":"","frontmatter":{},"headers":[],"relativePath":"commands/notify/disable-or-enable-notifications.md","filePath":"commands/notify/disable-or-enable-notifications.md","lastUpdated":1665596305000}');
const _sfc_main = { name: "commands/notify/disable-or-enable-notifications.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="disable-or-enable-notifications" tabindex="-1">Disable or enable notifications <a class="header-anchor" href="#disable-or-enable-notifications" aria-label="Permalink to &quot;Disable or enable notifications&quot;">​</a></h1><p>The commands <code>enable_notifications</code> and <code>disable_notifications</code> can be used to enable/disable notifications globally</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("commands/notify/disable-or-enable-notifications.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const disableOrEnableNotifications = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  disableOrEnableNotifications as default
};
