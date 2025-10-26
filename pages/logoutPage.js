export class LogoutPage {
  constructor(page) {
    this.page = page;
    this.logoutLink = '#logout2';
  }

  async logout() {
    await this.page.click(this.logoutLink);
  }
}
