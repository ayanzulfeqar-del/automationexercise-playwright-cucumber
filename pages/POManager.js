const { HomePage }          = require('./HomePage');
const { LoginPage }         = require('./LoginPage');
const { SignupPage }        = require('./SignupPage');
const { AccountStatusPage } = require('./AccountStatusPage');
const { ProductsPage }      = require('./ProductsPage');
const { ProductDetailPage } = require('./ProductDetailPage');

class POManager {
  constructor(page) {
    this.page              = page;
    this.homePage          = new HomePage(page);
    this.loginPage         = new LoginPage(page);
    this.signupPage        = new SignupPage(page);
    this.accountStatusPage = new AccountStatusPage(page);
    this.productsPage      = new ProductsPage(page);
    this.productDetailPage = new ProductDetailPage(page);
  }

  getHomePage()          { return this.homePage; }
  getLoginPage()         { return this.loginPage; }
  getSignupPage()        { return this.signupPage; }
  getAccountStatusPage() { return this.accountStatusPage; }
  getProductsPage()      { return this.productsPage; }
  getProductDetailPage() { return this.productDetailPage; }
}
module.exports = { POManager };