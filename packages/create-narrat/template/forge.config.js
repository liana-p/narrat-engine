const fs = require("fs");

module.exports = {
  packagerConfig: {
    icon: "icon",
    ignore: [
      ".vscode",
      "public",
      "src",
      "types",
      ".nvmrc",
      ".gitignore",
      ".prettierignore",
      ".prettierrc.json",
      "marketing",
      "package-lock.json",
      "out",
      "out-steam",
      "scripts",
      "steam-sdk",
      "steamworks_sdk_161",
      "steamworks_sdk_162",
      "README.md",
      "steam_appid.txt",
      "tsconfig.json",
      "vite.config.ts",
    ],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Game",
        authors: "Game authors",
        description: "Game Description",
      },
    },
    {
      name: "@electron-forge/maker-zip",
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "icon.png",
        },
      },
    },
  ],
  hooks: {
    generateAssets: async () => {
      fs.writeFileSync(
        "./electron-env.json",
        JSON.stringify({
          steam: process.env.VITE_STEAM,
          debug: process.env.VITE_DEBUG,
        }),
      );
    },
  },
};
