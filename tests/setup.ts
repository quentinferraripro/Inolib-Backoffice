// import matchers from "@testing-library/jest-dom/matchers";
// import { cleanup } from "@testing-library/react";
// import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";

// beforeAll(() => {
//   const consoleError = console.error;
//   const consoleLog = console.log;

//   vi.spyOn(console, "error").mockImplementation((message?: unknown, ...optionalParams: unknown[]) => {
//     if (
//       typeof message !== "string" ||
//       !message.includes("Consider adding an error boundary to your tree to customize error handling behavior.")
//     ) {
//       consoleError(message, ...optionalParams);
//     }
//   });

//   vi.spyOn(console, "log").mockImplementation((message?: unknown, ...optionalParams: unknown[]) => {
//     if (
//       typeof message !== "string" ||
//       !message.includes("Download the Apollo DevTools for a better development experience")
//     ) {
//       consoleLog(message, ...optionalParams);
//     }
//   });
// });

// afterAll(() => {
//   vi.restoreAllMocks();
// });

// afterEach(() => {
//   cleanup();
// });

// expect.extend(matchers);
