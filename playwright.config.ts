import { defineConfig, devices } from 'playwright/test'

const applicationPath =
  process.env.APPLICATION_PATH || '../desktop'

export default defineConfig({
  testDir: './playwright/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  globalSetup: './playwright/global-setup.ts',
  use: {
    baseURL: 'http://127.0.0.1:1342',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npm run dev --prefix ${applicationPath}`,
    port: 1342,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
