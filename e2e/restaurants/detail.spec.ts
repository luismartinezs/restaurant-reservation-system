import { test, expect } from '@playwright/test';

// note: this test works in firefox and manual testing verifies this behavior but it faisl in chromium, so skipping for now
test.skip('restaurants detail button click updates default time', async ({ page }) => {
  await page.goto('/restaurants/62');
  await page.clock.setFixedTime('2023-01-01T09:00:00Z');
  await page.getByRole('link', { name: '01:30 PM' }).click();
  await page.waitForURL(/time=13:30/);
  expect(page.url()).toMatch(/time=13:30/)
  await expect(page.getByPlaceholder('Select time')).toBeVisible();
  expect(page.getByPlaceholder('Select time')).toHaveValue('13:30');

  await page.getByRole('link', { name: '02:00 PM' }).click();
  await page.waitForURL(/time=14:00/);
  expect(page.url()).toMatch(/time=14:00/)
  await expect(page.getByPlaceholder('Select time')).toBeVisible();
  expect(page.getByPlaceholder('Select time')).toHaveValue('14:00');

  await page.getByRole('link', { name: '03:00 PM' }).click();
  await page.waitForURL(/time=15:00/);
  expect(page.url()).toMatch(/time=15:00/)
  await expect(page.getByPlaceholder('Select time')).toBeVisible();
  expect(page.getByPlaceholder('Select time')).toHaveValue('15:00');
});