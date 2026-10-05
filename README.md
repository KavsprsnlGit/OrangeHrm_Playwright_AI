# OrangeHRM Playwright Tests

End-to-end tests for the OrangeHRM open-source demo, written in TypeScript with `@playwright/test` and organized using the Page Object Model.

## AI Assistance

AI tools assisted with implementation, test generation, and documentation. The project was reviewed and validated with Playwright test runs.

## Requirements

- Node.js 20 or later
- npm
- Internet access to the OrangeHRM demo

## Setup

Install project dependencies:

```powershell
npm.cmd ci
```

Create a local environment file from the example and enter the demo credentials:

```powershell
Copy-Item .env.example .env
```

Set `ORANGEHRM_USERNAME` and `ORANGEHRM_PASSWORD` in `.env`. The local `.env` file is git-ignored; do not commit it.

Install the browsers used by the Playwright projects:

```powershell
npx.cmd playwright install chrome firefox webkit
```

## Run Tests

Run the suite in all configured browsers (headless by default):

```powershell
npx.cmd playwright test --workers=1
```

Run only Chromium:

```powershell
npx.cmd playwright test --project=chromium --workers=1
```

Run one spec:

```powershell
npx.cmd playwright test tests/login-data-driven-csv.spec.ts --project=chromium
```

The configuration serializes tests because they use a shared public demo account. Some scenarios create employees or Buzz posts, which may remain in the demo after a run.

## HTML Report

After a test run, open the report with:

```powershell
npx.cmd playwright show-report
```

If the default report port is occupied, choose another one, for example `--port=9324`.

## Project Layout

- `pages/`: Page objects for login, logout, PIM, Admin, employee creation, and Buzz.
- `fixtures/login.fixture.ts`: Shared environment credentials and data-driven login cases.
- `test_data/loginData.csv`: CSV-driven login dataset; the valid row uses environment-variable placeholders.
- `tests/`: Playwright scenarios and assertions.
- `playwright.config.ts`: Base URL, environment loading, worker settings, and browser projects.
- `.github/workflows/playwright.yml`: GitHub Actions test workflow.

## GitHub Actions

Add repository secrets named `ORANGEHRM_USERNAME` and `ORANGEHRM_PASSWORD`. The workflow maps these secrets to the environment variables consumed by the tests.
