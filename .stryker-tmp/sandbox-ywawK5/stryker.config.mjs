// @ts-nocheck
export default {
  mutate: ["controllers/**/*.js"],  //  Only mutate controllers (not models)
  testRunner: "command",
  commandRunner: {
    command: "npx playwright test tests/playwright_baseline.test.js"
  },
  reporters: ["html", "clear-text", "progress"],
  timeoutMS: 60000,
  concurrency: 4,
  coverageAnalysis: "all",
  
};