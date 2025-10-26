import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { LogoutPage } from '../pages/logoutPage.js';
import { readUserData } from '../utils/dataHelper.js';

test('User can log out successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const logoutPage = new LogoutPage(page);
  const { username, password } = readUserData();

  await page.goto('https://www.demoblaze.com/');
  await loginPage.openLogin();
  await loginPage.login(username, password);

  await page.waitForSelector('#nameofuser');
  await logoutPage.logout();

  await expect(page.locator('#login2')).toBeVisible(); // login link returns
});
