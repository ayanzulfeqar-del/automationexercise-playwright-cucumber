const { expect } = require('@playwright/test');

class SignupPage {
  constructor(page) {
    this.page = page;
    // ---------- Locators ----------
    this.accountInfoTitle = page.getByText('Enter Account Information');
    this.mrRadio          = page.locator('#id_gender1');
    this.password         = page.locator('[data-qa="password"]');
    this.day              = page.locator('[data-qa="days"]');
    this.month            = page.locator('[data-qa="months"]');
    this.year             = page.locator('[data-qa="years"]');
    this.newsletter       = page.locator('#newsletter');
    this.offers           = page.locator('#optin');
    this.firstName        = page.locator('[data-qa="first_name"]');
    this.lastName         = page.locator('[data-qa="last_name"]');
    this.company          = page.locator('[data-qa="company"]');
    this.address          = page.locator('[data-qa="address"]');
    this.address2         = page.locator('[data-qa="address2"]');
    this.country          = page.locator('[data-qa="country"]');
    this.state            = page.locator('[data-qa="state"]');
    this.city             = page.locator('[data-qa="city"]');
    this.zipcode          = page.locator('[data-qa="zipcode"]');
    this.mobile           = page.locator('[data-qa="mobile_number"]');
    this.createButton     = page.locator('[data-qa="create-account"]');
  }

  // ---------- Actions ----------
  async verifyPageVisible() {
    await expect(this.accountInfoTitle).toBeVisible();
  }

  async fillAccountDetails(user) {
    await this.mrRadio.check();
    await this.password.fill(user.password);
    await this.day.selectOption(user.day);
    await this.month.selectOption(user.month);
    await this.year.selectOption(user.year);
    await this.newsletter.check();
    await this.offers.check();
  }

  async fillAddress(user) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.company.fill(user.company);
    await this.address.fill(user.address);
    await this.address2.fill(user.address2);
    await this.country.selectOption(user.country);
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobile.fill(user.mobile);
  }

  async createAccount() {
    await this.createButton.click();
  }
}
module.exports = { SignupPage };
