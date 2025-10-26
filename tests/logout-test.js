import { test, expect } from '../fixtures/base.js';

test('User can log out successfully', async ({ authenticatedPage, logoutPage }) => {
  // User is already logged in via authenticatedPage fixture
  
  await logoutPage.logout();

  // Verify logout - login link should be visible again
  await expect(authenticatedPage.locator('#login2')).toBeVisible({ timeout: 5000 });
  
  console.log('✅ User logged out successfully');
});
