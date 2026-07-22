import test, { expect } from '@playwright/test'
import { formatCurrency } from './utils/formatCurrency'

test.describe('Gringotts Bank', async () => {
    test('display correct offer data', async ({ page }) => {
        const investment = 1500000000
        const years = 20000
        const fund = 'Galleon Guardian Fund'

        await test.step('Open page', async () => {
            await page.goto('/#/gringottsBank')
        })

        await test.step('Enter investment data', async () => {
            await page.locator('[id="selectedFund"]').selectOption(fund)
            await page.locator('#oneTimeInvestment').fill(investment.toString())
            await page.locator('#years').fill(years.toString())
        })

        await test.step('Submit investment data', async () => {
            await page.getByRole('button', { name: 'Make me an offer' }).click()
        })

        await test.step('Check displayed data', async () => {
            const offerDetail = page.locator('div.offer-detail')
            await expect(offerDetail).toBeVisible()
            await expect(offerDetail.locator('p.fund')).toContainText(fund)
            await expect(offerDetail.locator('p.fund').locator('span')).toHaveText(fund)

            await expect(offerDetail.locator('div.your-data').getByText('Investment').locator('span'))
                .toHaveText(formatCurrency(investment))
        })
    })
})
