
export class CategoriesPage {
    constructor(page) {
      this.page = page;
      this.categoryItems = '.list-group';
    }
  
    async selectCategoryByName(name) {
      await this.page.getByText(name).click();
    }
  
    async selectCategoryByIndex(index) {
      await this.categoryItems.nth(index).click();
    }
  
    async selectMonitors() {
      await this.selectCategoryByName('Monitors');
    }
  };
  