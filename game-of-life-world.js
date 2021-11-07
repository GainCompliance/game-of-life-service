const { nanoid } = require('nanoid');
const seedrandom = require('seedrandom');

const DEFAULT_SIZE = 100

const generateWorld = ({size, id}) => {
  size = size || DEFAULT_SIZE
  id = id || nanoid(8)

  var seededRandom = seedrandom(id);

  let world = []
  for(let row = 0; row < size; row++) {
    world[row] = [];
    for(let cell = 0; cell < size; cell++) {
      const hasLife = Math.round(seededRandom());
      world[row][cell] = hasLife;
    }
  }

  return world;
}

module.exports = {
  generateWorld
}
