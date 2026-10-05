import type { Locator, Page } from '@playwright/test';

export class BuzzPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'Buzz' }).click();
  }

  async publishPost(message: string): Promise<void> {
    await this.page.getByRole('textbox', { name: "What's on your mind?" }).fill(message);
    await this.page.getByRole('button', { name: 'Post', exact: true }).click();
  }

  get newsfeedHeading(): Locator {
    return this.page.getByText('Buzz Newsfeed', { exact: true });
  }

  get mostRecentPostsButton(): Locator {
    return this.page.getByRole('button', { name: /Most Recent Posts/ });
  }

  get feedContent(): Locator {
    return this.page.locator('body');
  }
}