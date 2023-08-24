/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

module.exports = {
  "*.{ts,tsx}": ["prettier --write", "eslint --fix", "stylelint"],
  "*.graphql": ["prettier --write", "eslint --fix"],
  "*.{json,json5,md,yml,js,css,html}": ["prettier --write"],
};
