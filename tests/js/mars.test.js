const assert = require('assert').strict;
const stdout = require('test-console').stdout;

const Mars = require('../../js/node/mars');
const Grid = require('../../js/node/grid');
const {defaults, obsChar, roverChar} = require('../../js/node/const');


describe('Mars', function() {
  describe('Constructor', function() {
    let mars;

    const output = stdout.inspectSync(function() {
      mars = new Mars();
    });
    const map = mars.mars;
    const grid = map.grid;

    it('Should have default values', function() {
      assert.strictEqual(Array.isArray(grid), true);
      assert.strictEqual(Array.isArray(grid[0]), true);
      assert.strictEqual(Array.isArray(grid[defaults.rows - 1]), true);
      assert.strictEqual(mars.rows, defaults.rows);
      assert.strictEqual(mars.obstacles, defaults.obstacles);
      assert.strictEqual(mars.rovers.length, 0);
      assert.strictEqual(map instanceof Grid, true);
      assert.strictEqual(map.maxObstacles, parseInt(defaults.rows ** 2 / 2));
      assert.strictEqual(
          output.findIndex((element) => element.includes('Welcome to Mars!')),
          0,
      );
    });
  });

  describe('Rover', function() {
    let mars;
    const roverName = 'Tester';
    stdout.ignoreSync(function() {
      mars = new Mars();
    });

    it('Should land a rover successfully', function() {
      let rover;
      mars.grid[defaults.y][defaults.x] = '';

      const output = stdout.inspectSync(function() {
        rover = mars.addRover(roverName);
      });
      assert.strictEqual(mars.rovers.includes(rover), true);
      assert.strictEqual(mars.grid[defaults.y][defaults.x], roverChar);
      assert.strictEqual(
          output.findIndex((element) => element.includes(roverName)), 0,
      );
    });
    it('Should not land a rover over an obstacle', function() {
      mars.grid[defaults.y][defaults.x] = obsChar;
      assert.throws(() => mars.addRover(roverName), Error);
    });
  });

  describe('Grid', function() {
    let mars;
    stdout.ignoreSync(function() {
      mars = new Mars();
    });

    it('Should print the grid', function() {
      const output = stdout.inspectSync(function() {
        mars.printGrid();
      });
      assert.strictEqual(
          output.findIndex((element) => element.includes(obsChar)), 0,
      );
    });
  });
});
