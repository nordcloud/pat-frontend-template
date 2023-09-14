/**
 * Copyright 2023 Nordcloud Oy or its affiliates. All Rights Reserved.
 */

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import type { Assertion, AsymmetricMatchersContaining } from "vitest";

type CustomMatchers = jest.Matchers<void, T> & TestingLibraryMatchers<T, void>;

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
