#!/usr/bin/env node

// @ts-check
import shell from 'shelljs';
import { red, cyan, green } from 'kolorist';
import { rmSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const EXAMPLES_DIR = '../narrat/examples/';
const BUILD_DIR = './template-games/';

const templateGames = ['empty', 'demo'];

console.log(cyan(`Copying example games for the template`), templateGames);
const staticAssetsFoldersToCopy = ['img', 'music', 'audio'];

if (!existsSync(BUILD_DIR)) {
  mkdirSync(BUILD_DIR);
}
templateGames.forEach((game) => {
  console.log(`Preparing to copy template game ${game}`);
  const foldersToCopy = [...staticAssetsFoldersToCopy];
  const DEST = join(BUILD_DIR, game);
  console.log(red('Deleting previous version...'));
  if (existsSync(DEST)) {
    rmSync(DEST, { recursive: true });
  }
  mkdirSync(DEST);
  if (existsSync(join(EXAMPLES_DIR, `assets/${game}`))) {
    console.log(
      green('This example game has specific assets, adding them to copy list'),
    );
    foldersToCopy.push(game);
  }

  // Copy static common assets + game-specific assets from examples to game folder
  const cpCommands = foldersToCopy.reduce((acc, folder) => {
    return `${acc} shx cp -r ${join(EXAMPLES_DIR, `assets/${folder}`)} ${join(
      DEST,
      folder,
    )} &&`;
  }, '');

  console.log(cyan(`Copying game template ${game}...`));
  const copyCommand = `${cpCommands} shx cp -r ${join(
    EXAMPLES_DIR,
    `/games/${game}/*`,
  )} ${DEST}`;
  console.log('Running command: ', cyan(copyCommand));
  shell.exec(copyCommand);
  console.log(green(`Static assets copied!`));
});
