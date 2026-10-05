import { test, expect } from '@playwright/test';
import { loginCredentials } from '../fixtures/login.fixture';
import { LoginPage } from '../pages/Login/LoginPage';
import { AdminAccessPage } from '../pages/AdminAccess/AdminAccessPage';

test('verify Admin module access', async ({ page }) => {
  await new LoginPage(page).login(loginCredentials.username, loginCredentials.password);

  const adminAccessPage = new AdminAccessPage(page);
  await adminAccessPage.open();

  await expect(adminAccessPage.systemUsersHeading).toBeVisible();
  await expect(adminAccessPage.addButton).toBeVisible();
});