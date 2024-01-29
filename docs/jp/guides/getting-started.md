---
title: ゲームエンジン「ナラット　(narrat)」の作り方はじめるよ
description: ゲームエンジン「ナラット　(narrat)」の作り方はじめるよ
---

::: warning
お知らせ：このドキュメンテーションは主に英語とフランス語で提供されており、筆者は日本人ではありません。

私はこのドキュメンテーションを日本語に翻訳することを自分で試す。しかし、この部分だけが翻訳されています。

他のページは英語で書いてある。

- English: [Getting Started](/guides/getting-started.md)
- Français: [Commencer](/fr/guides/getting-started.md)

[GitHubリポジトリ](https://github.com/liana-p/narrat-engine) でコントリビューションすることで、ドキュメンテーションをフランス語に翻訳するのにお手伝いいただけます。ドキュメンテーションは[Markdown](https://www.markdownguide.org/)ファイルで書かれており、[Vitepress](https://vitepress.dev) ツールを使用して編集が容易です。
:::

# {{ $frontmatter.title }}

このページの残りは自動的に翻訳されます。

Narratを使って始めるのは非常に簡単です。すぐにゲームを実行できる準備が整っています。

## このページで

[[toc]]

## Narratの用途

**「ナラット」(narrat)はプログラミング不要で物語性のあるゲームを作成するのに特化しています。** アクションゲームを作成したい場合や、多くのカスタム機能を持つゲームを作成したい場合は、より一般的な汎用ゲームエンジンを検討するかもしれません。Narratの機能、哲学、制約、新機能の追加方法について詳しく読むことができます。[このページ](/others/what-can-narrat-do)をご覧ください。

## インタラクティブデモ

プロジェクトを作成せずにNarratの動作を素早く理解したい場合、[インタラクティブプレイグラウンドデモ](https://demo.narrat.dev/)を使用してブラウザで瞬時に「ナラット」(narrat)デモゲームを編集できます。

## ビデオガイド

テキストの手順が必要な場合は、[次のセクション](#テキスト指示)に移動してください。

ビデオをご希望の場合は、この1分のビデオが開始からゲームの実行までの完全なセットアップを示しています。

<iframe width="560" height="315" src="https://www.youtube.com/embed/516YTDxSO9Y" title="YouTubeビデオプレーヤー" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## テキスト指示

## 前提条件

- Windows、MacOS、またはLinuxを実行しているコンピューターを使用してください。
- [node.js ](https://nodejs.org/en/) 20+がインストールされている必要があります（ウェブサイトで現行のLTSバージョンを選択してください）。
- テキストエディタが必要です。おすすめは[VS Code](https://code.visualstudio.com/Download)です。

## ゲームプロジェクトの作成

お好きなフォルダーでターミナルを開いてください（Windowsでは、フォルダーで右クリックし、[PowerShellウィンドウをここで開く]を選択できます）

::: details ターミナルを開くのを助ける

![ターミナルを開く](/guides/terminal/terminal.png)

Windowsおよび他のOSでフォルダー内でターミナルを開く方法の詳細については、[このリンク](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)をご覧ください。

:::

開いたら、次のコマンドを実行できます：

```bash
npm create narrat@latest
```

これにより、Narratがダウンロードされ、プロジェクトを構成するためのいくつかの質問が表示されます。始める際にいくつかのゲームテンプレートから選択できます。ツールの指示に従ってゲームを実行するか、以下の「ゲームの実行」ガイドに従うことができます。

::: details 仕組み

「ナラット」(narrat)テンプレートは、Narratをライブラリとして使用する、ほとんど空のWebプロジェクトのテンプレートです。

node.jsは、プロジェクトを実行（およびビルドまたは実行可能なゲームにエクスポート）するために使用されるJavaScriptエンジンです。

ゲームにライブラリをインストールするために[npm](https://www.w3schools.com/whatis/whatis_npm.asp)を使用します。npmは、node.jsでJSライブラリをインストールするためのパッケージマネージャーです。

テンプレートのルートには、プロジェクトとその依存関係を定義するための標準的なnode.jsファイルである[package.json](https://github.com/liana-p/narrat-engine-template/blob/main/package.json)ファイルがあります。このファイルの`dependencies`セクション内には、narratとバージョン番号が含まれています。これにより、プロジェクトに特定のnarratのバージョンをインストールするように指示されます。

当社のテンプレートは、npmを使用してnarrat（およびその他の依存関係）をダウンロードおよびインストールし、ゲームを準備します。その後、npmスクリプトを使用して、ゲームをビルド/エクスポートするためのコマンドを実行できます（これらはすべて、どのような方法であれ、ノード.jsを使用しています）。

:::

## ライブラリのインストール（初回または更新時のみ）

Narratゲームのセットアップが完了したら、[フォルダ内でターミナルを開いてください](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

最初に使用時に依存関係（ライブラリ）をインストールするための最初のコマンドがあります：

```bash
npm install
```

## ゲームの実行

```bash
npm start
```

これにより、ビルドに少し時間がかかりますが、ゲームが実行されたブラウザータブが開きます。ゲームは<a href="http://localhost:5173/" target="_blank" rel="noreferrer">localhost:5173</a>でアクセスできます。

ゲームの編集が可能です！

::: info
これらの`npm`コマンドはnode.jsから提供されています。コマンドが認識されない場合、おそらくnode.jsを正しくインストールしていない可能性があります。[npm installについて詳しく](https://www.stackchief.com/tutorials/npm%20install%20|%20how%20it%20works)
:::

## Narratの概要

ゲームが実行されているので、[Narratの概要](/guides/narrat-overview)を見て、Narratゲームの異なる部分とその使用方法を理解することができるかもしれません。

## ゲームの編集

Narratのスクリプトと設定ファイルを編集することで、ゲームを作成するのは簡単です！

[ゲームの編集](editing-game)

## ゲームのビルドとエクスポート

[ビルドとエクスポート](/guides/building-and-exporting)

## コマンドのドキュメンテーション

[すべてのコマンド](/commands/all-commands)

<FeedbackForm title="はじめに" slug="guides/getting-started"/>
