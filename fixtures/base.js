import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { RegisterPage } from '../pages/registerPage.js';
import { LogoutPage } from '../pages/logoutPage.js';
import { ProductPage } from '../pages/productPage.js';
import { CategoriesPage } from '../pages/categoriesPage.js';
import { readUserData } from '../utils/dataHelper.js';
import fs from 'fs';

/**
 * Custom test fixtures that extend Playwright's base test
 * Provides automatic setup and page object initialization
 */
export const test = base.extend({
  /**
   * Fixture: Automatically navigate to Demoblaze homepage before each test
   */
  page: async ({ page }, use) => {
    await page.goto('https://www.demoblaze.com/');
    await use(page);
  },

  /**
   * Fixture: Pre-initialized LoginPage object
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Fixture: Pre-initialized RegisterPage object
   */
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

  /**
   * Fixture: Pre-initialized LogoutPage object
   */
  logoutPage: async ({ page }, use) => {
    const logoutPage = new LogoutPage(page);
    await use(logoutPage);
  },

  /**
   * Fixture: Pre-initialized ProductPage object
   */
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  /**
   * Fixture: Pre-initialized CategoriesPage object
   */
  categoriesPage: async ({ page }, use) => {
    const categoriesPage = new CategoriesPage(page);
    await use(categoriesPage);
  },

  /**
   * Fixture: User credentials from userData.json
   * Validates file exists before reading
   */
  userData: async ({}, use) => {
    const filePath = './test-data/userData.json';
    if (!fs.existsSync(filePath)) {
      throw new Error(
        '❌ User data file not found!\n' +
        '   Please run the registration test first: npx playwright test tests/register-test.js'
      );
    }
    const userData = readUserData();
    await use(userData);
  },

  /**
   * Fixture: Authenticated page - automatically logs in the user
   * Use this fixture for tests that require pre-authentication
   */
  authenticatedPage: async ({ page, loginPage, userData }, use) => {
    await loginPage.openLogin();
    await loginPage.login(userData.username, userData.password);
    // Wait until the user greeting locator is visible instead of fixed timeout
    await expect(page.locator('#nameofuser')).toContainText(userData.username);
    
    await use(page);
  },
});

// Export expect from Playwright for convenience
export { expect } from '@playwright/test';

/**
 * Hook: Runs before all tests
 * Add global setup logic here
 */
test.beforeAll(async () => {
  console.log('\n🚀 Starting Demoblaze Test Suite...\n');
});

/**
 * Hook: Runs after all tests
 * Add global cleanup logic here
 */
test.afterAll(async () => {
  console.log('\n✅ Test Suite Completed!\n');
});

/**
 * Hook: Runs before each test
 * Add per-test setup logic here
 */
test.beforeEach(async ({ page }, testInfo) => {
  console.log(`\n▶️  Running: ${testInfo.title}`);
});

/**
 * Hook: Runs after each test
 * Add per-test cleanup logic here
 */
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') {
    console.log(`❌ Test Failed: ${testInfo.title}`);
  } else {
    console.log(`✅ Test Passed: ${testInfo.title}`);
  }
});

