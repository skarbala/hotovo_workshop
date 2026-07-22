import test, { expect } from '@playwright/test'
test('display message on button click', async ({ page }) => {
    await page.goto('/#/sortingHat')
    await page.getByRole('button', { name: 'Sort me' }).click()

    const response = await page.waitForResponse('**/sortingHat')
    expect(response.status()).toBe(200)

    const body = await response.json()
    await expect(page.locator('[data-test="result-message"]')).toBeVisible()
    await expect(page.locator('[data-test="result-message"]')).toHaveText(body.sortingHatSays)

    await expect(page.locator('[data-test="house-result"]')).toBeVisible()
    await expect(page.locator('[data-test="house-result"]')).toHaveText(body.house)
})