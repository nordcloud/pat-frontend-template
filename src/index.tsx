/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { SetGlobalStyle } from "@nordcloud/gnui";
import { App } from "./App";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <SetGlobalStyle />
    <App />
  </StrictMode>,
  document.getElementById("root")
);
