import { test, expect } from '../fixtures/base.js';
import { generateUserData } from '../utils/dataHelper.js';

test('User can register with valid data', async ({ page, registerPage }) => {
  const { username, password } = generateUserData();

  await registerPage.openSignup();

  // Listen for success dialog
  page.once('dialog', async dialog => {
    console.log(`Alert message: ${dialog.message()}`);
    expect(dialog.message()).toContain('Sign up successful');
    await dialog.accept();
  });
  
  await registerPage.register(username, password);

  // Wait for registration to complete
  await page.waitForTimeout(2000);
  
  console.log(`✅ User registered: ${username}`);
});
