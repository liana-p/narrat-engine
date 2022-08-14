#!/usr/bin/env node

// @ts-check
const minimist = require('minimist');
const shell = require('shelljs');
const { red, cyan, green } = require('kolorist');
const fs = require('fs');
const args = minimist(process.argv.slice(2));
const path = require('path');

const EXAMPLES_DIR = 'examples/';
const BUILD_DIR = 'built-example/';
const exampleName = args._[0];
if (typeof exampleName !== 'string') {
  console.error(
    red(
      `The first parameter of this script should be the name of the example folder to build.`,
    ),
  );
  process.exit(1);
}
const DEST = path.join(BUILD_DIR, exampleName);

if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR);
}
console.log(cyan(`Building demo game: ${exampleName}`));
console.log(red('Deleting previous build...'));
console.log(`delete path`, DEST);
if (fs.existsSync(DEST)) {
  fs.rmdirSync(DEST, { recursive: true });
}
fs.mkdirSync(DEST);

const staticAssetsFoldersToCopy = ['img', 'music', 'audio'];

if (fs.existsSync(path.join(EXAMPLES_DIR, `assets/${exampleName}`))) {
  console.log(
    green('This example game has specific assets, adding them to copy list'),
  );
  staticAssetsFoldersToCopy.push(exampleName);
}

// Copy static common assets + game-specific assets from examples to game folder
const cpCommands = staticAssetsFoldersToCopy.reduce((acc, folder) => {
  return `${acc} shx mkdir ${path.join(DEST, folder)} && shx cp -r ${path.join(
    EXAMPLES_DIR,
    `assets/${folder}/*`,
  )} ${path.join(DEST, folder)} &&`;
}, '');

const finalArgs = [`VITE_DEMO_BUILD=${exampleName}`];

if (typeof args._[1] === 'string') {
  finalArgs.push(`VITE_DEBUG=true`);
}

// Final script runs the builds, copies static assets, and then copies the game data from the examples folder
const command = `cross-env ${finalArgs.join(' ')} npx vite build`;

console.log(cyan(`Running vite build...`));
console.log('Running command: ', cyan(command));
shell.exec(command);

console.log(green(`Vite build complete!`));
console.log(cyan(`Copying static assets...`));
const copyCommand = `${cpCommands} shx cp -r ${path.join(
  EXAMPLES_DIR,
  `/games/${exampleName}/*`,
)} ${DEST}`;
console.log('Running command: ', cyan(copyCommand));
shell.exec(copyCommand);
console.log(green(`Static assets copied!`));
console.log(green('Example game built!'));
