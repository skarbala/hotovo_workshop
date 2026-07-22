import test, { expect } from '@playwright/test'
test('display message on button click', async ({ page }) => {
    await page.goto('http://localhost:8080/#/sortingHat')
    await page.getByRole('button', { name: 'Sort me' }).click()

    const response = await page.waitForResponse('**/sortingHat')
    expect(response.status()).toBe(200)

    //1. vytiahnem si telo odpovede, kedze viem ze je to JSON
    const body = await response.json()
    //2. vypisem si odpoved
    console.log(body)

    await expect(page.locator('[data-test="result-message"]')).toBeVisible()
    await expect(page.locator('[data-test="result-message"]')).toHaveText(body.sortingHatSays)

    await expect(page.locator('[data-test="house-result"]')).toBeVisible()
    await expect(page.locator('[data-test="house-result"]')).toHaveText(body.house)
})