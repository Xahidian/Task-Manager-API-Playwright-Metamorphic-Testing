export default {
  mutate: ["controllers/**/*.js"],  
  testRunner: "command",
  commandRunner: {
    command: "npm run test:MR"
  },
  reporters: ["html", "clear-text", "progress"],
  timeoutMS: 100000,
  concurrency: 4,
  coverageAnalysis: "all",
  
};