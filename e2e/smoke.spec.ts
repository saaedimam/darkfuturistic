import { test, expect } from '@playwright/test'

// Basic smoke test for homepage
test('homepage renders and has nav', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/StitchOS|Home|Stitch/)
  await expect(page.locator('nav')).toBeVisible()
})