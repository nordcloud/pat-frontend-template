/// <reference types="vitest" />
/// <reference types="vite/client" />

/* Copyright (c) 2021-2023 Nordcloud Oy or its affiliates. All Rights Reserved. */

import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
import svgrPlugin from "vite-plugin-svgr";
import { createHtmlPlugin } from "vite-plugin-html";
import checker from "vite-plugin-checker";
import { configDefaults } from "vitest/config";
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
      createHtmlPlugin({
        inject: {
          data: {
            env: {
              NODE_ENV: process.env.NODE_ENV,
              REACT_APP_CLIENT_TOKEN: env.REACT_APP_CLIENT_TOKEN,
              REACT_APP_ENV: env.REACT_APP_ENV,
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
      teardownTimeout: 180000,
      clearMocks: true,
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      coverage: {
        src: ["src"],
        include: ["src/**/*.{ts,tsx}"],
        exclude: [
          ...(configDefaults.coverage.exclude ?? []),
          "src/setupTests.ts",
          "src/**/__mockups__/**",
          "src/**/__tests__/**",
          "src/**/*.spec.ts",
          "src/**/*.spec.tsx",
        ],
        reporter: ["text", "lcovonly"],
        provider: "v8",
        all: true,
        lines: 45,
        branches: 35,
        functions: 35,
        statements: 45,
      },
      reporters: process.env.CI ? ["default"] : ["default", "verbose"],
    },
  };
});
