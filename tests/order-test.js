import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { ProductPage } from '../pages/productPage.js';
import { readUserData } from '../utils/dataHelper.js';
import { CategoriesPage } from '../pages/categoriesPage.js';

test('User can successfully order an Apple monitor 24', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const categoriesPage = new CategoriesPage(page);
  const { username, password } = readUserData();

  await page.goto('https://www.demoblaze.com/');
  await loginPage.openLogin();
  await loginPage.login(username, password);
  
  await categoriesPage.selectMonitors();
  await productPage.addProductToCart('Apple monitor 24'); 
  await productPage.openCart();
  await productPage.placeOrder();

  await expect(page.locator('.sweet-alert')).toBeVisible();
});
