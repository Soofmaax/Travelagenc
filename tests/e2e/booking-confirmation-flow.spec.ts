import { test, expect } from '@playwright/test';

test('TripDetail select date -> Booking -> Confirmation', async ({ page }) => {
  // Go to trips list
  await page.goto('/trips');

  // Open first trip detail
  const explorerLinks = page.getByRole('link', { name: 'Explorer' });
  await explorerLinks.first().click();

  // Trip detail visible
  await expect(page.getByText('Overview')).toBeVisible();

  // Select first departure date
  const dateSelect = page.getByRole('combobox', { name: 'Select Departure Date' }).first();
  await dateSelect.selectOption({ index: 1 }); // skip empty option

  // Book now
  await page.getByRole('button', { name: 'Book Now' }).click();

  // Booking page visible
  await expect(page.getByText(/Book Your/i)).toBeVisible();

  // Fill minimal form
  await page.fill('#firstName', 'Jane');
  await page.fill('#lastName', 'Doe');
  await page.fill('#email', 'jane.doe@example.com');
  await page.fill('#phone', '+33123456789');

  // Agree to terms
  await page.check('#agreeTerms');

  // Submit
  await page.getByRole('button', { name: 'Complete Booking' }).click();

  // Confirmation page
  await expect(page.getByText('Booking Confirmed!')).toBeVisible();
});