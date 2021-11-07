const { generateWorld } = require('./game-of-life-world');

describe("Basic map", () => {
  test('response is a 2d array', () => {
    expect(generateWorld({size: 2, id: 'test'})).toEqual([
      [1, 0],
      [1, 0]
    ])
  });

  test('size corresponds to size argument', () => {
    const world = generateWorld({size: 200});
    expect(world.length).toBe(200)
    expect(world[0].length).toBe(200)
  });

  test('seed influences life', () => {
    const worldA = generateWorld({id: 'a'});
    const worldB = generateWorld({id: 'b'});
    expect(worldA).not.toEqual(worldB);
  })
})
