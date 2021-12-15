#!/usr/bin/env node

/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

const madge = require("madge");

const MAX_CIRCULARS = 0;

const entryFile = process.cwd() + "/src/index.tsx";
const tsConfig = process.cwd() + "/tsconfig.json";

madge(entryFile, {
  tsConfig,
  fileExtensions: ["ts", "tsx"],
  detectiveOptions: {
    ts: {
      skipTypeImports: true,
    },
  },
}).then((res) => {
  const circulars = res.circular();

  if (circulars.length > MAX_CIRCULARS) {
    console.error("Circular dependencies detected", "\n", circulars);
    process.exit(1);
  }

  process.exit(0);
});
