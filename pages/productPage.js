export class ProductPage {
    constructor(page) {
      this.page = page;
      this.addToCartButton = 'a:has-text("Add to cart")';
      this.cartLink = '#cartur';
      this.placeOrderButton = 'button[data-target="#orderModal"]';
      this.nameInput = '#name';
      this.countryInput = '#country';
      this.cityInput = '#city';
      this.cardInput = '#card';
      this.monthInput = '#month';
      this.yearInput = '#year';
      this.purchaseButton = 'button[onclick="purchaseOrder()"]';
    }
  
    async addProductToCart(productName) {
         // Set up dialog handler BEFORE clicking
    this.page.once('dialog', async dialog => {
            console.log(`Alert message: ${dialog.message()}`);
            await dialog.accept();
        });
      await this.page.getByText(productName).click();
      await this.page.click(this.addToCartButton);
      await this.page.waitForTimeout(2000); // wait for alert
    }
  
    async openCart() {
      await this.page.click(this.cartLink);
    }
  
    async placeOrder() {
      await this.page.click(this.placeOrderButton);
      await this.page.fill(this.nameInput, 'QA Tester');
      await this.page.fill(this.countryInput, 'Egypt');
      await this.page.fill(this.cityInput, 'Cairo');
      await this.page.fill(this.cardInput, '123456789');
      await this.page.fill(this.monthInput, '10');
      await this.page.fill(this.yearInput, '2025');
      await this.page.click(this.purchaseButton);
    }
  }
  