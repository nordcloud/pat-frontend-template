/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

import * as React from "react";
import ReactDOM from "react-dom";
import { SetGlobalStyle } from "@nordcloud/gnui";
import { App } from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <SetGlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
