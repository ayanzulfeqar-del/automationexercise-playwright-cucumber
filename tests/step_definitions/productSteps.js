const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// ---------------- Products list ----------------
When('the user clicks on Products', async function () {
  await this.poManager.getHomePage().clickProducts();
});

Then('the page title is {string}', async function (title) {
  await this.poManager.getProductsPage().verifyTitle(title);
});

Then('{int} products are shown', async function (count) {
  await this.poManager.getProductsPage().verifyProductCount(count);
});

Then('some products are shown', async function () {
  await this.poManager.getProductsPage().verifyProductsShown();
});

Then('{string} is in the product list', async function (name) {
  await this.poManager.getProductsPage().verifyProductInList(name);
});

// ---------------- Search ----------------
When('the user searches for {string}', async function (text) {
  await this.poManager.getProductsPage().search(text);
});

// ---------------- Category / Brand ----------------
When('the user opens category {string} and sub category {string}', async function (main, sub) {
  await this.poManager.getProductsPage().openCategory(main, sub);
});

When('the user opens brand {string}', async function (brand) {
  await this.poManager.getProductsPage().openBrand(brand);
});

Then('the number of products matches the sidebar count for {string}', async function (brand) {
  const productsPage = this.poManager.getProductsPage();
  const sidebarCount = await productsPage.getBrandCountFromSidebar(brand);
  expect(sidebarCount).toBeGreaterThan(0);
  await productsPage.verifyProductCount(sidebarCount);
});

// ---------------- Product detail ----------------
When('the user opens product {string}', async function (name) {
  await this.poManager.getProductsPage().viewProduct(name);
});

Then('the product detail page is shown', async function () {
  await this.poManager.getProductDetailPage().verifyOnDetailPage();
});

Then('the product is {string} in {string} with price {string} and brand {string}', async function (name, category, price, brand) {
  await this.poManager.getProductDetailPage().verifyProduct(name, category, price, brand);
});

Then('availability is {string} and condition is {string}', async function (availability, condition) {
  await this.poManager.getProductDetailPage().verifyAvailabilityAndCondition(availability, condition);
});