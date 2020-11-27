const assert = require('assert').strict;
const stdout = require('test-console').stdout;

const Grid = require('../../js/node/grid');
const {defaults, obsChar} = require('../../js/node/const');


describe('Grid', function() {
  describe('Constructor', function() {
    const map = new Grid();

    it('Should have default values', function() {
      assert.strictEqual(Array.isArray(map.grid), true);
      assert.strictEqual(Array.isArray(map.grid[0]), true);
      assert.strictEqual(Array.isArray(map.grid[defaults.rows - 1]), true);
      assert.strictEqual(map.rows, defaults.rows);
      assert.strictEqual(map.obstacles, defaults.obstacles);
      assert.strictEqual(map.maxObstacles, parseInt(defaults.rows ** 2 / 2));
    });
    it('Should have default obstacles characters', function() {
      let count = 0;
      for (const row of map.grid) {
        count += row.filter((e) => e === obsChar).length;
      }
      assert.strictEqual(count, defaults.obstacles);
    });
    it('Should not add moren than maxObstacles', function() {
      const obs = parseInt(defaults.rows ** 2 / 2);
      let mapMaxObs;

      const output = stdout.inspectSync(function() {
        mapMaxObs = new Grid(rows=defaults.rows, obstacles=obs + 1);
      });

      assert.strictEqual(mapMaxObs.obstacles, obs);
      assert.strictEqual(
          output.findIndex((element) => element.includes('Too many obstacles')),
          0,
      );
    });
  });
});
