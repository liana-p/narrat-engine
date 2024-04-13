import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"ナラット","text":"「ナラット　(narrat)」はゲームエンジンで、ビジュアルノベルやインタラクティブな物語を作成するためのものです。","tagline":"「ナラット　(narrat)」はゲームエンジンで、ビジュアルノベルやインタラクティブな物語を作成するためのものです。","image":{"src":"/logo.svg","alt":"Narrat logo"},"actions":[{"theme":"brand","text":"はじめるよ！","link":"/jp/guides/getting-started"},{"theme":"alt","text":"ウェブサイト","link":"https://narrat.dev"},{"theme":"brand","text":"概要","link":"/guides/narrat-overview"},{"theme":"brand","text":"インタラクティブプレイグラウンド","link":"https://demo.narrat.dev"}]},"features":[{"icon":"🚀","title":"とても簡単に始められる","details":"何もインストールしなくても、ブラウザで「ナラット　(narrat)」を試すことができます。また、プロジェクトを自動的に開始するツールもあります。","link":"/jp/guides/getting-started","linkText":"はじめる"}]},"headers":[],"relativePath":"jp/index.md","filePath":"jp/index.md","lastUpdated":1706568357000}');
const _sfc_main = { name: "jp/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>お知らせ：このドキュメンテーションは主に英語とフランス語で提供されており、筆者は日本人ではありません。</p><p>私はこのドキュメンテーションを日本語に翻訳することを自分で試す。しかし、この部分だけが翻訳されています。</p><p>他のページは英語で書いてある。</p><ul><li>English: <a href="/guides/getting-started.html">Getting Started</a></li><li>Français: <a href="/fr/guides/getting-started.html">Commencer</a></li></ul><p><a href="https://github.com/liana-p/narrat-engine" target="_blank" rel="noreferrer">GitHubリポジトリ</a> でコントリビューションすることで、ドキュメンテーションをフランス語に翻訳するのにお手伝いいただけます。ドキュメンテーションは<a href="https://www.markdownguide.org/" target="_blank" rel="noreferrer">Markdown</a>ファイルで書かれており、<a href="https://vitepress.dev" target="_blank" rel="noreferrer">Vitepress</a> ツールを使用して編集が容易です。</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("jp/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
