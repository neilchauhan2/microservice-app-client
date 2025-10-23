import "@testing-library/jest-dom";
import { expect, afterEach, vi, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";

// Mock localStorage globally
const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Suppress console errors during tests (optional)
beforeAll(() => {
  global.console = {
    ...console,
    error: vi.fn(),
    warn: vi.fn(),
  };
});
