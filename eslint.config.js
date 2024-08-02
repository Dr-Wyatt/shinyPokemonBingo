import globals from "globals";

import typescriptESLintParser from "@typescript-eslint/parser";

import eslintConfigPrettier from "eslint-config-prettier";
import reactRefresh from "react-refresh";
import eslint from "@eslint/js";
import prettier from "prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default [
  eslint.configs.recommended,
  {
    files: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 2020,
      parser: typescriptESLintParser,
    },
  },
  { ignores: ["dist", "eslint.config.js", ".yarn"] },
  {
    plugins: {
      "react-refresh": reactRefresh,
      prettier,
      pluginQuery,
    },
  },
  {
    rules: {
      "jsx-quotes": ["error", "prefer-single"],
      quotes: [
        "error",
        "double",
        {
          allowTemplateLiterals: true,
          avoidEscape: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
];
