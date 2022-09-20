/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

const { execSync } = require("child_process");

function codeVersion() {
  return execSync("git rev-parse --short HEAD").toString().trim();
}

module.exports = { codeVersion };
