import test, { expect, request } from "@playwright/test";
import { faker } from '@faker-js/faker';

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
    const expectedType = 'Charm'
    const response = await request.get('http://localhost:3000/spells', {
        params: {
            type: expectedType
        }
    })
    const body: Spell[] = await response.json()
    expect(body.length).toBeGreaterThan(0)

    body.forEach(item => {
        expect(item.type).toEqual(expectedType)
    })
})

test('create new spell', async ({ request }) => {
    const newSpell = {
        spell: "Corona" + faker.word.words(2),
        effect: "sneezing forever",
        type: "Curse",
        isUnforgivable: false
    }
    //vytvorim nove kuzlo cez POST request
    const response = await request.post('http://localhost:3000/spells', {
        data: newSpell,
    })
    //z odpovede vytiahnem ID
    const body = await response.json()
    const id = body.spell.id

    //zavolam novy request a dotiahnem detail kuzla pomocou ID z predoslej odpovede
    const spellResponse = await request.get('http://localhost:3000/spells/' + id)
    expect(spellResponse.ok()).toBeTruthy()
})



interface Spell {
    id: string,
    spell: string,
    type: string,
    effect: string,
    isUnforgivable: boolean
}
