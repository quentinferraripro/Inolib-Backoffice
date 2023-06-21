import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";

beforeAll(() => {
  const consoleError = console.error;

  vi.spyOn(console, "error").mockImplementation((message?: unknown, ...optionalParams: unknown[]) => {
    if (
      typeof message !== "string" ||
      !message.includes("Consider adding an error boundary to your tree to customize error handling behavior.")
    ) {
      consoleError(message, ...optionalParams);
    }
  });
});

afterAll(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  cleanup();
});

expect.extend(matchers);
