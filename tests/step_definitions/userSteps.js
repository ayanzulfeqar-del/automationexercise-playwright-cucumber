const { Given, When, Then } = require('@cucumber/cucumber');
const { randomEmail, user } = require('../../utils/testData');

// ---------------- Home ----------------
Given('the user is on the home page', async function () {
  await this.poManager.getHomePage().goTo();
});

When('the user clicks on Signup \\/ Login', async function () {
  await this.poManager.getHomePage().clickSignupLogin();
});

Then('the user is logged in as {string}', async function (name) {
  await this.poManager.getHomePage().verifyLoggedInAs(name);
});

When('the user clicks Logout', async function () {
  await this.poManager.getHomePage().logout();
});

When('the user deletes the account', async function () {
  await this.poManager.getHomePage().deleteAccount();
});

// ---------------- Login page ----------------
Then('the login page is visible', async function () {
  await this.poManager.getLoginPage().verifyPageVisible();
});

When('the user logs in with the registered email and password', async function () {
  await this.poManager.getLoginPage().login(this.email, user.password);
});

When('the user logs in with email {string} and password {string}', async function (email, password) {
  await this.poManager.getLoginPage().login(email, password);
});

Then('the login error {string} is shown', async function (message) {
  await this.poManager.getLoginPage().verifyLoginError(message);
});

When('the user starts signup with name {string} and a new email', async function (name) {
  this.email = randomEmail();
  await this.poManager.getLoginPage().startSignup(name, this.email);
});

When('the user starts signup with name {string} and the registered email', async function (name) {
  await this.poManager.getLoginPage().startSignup(name, this.email);
});

Then('the signup error {string} is shown', async function (message) {
  await this.poManager.getLoginPage().verifySignupError(message);
});

// ---------------- Signup form ----------------
Then('the account information form is visible', async function () {
  await this.poManager.getSignupPage().verifyPageVisible();
});

When('the user fills account details and address', async function () {
  await this.poManager.getSignupPage().fillAccountDetails(user);
  await this.poManager.getSignupPage().fillAddress(user);
});

When('the user clicks Create Account', async function () {
  await this.poManager.getSignupPage().createAccount();
});

// ---------------- Account created / deleted ----------------
Then('{string} message is shown', async function (message) {
  if (message === 'Account Created!') {
    await this.poManager.getAccountStatusPage().verifyAccountCreated();
  } else {
    await this.poManager.getAccountStatusPage().verifyAccountDeleted();
  }
});

When('the user clicks Continue', async function () {
  await this.poManager.getAccountStatusPage().clickContinue();
});

// ---------------- Test data by API ----------------
// The site has a public API to create an account. Using it here is much
// faster than filling the whole signup form in every login test.
Given('a registered user exists', async function () {
  this.email = randomEmail();
  const form = new URLSearchParams({
    name: user.name, email: this.email, password: user.password,
    title: 'Mr', birth_date: user.day, birth_month: user.month, birth_year: user.year,
    firstname: user.firstName, lastname: user.lastName, company: user.company,
    address1: user.address, address2: user.address2, country: user.country,
    zipcode: user.zipcode, state: user.state, city: user.city, mobile_number: user.mobile,
  });
  const response = await fetch('https://automationexercise.com/api/createAccount', { method: 'POST', body: form });
  const body = await response.json();
  if (body.responseCode !== 201) {
    throw new Error(`Could not create test user: ${body.message}`);
  }
});
