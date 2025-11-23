# Godot 4 Web Export local server example (for local testing)

I was trying to run the Godot 4 web export and realised that it requires specific cors headers to be set on the server to run due to their usage of webGL2 and SharedArrayBuffer.

Godot links to a python script for it in their [exporting for web](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html) documentation, but this script also didn't work for me.

I made a simple node.js server using Express which can serve an exported Godot game currently for local testing

## How it works

1. This repo is a Godot project, and the game gets exported to `export/public`.
2. The `export` folder contains a node.js server which will serve whatever is in the `public` folder with the right headers.
3. Running this node.js server allows you to view the exported game at `http://localhost:3000`

## How to use

1. Have [node.js](https://nodejs.org/en) installed
2. Either clone this repo, or create your own Godot project and set it up to export the web build to `export/public/index.html`, and to use a custom html shell (if you want to use one) in `export` (for example the included `export/export-template.html`)
3. Open the project in Godot, and export it so that it's in the `export/public` folder
4. Open a terminal in the `exports` folder
5. Run `pnpm install` (only needed the first time)
6. Run `pnpm start` to start the server
7. Open `http://localhost:3000` in your browser to view the game
