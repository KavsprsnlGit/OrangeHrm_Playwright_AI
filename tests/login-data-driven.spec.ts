import { test, expect } from '@playwright/test';
import { loginCases } from '../fixtures/login.fixture';
import { LoginPage } from '../pages/Login/LoginPage';
import { LogoutPage } from '../pages/Login/LogoutPage';

for (const loginCase of loginCases) {
  test(`login as ${loginCase.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(loginCase.username, loginCase.password);

    if (loginCase.expected === 'Dashboard') {
      await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
      await expect(loginPage.dashboardHeading).toBeVisible();
      await new LogoutPage(page).logout();
      await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
    } else {
      await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    }
  });
}