import eslintJs from '@eslint/js';
import pluginN from 'eslint-plugin-n';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/', '.env', '*.log', 'coverage/', 'dist/'],
  },
  eslintJs.configs.recommended,

  // Configuration specifically for eslint.config.js
  {
    files: ['eslint.config.js'], // Target only this config file
    plugins: {
      n: pluginN, // Needed to recognize 'n/' rules
    },
    rules: {
      'n/no-unpublished-import': 'off', // Allow importing devDependencies here
    },
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  // ESLint Node plugin configuration for application source files
  {
    files: ['server.js', 'models/**/*.js', 'routes/**/*.js'], // Target application source
    plugins: {
      n: pluginN,
      prettier: pluginPrettier,
    },
    rules: {
      // Apply Node.js recommended rules (this will include n/no-unpublished-import as error/warn)
      ...pluginN.configs['flat/recommended-script'].rules,
      // Apply Prettier rules and disable conflicting ESLint rules
      ...configPrettier.rules,
      'prettier/prettier': 'warn',
      // Your custom rules for app code
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'func-names': 'off',
      'object-shorthand': 'off',
      'class-methods-use-this': 'off',
      // 'n/no-unpublished-import': 'off', // This line is removed from here
      // Add any specific Node.js rules you want to override or add
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },

  // Configuration for test files (if any, based on your original 'overrides')
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
    rules: {
      // relax or change rules specifically for test files if needed
      // e.g., "no-unused-expressions": "off" for Chai assertions
    },
  },
];
