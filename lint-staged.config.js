/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

module.exports = {
  "*.{ts,tsx}": ["prettier --write", "stylelint", "eslint --fix"],
  "*.{md,yaml,yml,graphql,json}": ["prettier --write"],
};
