import type { LocaleSpecificConfig, DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';

export const configEn = defineConfig({
  lang: 'en',
  title: 'Narrat Documentation',
  description:
    'Documentation for the narrat game engine for narrative RPGs and interactive fiction or visual novels.',
  themeConfig: {
    nav: nav(),
    sidebar: [
      {
        text: 'Other Languages',
        items: [
          { text: 'Français', link: '/fr/guides/getting-started' },
          { text: '日本語', link: '/jp/guides/getting-started' },
          { text: '简体中文', link: '/zh/guides/getting-started' },
        ],
      },
      sidebarTutorials(),
      sidebarGuides(),
      sidebarFeatures(),
      sidebarConfigFiles(),
      sidebarScripting(),
      commonCommandsSidebar(),
      sidebarPlugins(),
      sidebarOthers(),
    ],
    siteTitle: 'Narrat Documentation',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Made by Liana P',
    },
  },
});

function sidebarTutorials(): DefaultTheme.SidebarItem[] {
  return {
    text: 'Tutorials',
    base: '/tutorials/',
    collapsible: true,
    items: [
      { text: 'Make your first game in Narrat', link: 'basic-vn-tutorial' },
    ],
  };
}

function sidebarGuides(): DefaultTheme.SidebarItem[] {
  return {
    text: 'General Guides',
    base: '/guides/',
    collapsible: true,
    items: [
      { text: 'Getting Started', link: 'getting-started' },
      { text: 'Overview of Narrat', link: 'narrat-overview' },
      {
        text: 'Editing the game',
        link: 'editing-game',
      },
      { text: 'Editing the config', link: 'config-files' },
      { text: 'Customising the UI', link: 'customising-ui' },
      { text: 'Themes', link: 'themes' },
      { text: 'Using Custom Fonts', link: 'using-custom-fonts' },
      {
        text: 'Building and exporting',
        link: 'building-and-exporting',
      },
      { text: 'Getting Help', link: 'getting-help' },
      { text: 'Steam publishing', link: 'steam-publishing' },
      { text: 'Updating narrat', link: 'updating-narrat' },
      {
        text: 'Custom Start Menu Buttons',
        link: 'custom-start-buttons',
      },
    ],
  };
}

function sidebarFeatures(): DefaultTheme.SidebarItem[] {
  return {
    text: 'Feature Guides',
    base: '/features/',
    collapsible: true,
    items: [
      { text: 'Animations', link: 'animations' },
      { text: 'Achievements', link: 'achievements' },
      { text: 'Audio', link: 'audio' },
      {
        text: 'Branching dialogue and choices',
        link: 'branching-dialogue',
      },
      {
        text: 'Changing the player character',
        link: 'changing-player-character',
      },
      {
        text: 'Characters and portraits',
        link: 'characters-and-portraits',
      },
      {
        text: 'Dialog Panel',
        link: 'dialog-panel',
      },
      { text: 'Fonts', link: 'fonts' },
      { text: 'Game Settings', link: 'game-settings' },
      { text: 'Gamepad support', link: 'gamepad' },
      {
        text: 'Hot Module Reloading',
        link: 'hot-module-reloading',
      },
      {
        text: 'Config files hot reloading',
        link: 'config-hot-reloading',
      },
      { text: 'Hotkeys', link: 'hotkeys' },
      { text: 'HUD Stats', link: 'hud-stats' },
      { text: 'Input Prompts', link: 'input-prompts' },
      { text: 'Inventory', link: 'inventory' },
      { text: 'Items', link: 'items' },
      { text: 'Quests', link: 'quests' },
      { text: 'Save and Load', link: 'save-and-load' },
      { text: 'Scenes', link: 'scenes' },
      { text: 'Skills', link: 'skills' },
      {
        text: 'Sprites and text',
        link: 'dynamic-sprites-text-objects.md',
      },
      { text: 'Tooltips', link: 'tooltips' },
      { text: 'Transitions', link: 'transitions' },
      { text: 'Viewport', link: 'viewport' },
    ],
  };
}

function sidebarScripting(): DefaultTheme.SidebarItem[] {
  return {
    text: 'Scripting',
    collapsible: true,
    base: '/scripting/',
    items: [
      { text: 'Language Syntax', link: 'language-syntax' },
      { text: 'Functions', link: 'functions' },
      { text: 'JavaScript interface', link: 'javascript-interface' },
      {
        text: 'Known limitations and issues',
        link: '../others/scripting-limitations',
      },
      {
        text: 'Macros',
        link: 'macros',
      },
    ],
  };
}

function sidebarConfigFiles(): DefaultTheme.SidebarItem[] {
  return {
    text: 'Config files',
    base: '/config/',
    collapsible: true,
    items: [{ text: 'All config files', link: 'all-config-files' }],
  };
}

function commonCommandsSidebar(): DefaultTheme.SidebarItem[] {
  return {
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
  };
}

function sidebarPlugins(): DefaultTheme.SidebarItem[] {
  return {
    text: 'Plugins',
    collapsible: true,
    items: [
      {
        text: 'Godot Narrat integration plugin',
        link: '/plugins/godot/godot-plugin',
      },
      { text: 'Plugin API', link: '/plugins/plugins' },
      { text: 'Plugin hooks', link: '/plugins/plugin-hooks' },
    ],
  };
}

function sidebarOthers(): DefaultTheme.SidebarItem[] {
  return {
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
  };
}
function nav(): DefaultTheme.NavItem[] {
  return [
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
        { text: 'All config files', link: '/config/all-config-files' },
      ],
    },
    // {
    //   text: 'Version',
    //   items: [
    //     { text: 'Current Version', link: 'https://docs.narrat.dev' },
    //     {
    //       text: 'v3.0.0',
    //       link: 'https://2-17-0--ornate-pie-561978.netlify.app/',
    //     },
    //     {
    //       text: 'v2.17.0',
    //       link: 'https://2-17-0--ornate-pie-561978.netlify.app/',
    //     },
    //     {
    //       text: 'v2.12.0',
    //       link: 'https://2-12-0--ornate-pie-561978.netlify.app/',
    //     },
    //   ],
    // },
  ];
}
