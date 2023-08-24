/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

import { useState } from "react";
import { Spinner, Text, theme } from "@nordcloud/gnui";
import { Wrapper, Box, buttonCss } from "~/styles";
import { ReactComponent as Logo } from "./logo.svg";
import "./App.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
      <header className="App-header">
        <Logo className="App-logo" />
        <Text
          css={{
            fontSize: theme.fontSizes.xxl,
          }}
        >
          Hello Vite + React! <Spinner ninja />
        </Text>
        <button
          type="button"
          css={buttonCss}
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          count is: {count}
        </button>
        <Text>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </Text>
        <Box>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </Box>
      </header>
    </Wrapper>
  );
}
