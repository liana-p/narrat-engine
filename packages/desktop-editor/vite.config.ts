import { defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { resolve } from "path";
import WindiCSS from "vite-plugin-windicss";
import Narrat from "vite-plugin-narrat";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const conf: UserConfigExport = {
    server: {
      port: 5817,
    },
    base: "",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [vue(), WindiCSS(), Narrat()],
  };
  return conf;
});
