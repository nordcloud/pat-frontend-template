/* Copyright (c) 2021-2023 Nordcloud Oy or its affiliates. All Rights Reserved. */

import * as matchers from "@testing-library/jest-dom/matchers";
import { configure } from "@testing-library/react";
import { expect, vi } from "vitest";

expect.extend(matchers);

beforeAll(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

configure({
  asyncUtilTimeout: 3000,
});
