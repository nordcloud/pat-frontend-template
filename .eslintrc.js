/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

require("@nordcloud/eslint-config-pat/patch/modern-module-resolution");

module.exports = {
  extends: [
    "@nordcloud/eslint-config-pat/profile/web-app",
    "@nordcloud/eslint-config-pat/mixins/react",
    "plugin:react/jsx-runtime",
  ],

  parserOptions: { tsconfigRootDir: __dirname },

  settings: {
    react: {
      version: "16.13.1", // React version. "detect" automatically picks the version you have installed.
    },
  },

  ignorePatterns: ["*.js", "vite.config.ts"],

  overrides: [
    {
      files: ["scripts/**/*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
