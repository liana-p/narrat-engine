/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  themeConfig: {
    siteTitle: 'Narrat Documentation',
    editLink: {
      pattern: 'https://github.com/liana-p/narrat-engine/edit/main/docs/:path',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liana-p/narrat-engine' },
      { icon: 'twitter', link: 'https://twitter.com/NarratEngine' },
    ],
    sidebar: [
      {
        text: 'Guides',
        collapsible: true,
        items: [{ text: 'Getting Started', link: '/guides/getting-started' }],
      },
      {
        text: 'Features',
        collapsible: true,
        items: [{ text: 'Audio', link: '/features/audio' }],
      },
      {
        text: 'Commands',
        collapsible: true,
        items: [
          {
            text: 'All commands',
            link: '/functions-documentation/all-commands-list',
          },
        ],
      },
    ],
    logo: '/logo.svg',
    nav: [
      { text: 'Get Started', link: '/guides/getting-started' },
      { text: 'Guides', link: '/guides/' },
      {
        text: 'Commands References',
        link: '/functions-documentation/all-commands-list',
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
