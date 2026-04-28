import { test, expect } from '@playwright/test';

test.describe('IBM Bob Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads and shows hero section', async ({ page }) => {
    await expect(page).toHaveTitle(/IBM Bob/);
    await expect(page.getByRole('heading', { name: /Bob — AI SDLC Partner/i })).toBeVisible();
    await expect(page.getByText('Xem Bob trong action')).toBeVisible();
  });

  test('header navigation links exist', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
  });

  test('can scroll to problem section', async ({ page }) => {
    await page.getByRole('button', { name: 'Vấn đề' }).first().click();
    await expect(page.getByText(/bottleneck quen thuộc/i)).toBeVisible();
  });

  test('SDLC stepper is interactive', async ({ page }) => {
    await page.getByText('Xem Bob trong action').click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Bob trong từng bước SDLC')).toBeVisible();
    await page.getByText('Code Review').click();
    await expect(page.getByText('Agentic Review')).toBeVisible();
  });

  test('footer has IBM sources links', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.getByText(/IBM Think/i)).toBeVisible();
    const sourceLink = page.locator('footer a[href*="ibm.com"]').first();
    await expect(sourceLink).toBeVisible();
  });

  test('approval toggle is functional', async ({ page }) => {
    await page.locator('#approval').scrollIntoViewIfNeeded();
    await expect(page.getByText(/Manual Mode|Autonomous Mode/i).first()).toBeVisible();
  });
});
