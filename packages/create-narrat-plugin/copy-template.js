#!/usr/bin/env node

// @ts-check
import shell from 'shelljs';
import { red, cyan, green } from 'kolorist';
import { rmSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const TEMPLATE_DIR = '../narrat-plugin-counter/';
const BUILD_DIR = './template/';

console.log(cyan(`Copying default plugin template`));

if (!existsSync(BUILD_DIR)) {
  mkdirSync(BUILD_DIR);
}
console.log(red('Deleting previous version...'));
if (existsSync(BUILD_DIR)) {
  rmSync(BUILD_DIR, { recursive: true });
  mkdirSync(BUILD_DIR);
}
const command = `shx cp -r ${TEMPLATE_DIR}/* ${BUILD_DIR}`;
console.log('Running command: ', cyan(command));
shell.exec(command);
console.log(green(`Plugin template copied!`));
console.log(red('Deleting any built files from the plugin template...'));
shell.exec(
  `shx rm -rf ${join(BUILD_DIR, `node_modules/`)} && shx rm -rf ${join(
    BUILD_DIR,
    'dist/',
  )}`,
);
