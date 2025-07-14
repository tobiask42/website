import { test, expect } from '@playwright/test';

test('kontaktformular zeigt validierungsfehler', async ({ page }) => {
  await page.goto('/de/contact');
  await page.getByRole('button', { name: 'Senden' }).click();

  await expect(page.getByText('Bitte gib deinen Namen ein.')).toBeVisible();
});
