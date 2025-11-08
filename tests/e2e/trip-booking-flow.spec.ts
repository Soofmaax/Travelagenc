import { test, expect } from '@playwright/test';

test('Trips -> TripDetail -> Booking flow', async ({ page }) => {
  await page.goto('/trips');

  // Click first "Explorer" link
  const explorerLinks = page.getByRole('link', { name: 'Explorer' });
  await explorerLinks.first().click();

  // Trip detail page should be visible
  await expect(page.getByText('Overview')).toBeVisible();

  // Click Book Now without selecting a date (allowed)
  await page.getByRole('button', { name: 'Book Now' }).click();

  // Booking page should appear
  await expect(page.getByText(/Book Your/i)).toBeVisible();
});