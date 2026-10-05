import { test, expect } from '@playwright/test';
import { loginCredentials } from '../fixtures/login.fixture';
import { LoginPage } from '../pages/Login/LoginPage';
import { BuzzPage } from '../pages/Buzz/BuzzPage';

test('publish a post in the Buzz feed', async ({ page }) => {
  await new LoginPage(page).login(loginCredentials.username, loginCredentials.password);

  const buzzPage = new BuzzPage(page);
  await buzzPage.open();
  await expect(buzzPage.newsfeedHeading).toBeVisible();
  await expect(buzzPage.mostRecentPostsButton).toBeVisible();

  const message = `Playwright Orange Testing - Status ${Date.now()}!`;
  await buzzPage.publishPost(message);

  await expect(buzzPage.feedContent).toContainText(message);
});