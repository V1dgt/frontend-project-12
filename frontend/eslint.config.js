import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }]
    }
  },
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "react-hooks": pluginReactHooks
    },
    rules: pluginReactHooks.configs.recommended.rules
  },
  {
    plugins: {
      "@stylistic": stylistic
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "import/extensions": 0,
      "import/no-unresolved": 0,
      "react/prop-types": 0,
      "no-console": 0,
      "react/react-in-jsx-scope": 0,
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
      "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
      "import/prefer-default-export": 0,
      "no-underscore-dangle": [2, { allow: ["__filename", "__dirname"] }],

      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/comma-dangle": ["error", "only-multiline"],
      "@stylistic/quote-props": ["error", "consistent-as-needed"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/multiline-ternary": "off",
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/max-statements-per-line": ["error", { max: 2 }],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }]
    }
  }
]);
