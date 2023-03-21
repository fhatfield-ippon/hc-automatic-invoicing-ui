import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/HC Automatic Invoicing UI/);
  await expect(page).toHaveScreenshot();
});

test('has hello world', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page.locator('h1')).toHaveText(/Hello World/);
});
