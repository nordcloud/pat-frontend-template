/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SetGlobalStyle } from "@nordcloud/gnui";
import { GNUIThemeProvider } from "~/hooks/useGnuiTheme";
import { App } from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement); // createRoot(container!) if you use TypeScript

root.render(
  <StrictMode>
    <SetGlobalStyle />
    <GNUIThemeProvider>
      <App />
    </GNUIThemeProvider>
  </StrictMode>
);
