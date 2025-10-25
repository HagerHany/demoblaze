import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage.js';
import { generateUserData } from '../utils/dataHelper.js';

test('User can register with valid data', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const { username, password } = generateUserData();

  await page.goto('https://www.demoblaze.com/');
  await registerPage.openSignup();
  await registerPage.register(username, password);

  // optional wait to see what happens
  await page.waitForTimeout(3000);

  // normally we would assert popup message here
});
