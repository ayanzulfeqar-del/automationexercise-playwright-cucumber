const { expect } = require('@playwright/test');

// Same page layout for "ACCOUNT CREATED!" and "ACCOUNT DELETED!"
class AccountStatusPage {
  constructor(page) {
    this.page = page;
    // ---------- Locators ----------
    this.createdTitle   = page.locator('[data-qa="account-created"]');
    this.deletedTitle   = page.locator('[data-qa="account-deleted"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  // ---------- Actions ----------
  async verifyAccountCreated() {
    await expect(this.createdTitle).toHaveText('Account Created!');
  }

  async verifyAccountDeleted() {
    await expect(this.deletedTitle).toHaveText('Account Deleted!');
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
module.exports = { AccountStatusPage };
