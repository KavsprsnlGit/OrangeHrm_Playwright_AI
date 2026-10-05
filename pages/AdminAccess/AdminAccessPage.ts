import type { Locator, Page } from '@playwright/test';

export class AdminAccessPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'Admin' }).click();
  }

  get systemUsersHeading(): Locator {
    return this.page.getByText('System Users', { exact: true });
  }

  get addButton(): Locator {
    return this.page.getByRole('button', { name: 'Add' });
  }
}