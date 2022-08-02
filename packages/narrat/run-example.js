#!/usr/bin/env node

// @ts-check
const minimist = require('minimist');
const shell = require('shelljs');
const { red, cyan } = require('kolorist');

const args = minimist(process.argv.slice(2));

console.log('args: ');
console.log(args._);

const exampleName = args._[0];
if (typeof exampleName !== 'string') {
  console.error(
    red(
      `The first parameter of this script should be the name of the example folder to build.`,
    ),
  );
  process.exit(1);
}

console.log(cyan(`Running example game: ${exampleName}`));
const finalArgs = [
  'VITE_BASE_ASSET_PATH=examples/assets/',
  `VITE_BASE_DATA_PATH=examples/games/${exampleName}/`,
];
const command = `cross-env ${finalArgs.join(' ')} npx vite dev`;
console.log('Running dev command: ', cyan(command));
shell.exec(command);
