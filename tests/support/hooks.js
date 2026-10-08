const { Before, After, BeforeStep, AfterStep, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const fs = require('fs');

setDefaultTimeout(60 * 1000);

// ---------- Before: runs before EVERY scenario ----------
// Opens Chrome and creates the page objects
Before(async function (scenario) {
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',                              // HEADLESS=false -> see the browser
    channel: process.env.BROWSER_CHANNEL === 'bundled' ? undefined : 'chrome', // Google Chrome
    slowMo: Number(process.env.SLOWMO || 0),                                 // SLOWMO=500 -> slow motion
  });
  this.context = await this.browser.newContext({ viewport: { width: 1366, height: 900 } });

  // This site has a lot of Google ads. They make it slow and sometimes open a
  // full page ad, so we block them.
  await this.context.route(/googlesyndication|doubleclick|googleads|adservice|fundingchoices/, route => route.abort());

  this.page = await this.context.newPage();
  this.poManager = new POManager(this.page);
  console.log(`\n▶ Scenario started: ${scenario.pickle.name}`);
});

// ---------- BeforeStep: runs before EVERY step ----------
BeforeStep(async function (step) {
  console.log(`   → ${step.pickleStep.text}`);
});

// ---------- AfterStep: runs after EVERY step ----------
// Takes a screenshot if the step failed
AfterStep(async function ({ result, pickle, pickleStep }) {
  if (result.status === Status.FAILED) {
    fs.mkdirSync('screenshots', { recursive: true });
    const name = `${pickle.name}-${pickleStep.text}`.replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
    const shot = await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    this.attach(shot, 'image/png');
    console.log(`   ✖ Step failed - screenshot saved: screenshots/${name}.png`);
  }
});

// ---------- After: runs after EVERY scenario ----------
// Closes the browser and deletes the test user (if the test made one)
After(async function () {
  await this.context?.close();
  await this.browser?.close();

  if (this.email) {
    const form = new URLSearchParams({ email: this.email, password: 'Test@123' });
    await fetch('https://automationexercise.com/api/deleteAccount', { method: 'DELETE', body: form });
  }
});
