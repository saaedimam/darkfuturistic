import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('should display contact form', async ({ page }) => {
    // Check if contact form is visible
    await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible()
    
    // Check form fields
    await expect(page.getByLabel('Name *')).toBeVisible()
    await expect(page.getByLabel('Email *')).toBeVisible()
    await expect(page.getByLabel('Subject *')).toBeVisible()
    await expect(page.getByLabel('Message *')).toBeVisible()
    
    // Check submit button
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible()
  })

  test('should show validation errors for empty form', async ({ page }) => {
    // Click submit button without filling form
    await page.getByRole('button', { name: 'Send Message' }).click()
    
    // Check for validation errors
    await expect(page.getByText('Name must be at least 2 characters')).toBeVisible()
    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
    await expect(page.getByText('Subject must be at least 5 characters')).toBeVisible()
    await expect(page.getByText('Message must be at least 10 characters')).toBeVisible()
  })

  test('should submit form with valid data', async ({ page }) => {
    // Fill out the form
    await page.getByLabel('Name *').fill('John Doe')
    await page.getByLabel('Email *').fill('john@example.com')
    await page.getByLabel('Subject *').fill('Test Subject')
    await page.getByLabel('Message *').fill('This is a test message')
    
    // Submit the form
    await page.getByRole('button', { name: 'Send Message' }).click()
    
    // Check for loading state
    await expect(page.getByText('Sending...')).toBeVisible()
    
    // Wait for success message (mock will complete after 1 second)
    await expect(page.getByText('Thank You!')).toBeVisible({ timeout: 5000 })
  })

  test('should display contact information', async ({ page }) => {
    // Check contact info
    await expect(page.getByText('hello@ioriimasu.com')).toBeVisible()
    await expect(page.getByText('+1 (555) 123-4567')).toBeVisible()
    await expect(page.getByText('San Francisco, CA')).toBeVisible()
  })

  test('should have proper accessibility', async ({ page }) => {
    // Check for proper heading structure
    await expect(page.getByRole('heading', { name: 'Get in Touch', level: 1 })).toBeVisible()
    
    // Check for form labels
    await expect(page.getByLabel('Name *')).toBeVisible()
    await expect(page.getByLabel('Email *')).toBeVisible()
    await expect(page.getByLabel('Subject *')).toBeVisible()
    await expect(page.getByLabel('Message *')).toBeVisible()
    
    // Check for proper button labels
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible()
  })

  test('should be keyboard accessible', async ({ page }) => {
    // Tab through form elements
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Name *')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Email *')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Subject *')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Message *')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeFocused()
  })
})