# David's implementation of Conway's game of life

This implementation tries to be as elegant as possible and implement the game of life in a functional style.

## Rules and considerations

### Rules
Any live cell with fewer than two live neighbors dies, as if by underpopulation.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overpopulation.
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

### Considerations

- We're not caring at all about grid expandability now and just focusing on a grid that receives an initail state.
- The grid has constraints, and therefore, the moving patterns eventually die out (like spaceships)
- Grid expansion has been simply ignored
