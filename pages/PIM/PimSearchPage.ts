import type { Locator, Page } from '@playwright/test';

export type EmployeeName = {
  firstName: string;
  lastName: string;
};

export class PimSearchPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'PIM' }).click();
  }

  async searchFirstListedEmployee(): Promise<EmployeeName> {
    const firstResultRow = this.page.getByRole('rowgroup').nth(1).getByRole('row').first();
    const firstName = await firstResultRow.getByRole('cell').nth(2).innerText();
    const lastName = await firstResultRow.getByRole('cell').nth(3).innerText();
    const employeeName = `${firstName} ${lastName}`;

    await this.page.getByPlaceholder('Type for hints...').first().fill(employeeName);
    await this.page.getByRole('option', { name: employeeName }).click();
    await this.page.getByRole('button', { name: 'Search' }).click();

    return { firstName, lastName };
  }

  get employeeInformationHeading(): Locator {
    return this.page.getByText('Employee Information', { exact: true });
  }

  employeeNameCell(name: string): Locator {
    return this.page.getByRole('cell', { name, exact: true });
  }
}