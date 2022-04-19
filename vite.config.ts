/// <reference types="vitest" />
/// <reference types="vite/client" />

/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";
import envCompatible from "vite-plugin-env-compatible";
import svgrPlugin from "vite-plugin-svgr";
import html from "vite-plugin-html";
import checker from "vite-plugin-checker";
import { codeVersion } from "./scripts/code-version";

const ENV_PREFIX = "REACT_APP_";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "env", [ENV_PREFIX, "SERVER"]);
  const isProd = env.REACT_APP_ENV === "production";

  return {
    plugins: [
      envCompatible({ prefix: ENV_PREFIX }),
      checker({
        overlay: false,
        typescript: true,
      }),
      html({
        inject: {
          data: {
            env: {
              NODE_ENV: process.env.NODE_ENV,
              REACT_APP_CLIENT_TOKEN: process.env.REACT_APP_CLIENT_TOKEN,
              REACT_APP_ENV: process.env.REACT_APP_ENV,
            },
          },
        },
        minify: true,
      }),
      svgrPlugin({
        svgrOptions: {
          icon: true,
          // ...svgr options (https://react-svgr.com/docs/options/)
        },
      }),
      react({
        babel: {
          plugins: [
            [
              "babel-plugin-styled-components",
              {
                displayName: true,
                fileName: false,
              },
            ],
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: 3000,
      open: env.SERVER_OPEN_BROWSER === "true",
    },
    define: {
      "process.env.CODE_VERSION": JSON.stringify(codeVersion()), // Useful for uploading sourcemaps
    },
    build: {
      outDir: "build",
      sourcemap: isProd ? "hidden" : true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests.ts",
      testTimeout: 10000,
      clearMocks: true,
      coverage: {
        include: ["src/**/*.{js,jsx,ts,tsx}"],
      },
    },
  };
});
