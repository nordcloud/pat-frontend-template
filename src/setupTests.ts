/* Copyright (c) 2021-2023 Nordcloud Oy or its affiliates. All Rights Reserved. */

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import * as matchers from "@testing-library/jest-dom/matchers";
import { configure } from "@testing-library/react";
import { expect, vi } from "vitest";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- it makes sense to have it here
  type Assertion<T = any> = jest.Matchers<void, T> &
    TestingLibraryMatchers<T, void> &
    object;
}

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
