import test, { expect, request } from "@playwright/test";

test('returns all spells', async ({ request }) => {
    const response = await request.get('http://localhost:3000/spells')
    expect(response.status()).toBe(200)
    expect(response.ok()).toBeTruthy()
    expect(response.ok()).toBe(true)

    const body: Spell[] = await response.json()
    expect(body.length).toBeGreaterThan(0)

    body.forEach(item => {
        expect(item.spell).toBeTruthy()
        expect(item.effect).toBeTruthy()
        expect(item.type).toBeTruthy()
        expect(item.isUnforgivable).toBeDefined()
    });
})

test('returns spells by type', async ({ request }) => {
    const response = await request.get('http://localhost:3000/spells', {
        params: {
            type: 'Charm'
        }
    })
})

interface Spell {
    id: string,
    spell: string,
    type: string,
    effect: string,
    isUnforgivable: boolean
}
