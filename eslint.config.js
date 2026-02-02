import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import eslintPluginReact from "eslint-plugin-react";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintImport from "eslint-plugin-import";

import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";

// eslint-disable-next-line import/no-unused-modules
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx,js}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      react: eslintPluginReact,
      import: eslintImport,
      "react-hooks": reactHooks,
      "@stylistic": stylistic,
      "jsx-a11y": eslintPluginJsxA11y,
      "@typescript-eslint": typescriptEslint,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      // "@typescript-eslint/no-unused-vars": ["error", {
      //     varsIgnorePattern: "^_",
      // }],
      "@typescript-eslint/no-unused-vars": "off",
      "import/no-unused-modules": ["error", {
        unusedExports: true,
      }],
      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/function-component-definition": ["error", {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      }],
      "react/no-multi-comp": "error",
      "react/no-unstable-nested-components": "error",
      // Stylistic
      "@stylistic/semi": ["error", "always"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
    },
  },
]);
