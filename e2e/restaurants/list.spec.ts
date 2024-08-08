import { sleep } from '@/common/utils';
import { test, expect } from '@playwright/test';

test('restaurants listing filters', async ({page}) => {
  await page.goto('/restaurants');
  await page.getByLabel('Italian').check();
  await page.getByLabel('Tokyo').check();
  await sleep(1000);
  expect(page.url()).toContain('cuisine=Italian&location=Tokyo');
});
