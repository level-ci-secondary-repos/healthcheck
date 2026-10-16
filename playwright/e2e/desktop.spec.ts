import { levelAnalyze } from '@level-ci/a11y-playwright'
import { expect, test } from 'playwright/test'

test.describe('desktop healthcheck', () => {
  test('analyzes the homepage', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', {
        name: 'Best Broadband Internet Plans For You',
      }),
    ).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: /BUNDLE$/ })).toHaveCount(3)
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()

    await levelAnalyze(page, {
      experimental: { elementScreenshots: true },
    })
  })

  test('analyzes the privacy page', async ({ page }) => {
    await page.goto('/privacy.html')

    await expect(
      page.getByRole('heading', { name: 'Privacy policy' }),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Return to the store' }),
    ).toBeVisible()

    await levelAnalyze(page, {
      experimental: { elementScreenshots: true },
    })
  })
})
