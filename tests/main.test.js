const service = require('../src/services/main')

describe('Count letter in names', () => {
    test('location', async () => {
        const result = await service.getCharCounts()
        const { results } = result
        expect(results[0].count).toBe(82)
    })
    test('episode', async () => {
        const result = await service.getCharCounts()
        const { results } = result
        expect(results[1].count).toBe(88)
    })
    test('character', async () => {
        const result = await service.getCharCounts()
        const { results } = result
        expect(results[2].count).toBe(494)
    })
})

describe('Compare locations in episode', () => {
    test('Pilot', async () => {
        const result = await service.getCharactersLocationPerEpisode()
        const { results } = result
        const pilotLocations = [
          'Citadel of Ricks',
          'Bepis 9',
          'Earth (C-137)',
          'Interdimensional Customs',
          'Earth (Replacement Dimension)',
          "Worldender's lair",
        ];
        for (location in pilotLocations) {

        }
        expect(results[0].location).toEqual(pilotLocations)
        expect(results[0].name).toBe('Pilot')
    })
})