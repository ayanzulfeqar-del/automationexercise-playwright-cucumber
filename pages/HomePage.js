const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    // ---------- Locators ----------
    this.logo              = page.locator('img[alt="Website for automation practice"]');
    this.signupLoginLink   = page.locator('a[href="/login"]');
    this.productsLink      = page.locator('a[href="/products"]');
    this.logoutLink        = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.loggedInAs        = page.locator('a:has-text("Logged in as")');
  }

  // ---------- Actions ----------
  async goTo() {
    await this.page.goto('https://automationexercise.com/');
    await expect(this.logo).toBeVisible();
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();
  }

  async clickProducts() {
    await this.productsLink.click();
  }

  async verifyLoggedInAs(name) {
    await expect(this.loggedInAs).toHaveText(`Logged in as ${name}`);
  }

  async logout() {
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }
}
module.exports = { HomePage };