import { test, expect } from '@playwright/test';
import { loginCredentials } from '../fixtures/login.fixture';
import { LoginPage } from '../pages/Login/LoginPage';

test('login to OrangeHRM and verify dashboard is displayed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(loginCredentials.username, loginCredentials.password);

  await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
  await expect(loginPage.dashboardHeading).toBeVisible();
});
