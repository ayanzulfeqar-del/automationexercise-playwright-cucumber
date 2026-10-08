const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    // ---------- Locators ----------
    this.loginTitle     = page.getByText('Login to your account');
    this.signupTitle    = page.getByText('New User Signup!');
    this.loginEmail     = page.locator('[data-qa="login-email"]');
    this.loginPassword  = page.locator('[data-qa="login-password"]');
    this.loginButton    = page.locator('[data-qa="login-button"]');
    this.signupName     = page.locator('[data-qa="signup-name"]');
    this.signupEmail    = page.locator('[data-qa="signup-email"]');
    this.signupButton   = page.locator('[data-qa="signup-button"]');
    this.loginError     = page.locator('.login-form p');
    this.signupError    = page.locator('.signup-form p');
  }

  // ---------- Actions ----------
  async verifyPageVisible() {
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.loginTitle).toBeVisible();
    await expect(this.signupTitle).toBeVisible();
  }

  async login(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async startSignup(name, email) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }

  async verifyLoginError(message) {
    await expect(this.loginError).toHaveText(message);
  }

  async verifySignupError(message) {
    await expect(this.signupError).toHaveText(message);
  }
}
module.exports = { LoginPage };
