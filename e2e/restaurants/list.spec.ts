import { test, expect } from '@playwright/test';

test('restaurants listing filters update search params correctly', async ({page}) => {
  await page.goto('/restaurants');
  await page.getByLabel('Italian').check();
  await page.getByLabel('Tokyo').check();
  await page.waitForURL(/cuisine=Italian.*location=Tokyo|location=Tokyo.*cuisine=Italian/);

  expect(page.url()).toMatch(/cuisine=Italian/);
  expect(page.url()).toMatch(/location=Tokyo/);
  expect(page.url()).not.toMatch(/cuisine=Japanese/);
});
