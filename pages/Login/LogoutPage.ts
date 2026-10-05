import type { Page } from '@playwright/test';

export class LogoutPage {
  constructor(private readonly page: Page) {}

  async logout(): Promise<void> {
    await this.page.locator('.oxd-userdropdown-img').click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
  }
}