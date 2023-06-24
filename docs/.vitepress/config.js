/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
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
    search: {
      provider: 'local',
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
          {
            text: 'Editing the game',
            link: '/guides/editing-game',
          },
          { text: 'Editing the config', link: '/guides/config-files' },
          { text: 'Customising the UI', link: '/guides/theming-ui' },
          {
            text: 'Building and exporting',
            link: '/guides/building-and-exporting',
          },
          { text: 'Getting Help', link: '/guides/getting-help' },
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
          { text: 'Achievements', link: '/features/achievements' },
          { text: 'Audio', link: '/features/audio' },
          { text: 'HUD Stats', link: '/features/hud-stats' },
          { text: 'Inventory', link: '/features/inventory' },
          { text: 'Items', link: '/features/items' },
          { text: 'Quests', link: '/features/quests' },
          { text: 'Save and Load', link: '/features/save-and-load' },
          { text: 'Skills', link: '/features/skills' },
          { text: 'Transitions', link: '/features/transitions' },
          { text: 'Viewport', link: '/features/viewport' },
          { text: 'Game Settings', link: '/features/game-settings' },
          {
            text: 'Hot Module Reloading',
            link: '/features/hot-module-reloading',
          },
        ],
      },
      {
        text: 'Scripting',
        collapsible: true,
        items: [
          {
            text: 'All commands',
            link: '/commands/all-commands',
          },
          { text: 'Language Syntax', link: '/scripting/language-syntax' },
          { text: 'Functions', link: '/scripting/functions' },
          {
            text: 'Known limitations and issues',
            link: '/others/scripting-limitations',
          },
          { text: 'Plugin API', link: '/scripting/plugins' },
        ],
      },
      {
        text: 'Others',
        collapsible: true,
        items: [
          { text: 'Useful Links', link: '/others/useful-links' },
          { text: 'Troubleshooting', link: '/troubleshooting/troubleshooting' },
        ],
      },
      {
        text: 'Command docs',
        collapsible: true,
        items: [],
      },
    ],
    logo: '/logo.svg',
    nav: [
      { text: 'Troubleshooting', link: '/troubleshooting/troubleshooting' },
      { text: 'Get Started', link: '/guides/getting-started' },
      {
        text: 'Scripting',
        items: [
          {
            link: '/commands/all-commands',
            text: 'All Commands Reference',
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
