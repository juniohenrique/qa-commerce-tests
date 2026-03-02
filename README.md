# QA Commerce Tests

This project contains Cypress + Cucumber automated tests for the QA Commerce application.

## Setup

```bash
npm install
```

## Running tests

Open interactive runner:

```bash
npm run cy:open
```

Run headless:

```bash
npm run cy:run
```

## Architecture

- **Feature files** (Portuguese Gherkin) under `cypress/e2e/*.feature`
- **Step definitions** under `cypress/step_definitions` or alongside features
- **Page objects** under `cypress/pageObjects`
- **Custom commands** in `cypress/support/commands.js`

Follow clean code, deterministic tests.

