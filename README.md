# Vite template for frontend projects

This is a basic setup for our frontend projects, it includes [**Migration guide**](./docs/CRA_MIGRATION_GUIDE.md) from deprecated **Create React App** setup.

## Components

1. Frontend application based on [**Vite**](https://vitejs.dev/)
2. Code is written in [**Typescript**](https://basarat.gitbook.io/typescript/getting-started)
3. [**Prettier**](https://prettier.io/) formatter
4. Linting implemented with [**Stylelint**](https://stylelint.io/) and [**ESLint**](https://eslint.org/)
5. Testing setup consists of [**Vitest**](https://vitest.dev/) and [**Testing Library**](https://testing-library.com/)
6. Support for styling with [**Styled Components**](https://styled-components.com/)
7. [**GNUI**](https://github.com/nordcloud/GNUI) component library
8. Additional checks that improve codebase maintenance (**circular dependencies, unused exports**)
9. **Git hooks** support
10. **Alias import** support

## Setup

### 1. Make sure you use a proper Node.js and npm versions

Check `engines` field in `package.json` to see currently supported versions

Automatic setup for [NVM](https://github.com/nvm-sh/nvm) users

```bash
nvm install
nvm use
```

### 2. Install packages

```bash
npm install
```

### 3. Add [env file](https://vitejs.dev/guide/env-and-mode.html#env-files)

Create `.env` file

```bash
REACT_APP_CLIENT_TOKEN=
REACT_APP_ENV=development
SERVER_OPEN_BROWSER=false
```

## [Create React App migration guide](./docs/CRA_MIGRATION_GUIDE.md)
