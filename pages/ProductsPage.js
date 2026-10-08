const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    // ---------- Locators ----------
    this.title         = page.locator('.features_items h2.title');
    this.productCards  = page.locator('.features_items .product-image-wrapper');
    this.productNames  = page.locator('.features_items .productinfo p');
    this.searchInput   = page.locator('#search_product');
    this.searchButton  = page.locator('#submit_search');
    this.categoryPanel = page.locator('#accordian');
    this.brandsPanel   = page.locator('.brands_products');
  }

  // ---------- Actions ----------
  async goTo() {
    await this.page.goto('https://automationexercise.com/products');
  }

  async verifyTitle(text) {
    await expect(this.title).toHaveText(text, { ignoreCase: true });
  }

  async verifyProductCount(count) {
    await expect(this.productCards).toHaveCount(count);
  }

  async verifyProductsShown() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async verifyProductInList(name) {
    await expect(this.productNames.filter({ hasText: name }).first()).toBeVisible();
  }

  async viewProduct(name) {
    const card = this.productCards.filter({ has: this.page.locator('.productinfo p', { hasText: name }) }).first();
    await card.getByText('View Product').click();
  }

  async search(text) {
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }

  async openCategory(main, sub) {
    await this.categoryPanel.locator(`a[href="#${main}"]`).click();
    await this.categoryPanel.locator(`#${main} a`, { hasText: sub }).click();
  }

  async openBrand(brand) {
    await this.brandsPanel.locator(`a[href="/brand_products/${brand}"]`).click();
  }

  // sidebar shows count like "(6) POLO"
  async getBrandCountFromSidebar(brand) {
    const text = await this.brandsPanel.locator(`a[href="/brand_products/${brand}"] span`).innerText();
    return Number(text.replace(/[()]/g, ''));
  }
}
module.exports = { ProductsPage };
