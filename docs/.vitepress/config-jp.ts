import { createRequire } from 'module';
import type { LocaleSpecificConfig, DefaultTheme } from 'vitepress';

export const configJp: LocaleSpecificConfig<DefaultTheme.Config> = {
  lang: 'jp',
  title: '「ナラット(narrat)」ゲームエンジンのドキュメンテーション',
  description:
    '「ナラット(narrat)」はゲームエンジンで、ビジュアルノベルやインタラクティブな物語を作成するためのものです。',
  link: '/jp/',
  label: '日本語',
  themeConfig: {
    siteTitle: '「ナラット(narrat)」',
    footer: {
      message: 'MIT License',
      copyright: 'Liana P 制作',
    },
    sidebar: [
      {
        text: '他の語',
        items: [
          { text: 'English', link: '/guides/getting-started' },
          { text: 'Français', link: '/fr/guides/getting-started' },
          { text: '简体中文', link: '/zh/guides/getting-started' },
        ],
      },
      {
        text: 'ガイド',
        items: [
          { text: 'はじめる', link: '/jp/guides/getting-started' },
          // {
          //   text: `カスタムフォントの使用`,
          //   link: `/fr/guides/utiliser-des-polices-d'écriture-personnalisées`,
          // },
          { text: '他の文書（英語）', link: '/' },
        ],
      },
    ],
    nav: [
      { text: 'プレイグラウンド', link: 'https://demo.narrat.dev' },
      {
        text: 'トラブルシューティング',
        link: '/troubleshooting/troubleshooting',
      },
      { text: 'FAQ', link: '/others/faq' },
      { text: 'はじめに', link: '/fr/guides/getting-started' },
      {
        text: 'スクリプト',
        items: [
          {
            link: '/commands/all-commands',
            text: '全コマンドリファレンス',
          },
          {
            text: 'スクリプトの例',
            link: '/examples/example-narrat-script',
          },
          {
            text: 'Narrat言語の構文',
            link: '/scripting/language-syntax',
          },
        ],
      },
      {
        text: '設定',
        items: [
          {
            text: '設定の例',
            link: '/examples/example-config',
          },
          { text: '設定ファイルの編集', link: '/guides/config-files' },
          {
            text: 'すべての設定ファイル',
            link: '/config/all-config-files',
          },
        ],
      },
    ],
  },
};
