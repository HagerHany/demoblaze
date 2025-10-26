import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*-test.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // ✅ ADD THESE:
  timeout: 60000,                    // 60s per test
  expect: {
    timeout: 10000                   // 10s for assertions
  },
  
  reporter: 'html',
  use: {
    // ✅ ADD THESE:
    actionTimeout: 15000,            // 15s for clicks, fills, etc.
    navigationTimeout: 30000,        // 30s for page loads
    
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

