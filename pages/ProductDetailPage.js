const { expect } = require('@playwright/test');

class ProductDetailPage {
  constructor(page) {
    this.page = page;
    // ---------- Locators ----------
    this.info     = page.locator('.product-information');
    this.name     = page.locator('.product-information h2');
    this.category = page.locator('.product-information p').filter({ hasText: 'Category:' });
    this.price    = page.locator('.product-information span span');
    this.details  = page.locator('.product-information p');
  }

  // ---------- Actions ----------
  async verifyOnDetailPage() {
    await expect(this.page).toHaveURL(/\/product_details\//);
    await expect(this.info).toBeVisible();
  }

  async verifyProduct(name, category, price, brand) {
    await expect(this.name).toHaveText(name);
    await expect(this.category).toHaveText(`Category: ${category}`);
    await expect(this.price).toHaveText(price);
    await expect(this.details.filter({ hasText: 'Brand:' })).toHaveText(`Brand: ${brand}`);
  }

  async verifyAvailabilityAndCondition(availability, condition) {
    await expect(this.details.filter({ hasText: 'Availability:' })).toHaveText(`Availability: ${availability}`);
    await expect(this.details.filter({ hasText: 'Condition:' })).toHaveText(`Condition: ${condition}`);
  }
}
module.exports = { ProductDetailPage };