// run the server
node server.js
// Run Playwrght tests
 npx playwright test tests/playwright_baseline.test.js //Integration Test:
npx playwright test tests/playwright_metamorphic.test.js //Metamorphic test

// Run Mutation tests
npx stryker run
