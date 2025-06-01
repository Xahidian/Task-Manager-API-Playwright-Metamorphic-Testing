// @ts-nocheck
export default {
  mutate: ["controllers/**/*.js"],  
  testRunner: "command",
  commandRunner: {
    command: "npm run test:MR"  // Make sure this runs only essential tests
  },
  reporters: ["html", "clear-text", "progress"],
  timeoutMS: 80000,   // Increase to 2 minutes per mutant
  concurrency: 2,      // Lower concurrency for stability
  coverageAnalysis: "all",
  // Optional: log level to trace problematic mutants
  logLevel: "trace"
};
