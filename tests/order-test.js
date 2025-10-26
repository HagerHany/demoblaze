import { test, expect } from '../fixtures/base.js';

test('User can successfully order an Apple monitor 24', async ({ 
  authenticatedPage, 
  productPage, 
  categoriesPage 
}) => {
  // User is already logged in via authenticatedPage fixture
  
  // Navigate to Monitors category
  
  await categoriesPage.selectMonitors();
  
  await authenticatedPage.waitForTimeout(1000); // Wait for products to load
  
  // Add product to cart
  await productPage.addProductToCart('Apple monitor 24');
  
  // Complete checkout
  await productPage.openCart();
  await productPage.placeOrder();

  // Verify order success
  await expect(authenticatedPage.locator('.sweet-alert')).toBeVisible({ timeout: 5000 });
  
  console.log('✅ Order placed successfully for Apple monitor 24');
});
