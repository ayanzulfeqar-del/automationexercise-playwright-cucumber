# AutomationExercise – Playwright + Cucumber + POM

BDD tests for [automationexercise.com](https://automationexercise.com) written with Playwright (JavaScript), Cucumber and Page Object Model.

## Folder
```
pages/                    page objects (locators + actions) + POManager
utils/testData.js         test user data, random email
tests/features/           .feature files
tests/step_definitions/   step files (call pages through POManager)
tests/support/hooks.js    Before / BeforeStep / AfterStep (screenshot) / After
cucumber.js
```

## Run
```
npm install
npm test               # all scenarios (Google Chrome)
npm run test:headed    # see the browser
npm run test:smoke     # only @smoke
npm run report         # open cucumber-report.html
```
No Google Chrome? Use Playwright's Chromium:
```
npx playwright install chromium
$env:BROWSER_CHANNEL="bundled"; npm test      # PowerShell
```

## Scenarios so far
- User account: register, login (right / wrong), logout, existing email
