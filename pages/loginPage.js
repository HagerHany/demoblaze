export class LoginPage {
    constructor(page) {
      this.page = page;
      this.loginLink = '#login2';
      this.usernameInput = '#loginusername';
      this.passwordInput = '#loginpassword';
      this.loginButton = 'button[onclick="logIn()"]';
    }
  
    async openLogin() {
      await this.page.click(this.loginLink);
      await this.page.waitForSelector(this.usernameInput);
    }
  
    async login(username, password) {
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }
  }
  