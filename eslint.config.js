import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import typescriptESLintParser from "@typescript-eslint/parser";

import reactRefresh from "react-refresh";
import eslint from "@eslint/js";
import prettier from "prettier";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      parser: typescriptESLintParser,
    },
  },
  { ignores: ["dist", "eslint.config.js", ".yarn"] },
  {
    plugins: {
      "react-refresh": reactRefresh,
      prettier,
      eslintPluginPrettierRecommended,
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
];
