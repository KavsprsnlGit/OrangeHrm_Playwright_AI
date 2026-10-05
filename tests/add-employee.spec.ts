import { test, expect } from '@playwright/test';
import { loginCredentials } from '../fixtures/login.fixture';
import { LoginPage } from '../pages/Login/LoginPage';
import { AddEmployeePage } from '../pages/AddEmployee/AddEmployeePage';

test('add an employee and verify the profile', async ({ page }) => {
  await new LoginPage(page).login(loginCredentials.username, loginCredentials.password);

  const addEmployeePage = new AddEmployeePage(page);
  await addEmployeePage.openForm();
  await addEmployeePage.addEmployee('John123', 'Doe456');

  await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\//);
  await expect(addEmployeePage.employeeProfileName('John123 Doe456')).toBeVisible();
});