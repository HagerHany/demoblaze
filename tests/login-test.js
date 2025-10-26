import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { readUserData } from '../utils/dataHelper.js';

test('User can log in with valid data', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const { username, password } = readUserData();

  await page.goto('https://www.demoblaze.com/');
  await loginPage.openLogin();
  await loginPage.login(username, password);

  await page.waitForTimeout(3000); // see login happen

  // verify login
  await expect(page.locator('#nameofuser')).toContainText(username);
});
