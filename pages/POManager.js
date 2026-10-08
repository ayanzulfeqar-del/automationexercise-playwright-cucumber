const { HomePage }          = require('./HomePage');
const { LoginPage }         = require('./LoginPage');
const { SignupPage }        = require('./SignupPage');
const { AccountStatusPage } = require('./AccountStatusPage');

class POManager {
  constructor(page) {
    this.page              = page;
    this.homePage          = new HomePage(page);
    this.loginPage         = new LoginPage(page);
    this.signupPage        = new SignupPage(page);
    this.accountStatusPage = new AccountStatusPage(page);
  }

  getHomePage()          { return this.homePage; }
  getLoginPage()         { return this.loginPage; }
  getSignupPage()        { return this.signupPage; }
  getAccountStatusPage() { return this.accountStatusPage; }
}
module.exports = { POManager };
