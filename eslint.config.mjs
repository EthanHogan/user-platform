import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import tsParserOptions from "@typescript-eslint/parser";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

const config = [
  {
    ignores: ["convex/_generated/**", ".next/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      globals: {
        process: "readonly",
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
      globals: {
        setTimeout: "readonly",
        clearTimeout: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.tsx"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ],
    },
  },
];

export default config;
