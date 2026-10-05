import { randomInt } from 'node:crypto';
import type { Locator, Page } from '@playwright/test';

export class AddEmployeePage {
  constructor(private readonly page: Page) {}

  async openForm(): Promise<void> {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
  }

  async addEmployee(firstName: string, lastName: string): Promise<void> {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);

    const employeeIdGroup = this.page.locator('.oxd-input-group').filter({
      has: this.page.getByText('Employee Id', { exact: true }),
    });
    const employeeIdInput = employeeIdGroup.getByRole('textbox');
    const duplicateIdMessage = this.page.getByText('Employee Id already exists', { exact: true });

    for (let attempt = 0; attempt < 3; attempt += 1) {
      await employeeIdInput.fill(String(randomInt(10_000_000, 100_000_000)));
      await this.page.getByRole('button', { name: 'Save' }).click();

      try {
        await this.page.waitForURL(/\/pim\/viewPersonalDetails\//, { timeout: 5000 });
        return;
      } catch (error) {
        if (!(await duplicateIdMessage.isVisible())) {
          throw error;
        }
      }
    }

    throw new Error('Could not add employee after three unique ID attempts.');
  }

  employeeProfileName(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }
}