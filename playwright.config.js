// @ts-check
import { defineConfig, devices } from '@playwright/test';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30*1000, //It will wait for 30 seconds for the test to be completed before throwing an error
    expect: {
    timeout: 5000,  //It will wait for 5 seconds to find the element to be visible before throwing an error
  },
    reporter: 'html',

    use: {
    browserName: 'chromium',
    headless: true,  //if we want to see the browser in action, we can set headless to false
  },

  });
  module.exports = config
