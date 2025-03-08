// @ts-nocheck
export default {
  mutate: [], // Disable mutation testing for debugging
 // Files to mutate
  testRunner: "command", // Playwright test runner
  commandRunner: {
    command: "npx playwright test --workers=1" // Run Playwright tests
  },
  reporters: ["html", "clear-text", "progress"], // Mutation report formats
  concurrency: 1, // Run tests sequentially
  timeoutMS: 600000, // Prevent timeout issues
};
