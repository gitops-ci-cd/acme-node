import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node
    },
    rules: {
      "no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ],
      "semi": ["warn", "always", { "omitLastInOneLineBlock": true }],
      "quotes": ["warn", "double"]
    }
  },
  pluginJs.configs.recommended,
];
