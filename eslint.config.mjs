import { defineConfig, globalIgnores } from "eslint/config";
import vue from "eslint-plugin-vue";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/dist", "**/out", "**/temp"]), {
    extends: compat.extends("plugin:vue/essential", "standard", "prettier"),

    plugins: {
        vue,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            parser: "@typescript-eslint/parser",
        },
    },

    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
    },

    rules: {
        "no-restricted-imports": ["error", {
            patterns: [{
                group: ["@/lib**"],
                message: "Do not import from the lib folder",
            }],
        }],

        "no-use-before-define": "off",
        "no-undef": "off",
        "no-eval": "off",
        "no-unused-vars": "warn",
        "vue/no-multiple-template-root": "off",
    },
}]);