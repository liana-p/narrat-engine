import { createRequire } from 'module';
import type { LocaleSpecificConfig, DefaultTheme } from 'vitepress';

export const configZh: LocaleSpecificConfig<DefaultTheme.Config> = {
  lang: 'zh',
  title: 'Narrat',
  description: '使用 Narrat 制作适用于 Web 和桌面的叙事 RPG 游戏',
  link: '/zh/',
  label: '简体中文',
  themeConfig: {
    siteTitle: '使用 Narrat 制作适用于 Web 和桌面的叙事 RPG 游戏',
    footer: {
      message: 'MIT License',
      copyright: 'Made by Liana P',
    },
    sidebar: [
      {
        text: 'Autres langues',
        items: [
          { text: 'English', link: '/guides/getting-started' },
          { text: '日本語', link: '/jp/guides/getting-started' },
          { text: 'Français', link: '/fr/guides/getting-started' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: '开始使用', link: '/zh/guides/getting-started' },
          { text: '其他文档 (英文)', link: '/' },
        ],
      },
    ],
    nav: [
      { text: '游乐场', link: 'https://demo.narrat.dev' },
      { text: '故障排除', link: '/troubleshooting/troubleshooting' },
      { text: '常见问题解答', link: '/others/faq' },
      { text: '开始', link: '/fr/guides/getting-started' },
      {
        text: '脚本',
        items: [
          {
            link: '/commands/all-commands',
            text: '所有命令参考',
          },
          {
            text: '脚本示例',
            link: '/examples/example-narrat-script',
          },
          {
            text: 'Narrat 语言语法',
            link: '/scripting/language-syntax',
          },
        ],
      },
      {
        text: '配置',
        items: [
          {
            text: '配置示例',
            link: '/examples/example-config',
          },
          { text: '编辑配置', link: '/guides/config-files' },
          {
            text: '所有配置文件',
            link: '/config/all-config-files',
          },
        ],
      },
    ],
  },
};
