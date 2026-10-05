import { test, expect } from '@playwright/test';
import { csvLoginCases } from '../fixtures/login.fixture';
import { LoginPage } from '../pages/Login/LoginPage';

test.describe('CSV-driven login validation', () => {
  test.afterEach(async ({}, testInfo) => {
    const result = testInfo.status === testInfo.expectedStatus ? 'PASS' : 'FAIL';
    console.log(`${result}: ${testInfo.title}`);
  });

  for (const row of csvLoginCases) {
    test(`${row.Username} expects ${row.Expected}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(row.Username, row.Password);

      if (row.Expected === 'Dashboard') {
        await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
        await expect(loginPage.dashboardHeading).toBeVisible();
      } else {
        await expect(loginPage.invalidCredentialsMessage).toBeVisible();
      }
    });
  }
});