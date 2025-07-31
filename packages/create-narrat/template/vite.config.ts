import { defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import Narrat from "vite-plugin-narrat";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  process.env.VITE_BUILD_DATE = new Date().toLocaleString();
  process.env.VITE_BUILD_VERSION = packageJson?.version ?? "Unknown";
  process.env.VITE_GAME_NAME = packageJson?.name ?? "Unknown Game";
  const conf: UserConfigExport = {
    base: "",
    optimizeDeps: {
      exclude: ["steamworks.js"],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [vue(), Narrat()],
  };
  return conf;
});
