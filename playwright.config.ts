/**
 * playwright.config.ts: This module is responsible for configuring the Playwright test runner.
 * It includes settings for test execution, browser configuration, and environment variables.
 * See https://playwright.dev/docs/test-configuration for more details.
 */

import {
  ACTION_TIMEOUT,
  EXPECT_TIMEOUT,
  NAVIGATION_TIMEOUT,
  TEST_TIMEOUT,
} from './src/loopTech/utils/timeout-constants';
import { WaitForLoadStateOptions } from './src/loopTech/setup/optional-parameter-types';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const BASE_URL = process.env.URL;
/**
 * Default load state to be used while loading a URL or performing a click and navigate operation.
 * The load state is set to 'domcontentloaded', which means the action will wait until the 'DOMContentLoaded' event is fired.
 */
export const LOADSTATE: WaitForLoadStateOptions = 'domcontentloaded';

export default defineConfig({
  /**
   * The directory where tests are located.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-testdir
   */
  testDir: './tests/specs',
  /**
   * Determines whether to run tests within each spec file in parallel, in addition to running the spec files themselves in parallel.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-fullyparallel
   */
  fullyParallel: false,
  /**
   * Whether to fail the build on CI if you accidentally left test.only in the source code.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-forbidonly
   */
  forbidOnly: !!process.env.CI,
  /**
   * The number of times to retry failed tests. Retries value is only set to happen on CI.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-retries
   */
  retries: process.env.CI ? 2 : 0,
  /**
   * The number of worker threads to use for running tests. This is set to a different value on CI.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-workers
   */
  workers: process.env.CI ? 3 : 6,
  /**
   * Shared settings for all the projects below.
   * See https://playwright.dev/docs/api/class-testoptions
   */
  globalSetup: require.resolve('./src/loopTech/setup/global-setup.ts'),
  globalTeardown: require.resolve('./src/loopTech/setup/global-teardown.ts'),
  timeout: TEST_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  use: {
    headless: true,
    /* Sets extra headers for CloudFlare. */
    extraHTTPHeaders: {
      'CF-Access-Client-Id': process.env.CF_CLIENT_ID || '',
      'CF-Access-Client-Secret': process.env.CF_CLIENT_SECRET || '',
    },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    testIdAttribute: 'qa-target',
    /**
     * The base URL to be used in navigation actions such as `await page.goto('/')`.
     * This allows for shorter and more readable navigation commands in the tests.
     */
    baseURL: BASE_URL,
    /* Records traces after each test failure for debugging purposes. */
    trace: 'retain-on-failure',
    /* Captures screenshots after each test failure to provide visual context. */
    screenshot: 'only-on-failure',
    /* Sets a timeout for actions like click, fill, select to prevent long-running operations. */
    actionTimeout: ACTION_TIMEOUT,
    /* Sets a timeout for page loading navigations like goto URL, go back, reload, waitForNavigation to prevent long page loads. */
    navigationTimeout: NAVIGATION_TIMEOUT,
  },

  /**
   * Configure projects for major browsers.
   * See https://playwright.dev/docs/test-configuration#projects
   */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
        launchOptions: {
          args: ['--disable-web-security'],
          /* --auto-open-devtools-for-tabs option is used to open a test with Network tab for debugging. It can help in analyzing network requests and responses.*/
          // args: ["--disable-web-security","--auto-open-devtools-for-tabs"],
          slowMo: 0,
        },
      },
    },
  ],
});
