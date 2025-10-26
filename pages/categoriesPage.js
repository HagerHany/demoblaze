
export class CategoriesPage {
    constructor(page) {
      this.page = page;
      this.categoryItems = '.list-group a.list-group-item';
    }
  
    async selectCategoryByName(name) {
      await this.page.getByText(name).click();
    }
  
    async selectCategoryByIndex(index) {
        await this.page.locator(this.categoryItems).nth(index).click();
    }
    async selectMonitors() {
      await this.selectCategoryByName('Monitors');
    }
  };
  