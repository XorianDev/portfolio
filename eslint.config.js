import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  // Astro handles .astro files internally
  ...eslintPluginAstro.configs.all,

  // TypeScript files ONLY
  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
    },

    rules: {
      // your TS rules here
    },
  },

  // Ignore declaration files
  {
    ignores: ["**/*.d.ts"],
  },
];