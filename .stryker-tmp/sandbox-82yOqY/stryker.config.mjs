// @ts-nocheck
export default {
  mutate: ["controllers/**/*.js"],  
  testRunner: "command",
  commandRunner: {
    command: "npm run test:baseline"
  },
  reporters: ["html", "clear-text", "progress"],
  timeoutMS: 60000,
  concurrency: 4,
  coverageAnalysis: "all",
  
};