# CRA -> Vite migration guide

A step-by-step guide for migrating a project from v4 of [Create React App](https://create-react-app.dev/) to [Vite](https://vitejs.dev/) with `ts-jest` setup.a

## Table of Contents

- [Remove Create React App](#1-remove-create-react-app)
- [Install Vite](#2-install-vite)
  - [Update tsconfig](#update-tsconfig-path-aliasing-included)
  - [Update package.json](#update-packagejson)
  - [Create config file](#create-config-file)
- [Environment variables](#3-environment-variables)
- [Static analysis](#4-static-analysis)
- [Babel plugins](#5-babel-plugins)
- [SVG components](#6-svg-components)
- [Index.html](#7-indexhtml)
- [Testing environment setup](#8-testing-environment-setup)
  - [Install packages](#install-packages)
  - [Jest config setup](#jest-config-setup)
  - [Mock SVG files](#mock-svg-files)
  - [Add scripts](#add-scripts)
  - [Alternative setups](#alternative-setups)
- [Additional features](#9-additional-features)
- [Troubleshooting](#troubleshooting)

## 1. Remove Create React App

- uninstall packages

  ```bash
  npm uninstall react-scripts
  ```

- remove package.json entries:

  **package.json**

  ```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "test": "react-scripts test",
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}"
    ],
    "coveragePathIgnorePatterns": [
      "<rootDir>/node_modules/",
    ]
  },
  ```

## 2. Install Vite

```bash
npm install -D vite @vitejs/plugin-react
```

### Update `tsconfig` (path aliasing included)

**tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {
      "~/*": ["./src/*"]
    },
    "baseUrl": "."
  },
  "include": ["./src"]
}
```

### Update `package.json`

```json
"scripts": {
  "dev": "vite",
  "dev:clean": "npm run dev -- --force",
  "build": "tsc && vite build",
  "serve": "vite preview --port 3000",
}
```

### Create config file

Add **vite.config.ts** at the root of your project

```typescript
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: "build",
    },
  };
});
```

### Create vite-env.d.ts

Add **vite-env.d.ts** in the `src` folder of your project

```typescript
/// <reference types="vite/client" />
```


## 3. Environment variables

Vite handles environment variables in a different way than CRA, [Read here](https://vitejs.dev/guide/env-and-mode.html),
to avoid complete refactoring and preserve backwards-compatibilty we can use a custom [plugin](https://github.com/IndexXuan/vite-plugin-env-compatible).

```bash
npm install -D vite-plugin-env-compatible
```

**vite.config.ts**

```typescript
import envCompatible from "vite-plugin-env-compatible";

const ENV_PREFIX = "REACT_APP_";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [envCompatible({ prefix: ENV_PREFIX })],
  };
});
```

## 4. Static analysis

By default, type checking & linting in CRA was built into dev server, we can implement this in Vite with a [plugin](https://github.com/fi3ework/vite-plugin-checker).
I will omit running `eslint` here since it can pollute terminal & browser console output with many warnings, it's also pretty slow in larger codebases.
Additional linting can be handled by IDE setup, git hooks & PR checks (e.g. github actions).

```bash
npm install -D vite-plugin-checker
```

**vite.config.ts**

```typescript
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      checker({
        overlay: false,
        typescript: true,
      }),
    ],
  };
});
```

## 5. Babel plugins

We were adding custom babel plugins to CRA webpack setup via [craco](https://github.com/gsoft-inc/craco).
This is how we can handle it in Vite (example includes usage of [Styled Components plugin](https://styled-components.com/docs/tooling#babel-plugin)):

```typescript
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
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
  };
});
```

## 6. SVG Components

CRA allows to transform `.svg` files into React components.

```tsx
import { ReactComponent as Logo } from "./logo.svg?react";
```

In order to make this work with Vite we will need a [plugin](https://github.com/pd4d10/vite-plugin-svgr)

```bash
npm install -D vite-plugin-svgr
```

```typescript
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      svgrPlugin({
        svgrOptions: {
          icon: true,
          // ...svgr options (https://react-svgr.com/docs/options/)
        },
      }),
    ],
  };
});
```

Add additional declaration to the `src/vite-env.d.ts` file

```typescript
/// <reference types="vite-plugin-svgr/client" />
```


## 7. Index.html

- Move `index.html` from `/public` to the root of the project
- Remove any `%PUBLIC_URL%` references from the file

  ```html
  <!-- Before -->
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />

  <!-- After -->
  <link rel="icon" href="/favicon.ico" />
  ```

- Add Entry script tag to 'index.html'

  ```html
  <!-- Add to body -->
  <script type="module" src="/src/index.tsx"></script>
  ```

- Embedding JavaScript:
  CRA supported [ejs](https://ejs.co/) out of the box, we will need additional [plugin for Vite](https://github.com/anncwb/vite-plugin-html):

  ```bash
  npm install -D vite-plugin-html
  ```

  **vite.config.ts**

  ```typescript
  import html from "vite-plugin-html";

  // https://vitejs.dev/config/
  export default defineConfig(({ mode }) => {
    return {
      plugins: [
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
      ],
    };
  });
  ```

  Conditionally append scripts and pass environment variables:

  **index.html**

  ```html
  <html lang="en">
    <head>
      <% if (env.NODE_ENV === 'production') { %>
      <!-- production -->
      <script>
        SOME_SERVICE.init({
          clientToken: "<%= env.REACT_APP_CLIENT_TOKEN %>",
          env: "<%= env.REACT_APP_ENV %>",
        });
      </script>
      <% } %>
    </head>
  </html>
  ```

## 8. Testing environment setup

Create React App used `babel` to transform the code for `jest`, we're gonna use [ts-jest](https://kulshekhar.github.io/ts-jest/docs/babel7-or-ts/) in our setup.

### Install packages

```bash
npm install -D jest ts-jest jest-watch-typeahead identity-obj-proxy
```

### Jest config setup

Create `jest.config.js` file and add below config:

```typescript
// jest.config.js
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  transform: {
    "\\.(ts|js)x?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
  resetMocks: true,
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/svg.js",
    "~(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/node_modules", "."],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  testTimeout: 10000, // optional
};

module.exports = config;
```

### Mock SVG files

Create `__mocks__/svg.js`:

```javascript
export default "SvgrURL";
export const ReactComponent = "div";
```

### Add scripts

**package.json**

```json
"scripts": {
  "test": "jest",
  "test:watch": "npm run test -- --watch",
  "test:all": "npm run test -- --silent --watchAll=false",
  "test:coverage": "npm run test:all -- --coverage",
}
```

### Alternative setups

- [Babel setup](https://jestjs.io/docs/tutorial-react#setup-without-create-react-app)
- [Vitest](https://vitest.dev/) - unit-test framework powered by Vite
- [esbuild-jest](https://github.com/aelbore/esbuild-jest)
- [@swc/jest](https://swc.rs/docs/usage/jest)

## 9. Additional features

### Open tab when server starts

Add possibility to configure opening a new tab when dev server is launched (it was turned on by default in CRA):

**.env**

```bash
SERVER_OPEN_BROWSER=true
```

**vite.config.ts**

```typescript
import { defineConfig, loadEnv } from "vite";

const ENV_PREFIX = ["REACT_APP_", "SERVER"];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "env", ENV_PREFIX);

  return {
    server: {
      port: 3000,
      open: env.SERVER_OPEN_BROWSER === "true",
    },
  };
});
```

### Compile time replacement

There are cases when we want to replace certain variables with some values at compile time (e.g. insert code version extracted from git for uploading source maps),
we've used [craco](https://github.com/gsoft-inc/craco) and [Define plugin](https://webpack.js.org/plugins/define-plugin/) to achieve that in CRA:

**craco.config.js**

```typescript
module.exports = {
  webpack: {
    plugins: [
      new DefinePlugin({
        "process.env.CODE_VERSION": JSON.stringify(codeVersion()),
      }),
    ],
  },
};
```

It can be easily replicated using Vite:

**vite.config.ts**

```typescript
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    define: {
      "process.env.CODE_VERSION": JSON.stringify(codeVersion()),
    },
  };
});
```

## Troubleshooting

### `require is not defined` runtime error

The cause of this is that modules(probably some npm package) marked as ESM use `require` in their code (e.g. to dynamically load other modules).
To resolve this, add this to `vite.config.ts`

```typescript
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
```
