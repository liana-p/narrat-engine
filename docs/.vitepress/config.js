/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  ignoreDeadLinks: true,
  themeConfig: {
    siteTitle: 'Narrat Documentation',
    editLink: {
      pattern: 'https://github.com/liana-p/narrat-engine/edit/main/docs/:path',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liana-p/narrat-engine' },
      { icon: 'twitter', link: 'https://twitter.com/NarratEngine' },
      { icon: 'website', link: 'https://get-narrat.com' },
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
    logo: 'logo.svg',
    nav: [
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
          { text: 'Current Version', link: 'https://docs.get-narrat.com' },
          {
            text: 'v2.12.0',
            link: 'https://2-12-0--ornate-pie-561978.netlify.app/',
          },
        ],
      },
    ],
  },
  title: 'Narrat Docs',
  description: 'Narrat documentation website.',
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
};

export default config;
