/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      link: '/fr/',
      description: 'Créez des jeux de fiction interactive pour web et desktop',
    },
    jp: {
      label: '日本語',
      lang: 'jp',
      link: '/jp/',
      description:
        '「ナラット　(narrat)」はゲームエンジンで、ビジュアルノベルやインタラクティブな物語を作成するためのものです。',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-Hans',
      link: '/zh/',
      description: '使用 Narrat 制作适用于 Web 和桌面的叙事 RPG 游戏',
    },
  },
  ignoreDeadLinks: true,
  head: [
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-1LLT0JWVV5',
      },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-1LLT0JWVV5');",
    ],
  ],
  themeConfig: {
    outline: [1, 6],
    search: {
      provider: 'algolia',
      options: {
        appId: '3F0NL3DOSQ',
        apiKey: '9aaa5c269e5220f82c43a7307508cb2d',
        indexName: 'narrat',
        insights: true,
      },
    },
    siteTitle: 'Narrat Documentation',
    editLink: {
      pattern: 'https://github.com/liana-p/narrat-engine/edit/main/docs/:path',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present Liana Pigeot',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liana-p/narrat-engine' },
      { icon: 'twitter', link: 'https://twitter.com/NarratEngine' },
      { icon: 'mastodon', link: 'https://mastodon.gamedev.place/@narrat' },
      { icon: 'discord', link: 'https://discord.gg/Xgz7EQ2Xgh' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/></svg>',
        },
        link: 'https://narrat.dev',
        ariaLabel: 'Narrat Website',
      },
    ],
    sidebar: [
      {
        text: 'General Guides',
        collapsible: true,
        items: [
          { text: 'Getting Started', link: '/guides/getting-started' },
          { text: 'Overview of Narrat', link: '/guides/narrat-overview' },
          {
            text: 'Editing the game',
            link: '/guides/editing-game',
          },
          { text: 'Editing the config', link: '/guides/config-files' },
          { text: 'Customising the UI', link: '/guides/customising-ui' },
          { text: 'Themes', link: '/guides/themes' },
          { text: 'Using Custom Fonts', link: '/guides/using-custom-fonts' },
          {
            text: 'Building and exporting',
            link: '/guides/building-and-exporting',
          },
          { text: 'Getting Help', link: '/guides/getting-help' },
          { text: 'FAQ', link: '/others/faq' },
          { text: 'Steam publishing', link: '/guides/steam-publishing' },
          { text: 'Updating narrat', link: '/guides/updating-narrat' },
          {
            text: 'Custom Start Menu Buttons',
            link: '/guides/custom-start-buttons',
          },
        ],
      },
      {
        text: 'Feature Guides',
        collapsible: true,
        items: [
          { text: 'Animations', link: '/features/animations' },
          { text: 'Achievements', link: '/features/achievements' },
          { text: 'Audio', link: '/features/audio' },
          {
            text: 'Branching dialogue and choices',
            link: '/features/branching-dialogue',
          },
          {
            text: 'Changing the player character',
            link: '/features/changing-player-character',
          },
          {
            text: 'Characters and portraits',
            link: '/features/characters-and-portraits',
          },
          {
            text: 'Dialog Panel',
            link: '/features/dialog-panel',
          },
          { text: 'Game Settings', link: '/features/game-settings' },
          { text: 'Gamepad support', link: '/features/gamepad' },
          {
            text: 'Hot Module Reloading',
            link: '/features/hot-module-reloading',
          },
          {
            text: 'Config files hot reloading',
            link: '/features/config-hot-reloading',
          },
          { text: 'HUD Stats', link: '/features/hud-stats' },
          { text: 'Inventory', link: '/features/inventory' },
          { text: 'Items', link: '/features/items' },
          { text: 'Quests', link: '/features/quests' },
          { text: 'Save and Load', link: '/features/save-and-load' },
          { text: 'Scenes', link: '/features/scenes' },
          { text: 'Skills', link: '/features/skills' },
          {
            text: 'Sprites and text',
            link: '/features/dynamic-sprites-text-objects.md',
          },
          { text: 'Tooltips', link: '/features/tooltips' },
          { text: 'Transitions', link: '/features/transitions' },
          { text: 'Viewport', link: '/features/viewport' },
        ],
      },
      {
        text: 'Scripting',
        collapsible: true,
        items: [
          {
            text: 'All commands cheatsheet',
            link: '/commands/all-commands',
          },
          { text: 'Language Syntax', link: '/scripting/language-syntax' },
          { text: 'Functions', link: '/scripting/functions' },
          {
            text: 'Known limitations and issues',
            link: '/others/scripting-limitations',
          },
          {
            text: 'Macros',
            link: '/scripting/macros',
          },
        ],
      },
      {
        text: 'Others',
        collapsible: true,
        items: [
          { text: 'Useful Links', link: '/others/useful-links' },
          { text: 'Troubleshooting', link: '/troubleshooting/troubleshooting' },
          {
            text: 'What can Narrat do?',
            link: '/others/what-can-narrat-do',
          },
          { text: 'FAQ', link: '/others/faq' },
          { text: 'Mobile support', link: '/others/mobile' },
        ],
      },
      {
        text: 'Config files',
        collapsible: true,
        items: [{ text: 'All config files', link: '/config/all-config-files' }],
      },
      {
        text: 'Common commands docs',
        collapsible: true,
        items: [
          { text: 'All commands cheatsheet', link: '/commands/all-commands' },
          { text: 'Jump', link: '/commands/api-jump' },
          { text: 'Choices', link: '/commands/choice-function' },
          { text: 'If', link: '/commands/if-function' },
          { text: 'Logical operators', link: '/commands/logical-operators' },
          { text: 'Random generation', link: '/commands/random-generation' },
        ],
      },
      {
        text: 'Plugins',
        collapsible: true,
        items: [
          {
            text: 'Godot Narrat integration plugin',
            link: '/plugins/godot/godot-plugin',
          },
          { text: 'Plugin API', link: '/plugins/plugins' },
        ],
      },
    ],
    logo: '/logo.svg',
    nav: [
      { text: 'Playground', link: 'https://demo.narrat.dev' },
      { text: 'Troubleshooting', link: '/troubleshooting/troubleshooting' },
      { text: 'FAQ', link: '/others/faq' },
      { text: 'Get Started', link: '/guides/getting-started' },
      {
        text: 'Scripting',
        items: [
          {
            link: '/commands/all-commands',
            text: 'All Commands Reference cheatsheet',
          },
          { text: 'Example Script', link: '/examples/example-narrat-script' },
          { text: 'Language Syntax', link: '/scripting/language-syntax' },
        ],
      },
      {
        text: 'Config',
        items: [
          { text: 'Example Config', link: '/examples/example-config' },
          { text: 'Editing the config', link: '/guides/config-files' },
        ],
      },
      {
        text: 'Version',
        items: [
          { text: 'Current Version', link: 'https://docs.narrat.dev' },
          {
            text: 'v3.0.0',
            link: 'https://2-17-0--ornate-pie-561978.netlify.app/',
          },
          {
            text: 'v2.17.0',
            link: 'https://2-17-0--ornate-pie-561978.netlify.app/',
          },
          {
            text: 'v2.12.0',
            link: 'https://2-12-0--ornate-pie-561978.netlify.app/',
          },
        ],
      },
    ],
  },
  title: 'Narrat Documentation',
  description:
    'Documentation for the narrat game engine for narrative RPGs and interactive fiction or visual novels.',
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
};

export default config;
