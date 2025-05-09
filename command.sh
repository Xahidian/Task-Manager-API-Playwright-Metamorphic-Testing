// run the server
node server.js
// Run Playwrght tests
 npm run test:baseline //Integration Test:
npx playwright test tests/playwright_metamorphic.test.js //Metamorphic test

// Run Mutation tests --workers=1
npx stryker run
