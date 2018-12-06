const { cond, lt, gte, equals, always, compose, subtract, flatten, filter, length, __, T } = require('ramda')
const DEAD = 0
const ALIVE = 1
const isDead = equals(DEAD)
const isAlive = equals(ALIVE)

// damn I just can't not put this here :(
let currentState = false;

const neighboursOf = (y, x) => {
    const xStart = x === 0 ? 0 : x - 1
    const xEnd = x === 0 ? 2 : xStart + 3
    const yStart = y === 0 ? 0 : y - 1
    const yEnd = y === 0 ? 2 : yStart + 3
    return currentState.slice(yStart, yEnd).map(row => row.slice(xStart, xEnd))
}

const neighboursAlive = (rowIndex, colIndex, cell) => {
    const neighbours = neighboursOf(rowIndex, colIndex)
    const alive = compose(subtract(__, cell), length, filter(isAlive), flatten)(neighbours)
    return alive
}

const aliveRuleSet = (rowIndex, colIndex) => cond([
    [lt(__, 2), always(DEAD)],
    [equals(3), always(ALIVE)],
    [gte(__, 4), always(DEAD)],
    [T, always(ALIVE)]
])(neighboursAlive(rowIndex, colIndex, ALIVE))

const deadRuleSet = (rowIndex, colIndex) => cond([
    [equals(3), always(ALIVE)],
    // what's dead may never die!
    [T, always(DEAD)]
])(neighboursAlive(rowIndex, colIndex, DEAD))

const ruleSet = (cell, rowIndex, colIndex) => cond([
    [isAlive, () => aliveRuleSet(rowIndex, colIndex)],
    [isDead, () => deadRuleSet(rowIndex, colIndex)]
])(cell)

const run = grid => grid.map((row, rowIndex) => row.map((cell, colIndex) => ruleSet(cell, rowIndex, colIndex)))

const gameOfLife = initialState => {
    const state = initialState
    currentState = state
    return run(state)
}

module.exports = gameOfLife