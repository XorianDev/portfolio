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
      // Simple instructions
      "max-statements-per-line": ["warn", { "max": 1 }],
      "no-nested-ternary": "warn",
      "no-unneeded-ternary": "warn",
      "one-var-declaration-per-line": ["warn", "always"],
      "operator-assignment": ["warn", "always"],
      "operator-linebreak": ["warn", "none"],
      // Small functions
      "max-depth": ["warn", 1],
      "max-lines-per-function": [
        "warn",
        { "max": 10, "skipBlankLines": true, "skipComments": true }
      ],
      "max-nested-callbacks": ["warn", 1],
      "max-params": ["warn", 2],
      // Logic control
      "complexity": ["warn", { "max": 5 }],
      "max-lines": ["warn", 100],
      "no-else-return": "warn",
      // Naming conventions
      "no-magic-numbers": [
        "warn",
        {
          "detectObjects": false,
          "enforceConst": true,
          "ignore": [-1, 0, 1, 2, 10, 100],
          "ignoreArrayIndexes": true
        }
      ],
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          "selector": "default",
          "format": ["camelCase"],
          "leadingUnderscore": "forbid"
        },
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
          "selector": "typeParameter",
          "format": ["PascalCase"],
          "prefix": ["T", "K"]
        },
        {
          "selector": "enumMember",
          "format": ["UPPER_CASE"]
        },
        {
          "selector": ["memberLike", "variableLike"],
          "types": ["boolean"],
          "format": ["PascalCase"],
          "prefix": ["can", "did", "has", "is", "must", "needs", "should", "will"]
        }
      ],
      // Syntax preferences
      "arrow-parens": ["warn", "as-needed"],
      "block-spacing": ["warn", "always"],
      "curly": ["warn", "all"],
      "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 1 }],
      "no-unused-vars": "off",
      "@typescript-eslint/explicit-member-accessibility": [
        "warn",
        {
          "accessibility": "no-public",
          "overrides": {
            "parameterProperties": "explicit"
          }
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-useless-constructor": "warn",
      "@typescript-eslint/no-empty-function": "warn"
    },
  },

  // Ignore declaration and config files
  {
    ignores: ["**/*.d.ts", "**/*.config.ts"],
  },
];