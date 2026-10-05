import { test, expect } from '@playwright/test';
import { loginCredentials } from '../fixtures/login.fixture';
import { LoginPage } from '../pages/Login/LoginPage';
import { PimSearchPage } from '../pages/PIM/PimSearchPage';

test('search for an employee in PIM', async ({ page }) => {
  await new LoginPage(page).login(loginCredentials.username, loginCredentials.password);

  const pimSearchPage = new PimSearchPage(page);
  await pimSearchPage.open();
  await expect(pimSearchPage.employeeInformationHeading).toBeVisible();

  const employee = await pimSearchPage.searchFirstListedEmployee();

  await expect(pimSearchPage.employeeNameCell(employee.firstName)).toBeVisible();
  await expect(pimSearchPage.employeeNameCell(employee.lastName)).toBeVisible();
});