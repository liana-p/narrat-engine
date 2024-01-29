---
title: 使用Narrat快速入门并在一分钟内创建游戏
description: 本指南介绍如何在一分钟内使用Narrat游戏引擎入门
---

::: warning
本页为机器翻译

**注意：** 文档网站仅部分翻译成中文，大多数页面均为英语。

您可以通过在 [GitHub](https://github.com/liana-p/narrat-engine) 存储库 上进行贡献来帮助将文档翻译成中文。文档使用 [Markdown](https://www.markdownguide.org/) 文件编写，使用 [Vitepress](https://vitepress.dev) 工具，易于编辑。
:::

# {{ $frontmatter.title }}

使用Narrat快速入门非常简单。有一个现成的模板可供使用，可以让您在一分钟内运行游戏。

## 本页内容

[[toc]]

## Narrat的用途

**Narrat专注于帮助您创建无需编程的叙事游戏。** 如果您想制作动作游戏或带有许多定制功能的游戏，您可能需要更通用的游戏引擎。您可以在[本页](/others/what-can-narrat-do)详细了解Narrat的特点、理念、限制以及如何添加新功能。

## 交互式演示

如果您想快速了解Narrat的工作方式而无需创建项目，[交互式游乐场演示](https://demo.narrat.dev/)允许您在浏览器中即时编辑Narrat演示游戏。

## 视频指南

如果您更喜欢视频教程，这段一分钟的视频展示了从开始设置到游戏运行的整个过程。

<iframe width="560" height="315" src="https://www.youtube.com/embed/516YTDxSO9Y" title="YouTube视频播放器" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 文本指南

## 先决条件

- 使用运行 Windows、MacOS 或 Linux 的计算机
- 已安装 [node.js ](https://nodejs.org/en/) 20+（请在官方网站选择当前的LTS版本）。
- 文本编辑器，我们建议使用 [VS Code](https://code.visualstudio.com/Download)。

## 创建游戏项目

在您选择的文件夹中打开一个终端（在 Windows 上，您可以在文件夹中Shift + 右键并选择“在此处打开PowerShell窗口”）

::: details 帮助打开终端

![打开终端](/guides/terminal/terminal.png)

关于如何在 Windows 和其他操作系统中在文件夹中打开终端的更多信息，请参阅[此链接](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

:::

一旦打开，您可以运行以下命令：

```bash
npm create narrat@latest
```

这将下载Narrat并询问您一些问题以配置您的项目。您可以选择几个游戏模板来开始。现在，您可以按照工具中的说明来运行游戏，或者按照下面的“运行游戏”指南进行操作。

## 安装库（仅首次安装或更新时）

在安装好Narrat游戏之后，[在文件夹中打开终端](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

首次使用时，有一个安装依赖项（库）的第一个命令：

```bash
npm install
```

::: details 如果在npm install过程中出现警告

除非您看到实际错误，**通常可以忽略警告**

### **安全问题警告**

您可能会看到npm抱怨“**安全问题**”。这些都是虚假的警告，**可以忽略**，是由于NPM的安全实现非常粗心而引起的。这些安全问题与Narrat的使用情况无关。欢迎阅读有关npm安全警告为何失效的[这篇文章](https://overreacted.io/npm-audit-broken-by-design/)，作者是React的创作者Dan Abramov。

:::

## 运行游戏

```bash
npm start
```

这应该会在短时间内打开一个浏览器标签，游戏将在其中运行。您可以在localhost:5173上访问游戏。

游戏已准备好进行编辑！

::: info
这些npm命令来自于node.js。如果命令无法识别，您可能没有正确安装node.js。[更多关于npm install的信息](https://www.stackchief.com/tutorials/npm%20install%20|%20how%20it%20works)
:::

## Narrat概览

现在游戏已经运行，您可能想要查看[Narrat概览](/guides/narrat-overview)，以了解Narrat游戏的不同部分及其如何使用。

## 编辑游戏

通过编辑Narrat脚本和配置文件，现在制作游戏变得非常容易！

[编辑游戏](editing-game)

## 构建和导出游戏

[构建和导出](/guides/building-and-exporting)

## 命令文档

[所有命令](/commands/all-commands)

<FeedbackForm title="入门指南" slug="guides/getting-started"/>
