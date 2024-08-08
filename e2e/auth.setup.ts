import { test as setup, expect } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/login');
  await page.getByLabel('Email').fill('luismartinezwebdev@gmail.com');
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/account');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});