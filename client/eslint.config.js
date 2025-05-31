import globals from "globals";
import js from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

const problematicKey = "AudioWorkletGlobalScope ";
if (typeof globals !== 'undefined' && globals.browser && Object.hasOwn(globals.browser, problematicKey)) {
  const value = globals.browser[problematicKey];
  delete globals.browser[problematicKey];
  globals.browser[problematicKey.trim()] = value;
}

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      }
    },
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      ...pluginReactConfig.plugins,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReactConfig.rules,
      ...configPrettier.rules,
      "prettier/prettier": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: pluginReactConfig.languageOptions,
  },
  pluginReactJsxRuntime,
  {
    plugins: {
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];