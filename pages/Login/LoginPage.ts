import type { Locator, Page } from '@playwright/test';

export type LoginExpectedResult = 'Dashboard' | 'Invalid credentials';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  get dashboardHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Dashboard' });
  }

  get invalidCredentialsMessage(): Locator {
    return this.page.getByText('Invalid credentials', { exact: true });
  }

  get usernameField(): Locator {
    return this.page.locator('input[placeholder="Username"]');
  }

  get usernameLabel(): Locator {
    return this.page.locator('label').filter({ hasText: /^Username$/ });
  }
}