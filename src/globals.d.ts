/* Copyright (c) 2020-2023 Nordcloud Oy or its affiliates. All Rights Reserved. */

/// <reference types="vite/client" />

import { CSSProp } from "styled-components";

interface DefaultTheme {}

declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp<DefaultTheme>;
  }
}
