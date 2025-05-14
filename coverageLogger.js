// coverageLogger.js
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'manual_coverage_log.txt');

function log(label) {
  const line = `${new Date().toISOString()} - HIT: ${label}\n`;
  fs.appendFileSync(logFile, line);
}

module.exports = { log };
