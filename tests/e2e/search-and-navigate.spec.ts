import { test, expect } from '@playwright/test';

test('Home search navigates to destination page', async ({ page }) => {
  await page.goto('/');

  // Fill destination in booking search bar
  const input = page.getByPlaceholder('Où souhaitez-vous partir ?');
  await input.fill('France');

  // Submit
  await page.getByRole('button', { name: 'Rechercher' }).click();

  // Assert navigation and destination page content
  await page.waitForURL(/\/destination\/france/i);
  await expect(page.getByText('Découvrez France')).toBeVisible();
});