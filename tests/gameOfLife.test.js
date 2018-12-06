const gameOfLife = require('../src')
const fixtures = require('./fixtures')
const { map } = require('ramda')

describe('gameOfLife()', () => {
    map(({ initialState, nextState }) => {
        it('correctly transitions to expected state', () => {
            expect(gameOfLife(initialState)).toStrictEqual(nextState)
        })
    })(fixtures)
})