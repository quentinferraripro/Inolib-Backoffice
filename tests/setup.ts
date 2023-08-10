import "@testing-library/jest-dom";

// beforeAll(() => {
//   const consoleError = console.error;
//   const consoleLog = console.log;

//   jest.spyOn(console, "error").mockImplementation((message?: unknown, ...optionalParams: unknown[]) => {
//     if (
//       typeof message !== "string" ||
//       !message.includes("Consider adding an error boundary to your tree to customize error handling behavior.")
//     ) {
//       consoleError(message, ...optionalParams);
//     }
//   });

//   jest.spyOn(console, "log").mockImplementation((message?: unknown, ...optionalParams: unknown[]) => {
//     if (
//       typeof message !== "string" ||
//       !message.includes("Download the Apollo DevTools for a better development experience")
//     ) {
//       consoleLog(message, ...optionalParams);
//     }
//   });
// });

afterAll(() => {
  jest.restoreAllMocks();
});
