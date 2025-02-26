import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000, // 30 seconds per test
    expect: { timeout: 5000 },
    fullyParallel: true,
    reporter: [['html', { open: 'never' }]],
    use: {
        baseURL: 'http://localhost:5000/api/tasks',
        trace: 'on',
    },
});
