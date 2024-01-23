# Narrat Desktop Editor

A game editor IDE for narrat games, built with [tauri](https://tauri.app/).

**This editor is in early development. It works for very basic use but is not yet the recommended way to edit narrat games.**

## Installing

Once the CI build is working, there will be GitHub releases with binaries to download for Windows/MacOS/Linux. For now, the only way to run this is from the source.

## Running from source

### Installation

- Clone or download this repo
- Install [node.js](https://nodejs.org) 20+ (LTS recommended)
- Install [pnpm](https://pnpm.io/installation). Narrat is a monorepo which uses pnpm instead of npm.
- Install Rust: `curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh`
- Run `pnpm install`

### Running

Run `pnpm dev` to start the IDE. Then use the menu to open a folder containing a narrat project.

### Building

Run `pnpm build`

### Releasing

Releases are automatically triggered by the github workflow `ide.yml` when a push is made to a `ide-v*` branch. The workflow will build the app and upload the binaries to the release.
