import { createRequire } from 'module';
import type { LocaleSpecificConfig, DefaultTheme } from 'vitepress';

export const configFr: LocaleSpecificConfig<DefaultTheme.Config> = {
  lang: 'fr-FR',
  title: 'Narrat',
  description: 'Créez des jeux narratifs et visual novels pour web et desktop',
  link: '/fr/',
  label: 'Français',
  themeConfig: {
    siteTitle: 'Documentation de Narrat',
    footer: {
      message: 'License MIT',
      copyright: 'Créé par Liana P',
    },
    sidebar: [
      {
        text: 'Autres langues',
        items: [
          { text: 'English', link: '/en/' },
          { text: '日本語', link: '/jp/' },
          { text: '简体中文', link: '/zh/' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Commencer', link: '/fr/guides/getting-started' },
          {
            text: `Utiliser des polices d'écriture personnalisées`,
            link: `/fr/guides/utiliser-des-polices-d'écriture-personnalisées`,
          },
          { text: 'Reste des docs (en anglais)', link: '/' },
        ],
      },
    ],
    nav: [
      { text: 'Playground', link: 'https://demo.narrat.dev' },
      { text: 'Dépannage', link: '/troubleshooting/troubleshooting' },
      { text: 'FAQ', link: '/others/faq' },
      { text: 'Commencer', link: '/fr/guides/getting-started' },
      {
        text: 'Script',
        items: [
          {
            link: '/commands/all-commands',
            text: 'Référence de tous les commandes',
          },
          {
            text: 'Exemple de script',
            link: '/examples/example-narrat-script',
          },
          {
            text: 'Syntaxe du langage narrat',
            link: '/scripting/language-syntax',
          },
        ],
      },
      {
        text: 'Configuration',
        items: [
          {
            text: 'Exemple de configuration',
            link: '/examples/example-config',
          },
          { text: 'Édition de la configuration', link: '/guides/config-files' },
          {
            text: 'Toutes les configurations',
            link: '/config/all-config-files',
          },
        ],
      },
    ],
  },
};
