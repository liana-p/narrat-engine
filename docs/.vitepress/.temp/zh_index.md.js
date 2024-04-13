import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Narrat","text":"使用 Narrat 制作适用于 Web 和桌面的叙事 RPG 游戏","tagline":"使用 Narrat 制作适用于 Web 和桌面的叙事 RPG 游戏","image":{"src":"/logo.svg","alt":"Narrat 标志"},"actions":[{"theme":"brand","text":"开始使用","link":"/zh/guides/getting-started"},{"theme":"alt","text":"官方网站","link":"https://narrat.dev"},{"theme":"brand","text":"概览","link":"/guides/narrat-overview"},{"theme":"brand","text":"互动游乐场","link":"https://demo.narrat.dev"}]},"features":[{"icon":"🚀","title":"轻松入门","details":"您可以在浏览器中尝试 Narrat，无需安装任何东西。还有一个工具可自动为您启动项目。","link":"/zh/guides/getting-started","linkText":"开始使用"}]},"headers":[],"relativePath":"zh/index.md","filePath":"zh/index.md","lastUpdated":1706568357000}');
const _sfc_main = { name: "zh/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><strong>注意：</strong> 文档网站仅部分翻译成中文，大多数页面均为英语。</p><p>您可以通过在 <a href="https://github.com/liana-p/narrat-engine" target="_blank" rel="noreferrer">GitHub</a> 存储库 上进行贡献来帮助将文档翻译成中文。文档使用 <a href="https://www.markdownguide.org/" target="_blank" rel="noreferrer">Markdown</a> 文件编写，使用 <a href="https://vitepress.dev" target="_blank" rel="noreferrer">Vitepress</a> 工具，易于编辑。</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
