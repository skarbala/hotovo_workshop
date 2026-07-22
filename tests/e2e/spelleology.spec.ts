import test, { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test('created spell is visible in Spelleology', async ({ page, request }) => {
    const newSpell = {
        spell: 'Corona' + faker.word.words(2),
        effect: faker.word.words(3) + ' ' + faker.string.alphanumeric(8),
        type: 'Curse',
        isUnforgivable: false,
    }

    await test.step('Create new spell via API', async () => {
        const response = await request.post('http://localhost:3000/spells', {
            data: newSpell,
        })
        //   expect(response.status()).toBeGreaterThanOrEqual(200)
        //   expect(response.status()).toBeLessThan(300)

        expect(response.ok()).toBeTruthy()
    })

    await test.step('Open Spelleology page', async () => {
        await page.goto('/#/spelleology')
    })

    await test.step('Filter spell by effect', async () => {
        await page.locator('[data-test="search-input"]').fill(newSpell.effect)
    })

    await test.step('Verify spell is visible in the list', async () => {
        await expect(page.locator('ul.spells li').filter({ hasText: newSpell.effect })).toBeVisible()
    })

    await test.step('Open spell detail', async () => {
        await page.locator('ul.spells li').filter({ hasText: newSpell.effect }).click()
    })

    await test.step('Verify spell name, effect and type', async () => {
        await expect(page.getByRole('heading', { name: newSpell.spell, level: 2 })).toBeVisible()
        await expect(page.getByRole('heading', { name: newSpell.effect, level: 3 })).toBeVisible()
        await expect(page.getByRole('heading', { name: newSpell.type, level: 4 })).toBeVisible()
    })
})
