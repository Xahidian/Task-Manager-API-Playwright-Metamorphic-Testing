// @ts-nocheck
export default {
  mutate: ["controllers/**/*.js"],  //  Only mutate controllers (not models)
  testRunner: "command",
  commandRunner: {
    command: "npm run test:MR"
  },
  reporters: ["html", "clear-text", "progress"],
  timeoutMS: 60000,
  concurrency: 4,
  coverageAnalysis: "all",
  
};