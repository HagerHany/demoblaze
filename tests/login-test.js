import { test, expect } from '../fixtures/base.js';

test('User can log in with valid data', async ({ page, loginPage, userData }) => {
  await loginPage.openLogin();
  await loginPage.login(userData.username, userData.password);

  await expect(page.locator('#nameofuser')).toContainText(userData.username);
  
  console.log(`✅ User logged in: ${userData.username}`);
});
