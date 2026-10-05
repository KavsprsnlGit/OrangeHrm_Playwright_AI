import { test, expect } from '@playwright/test';
import { loginCredentials } from '../fixtures/login.fixture';
import { LoginPage } from '../pages/Login/LoginPage';
import { LogoutPage } from '../pages/Login/LogoutPage';

test.describe('OrangeHRM Logout', () => {
  test('Login, logout, and verify login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
    await expect(loginPage.dashboardHeading).toBeVisible();

    await new LogoutPage(page).logout();

    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);

    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.usernameLabel).toBeVisible();
  });
});