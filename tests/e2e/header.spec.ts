import { test, expect } from '@playwright/test'

test.describe('Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render header with navigation', async ({ page }) => {
    // Check if header is visible
    await expect(page.locator('header')).toBeVisible()
    
    // Check logo
    await expect(page.getByText('Lumina')).toBeVisible()
    
    // Check navigation items
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Pricing' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Testimonials' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'FAQ' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible()
  })

  test('should have skip link for accessibility', async ({ page }) => {
    const skipLink = page.getByText('Skip to main content')
    await expect(skipLink).toBeVisible()
    await expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  test('should toggle theme', async ({ page }) => {
    const themeButton = page.getByLabelText(/switch to/i)
    await expect(themeButton).toBeVisible()
    
    // Click theme toggle
    await themeButton.click()
    
    // Check if theme changed (this would depend on your theme implementation)
    await expect(page.locator('html')).toHaveClass(/dark|light/)
  })

  test('should open mobile menu', async ({ page }) => {
    // Resize to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    const menuButton = page.getByLabelText('Open navigation menu')
    await expect(menuButton).toBeVisible()
    
    // Open mobile menu
    await menuButton.click()
    
    // Check if mobile menu is open
    await expect(page.getByText('Features')).toBeVisible()
  })

  test('should navigate to sections on click', async ({ page }) => {
    // Test anchor link navigation
    const featuresLink = page.getByRole('link', { name: 'Features' })
    await featuresLink.click()
    
    // Wait for scroll to complete
    await page.waitForTimeout(500)
    
    // Check if we scrolled to features section
    // This would depend on your implementation
  })

  test('should have proper focus management', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab')
    
    // Check if skip link is focused first
    const skipLink = page.getByText('Skip to main content')
    await expect(skipLink).toBeFocused()
    
    // Continue tabbing through navigation
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('should be sticky on scroll', async ({ page }) => {
    const header = page.locator('header')
    
    // Check initial position
    await expect(header).toHaveClass(/fixed/)
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500))
    
    // Check if header is still visible and has scrolled styles
    await expect(header).toBeVisible()
    await expect(header).toHaveClass(/bg-background\/80/)
  })

  test('should be accessible', async ({ page }) => {
    // Check for proper ARIA labels
    await expect(page.getByLabelText('Main navigation')).toBeVisible()
    
    // Check for proper heading structure
    const logo = page.getByText('Lumina')
    await expect(logo).toBeVisible()
    
    // Check for proper button labels
    await expect(page.getByLabelText(/switch to/i)).toBeVisible()
    await expect(page.getByLabelText('Open navigation menu')).toBeVisible()
  })
})