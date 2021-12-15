#!/usr/bin/env node

const { execSync } = require("child_process");

function codeVersion() {
  return execSync("git rev-parse --short HEAD").toString().trim();
}

module.exports = { codeVersion };
