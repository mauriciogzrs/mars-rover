const assert = require('assert').strict;
const stdout = require('test-console').stdout;

const Rover = require('../../js/node/rover');
const Grid = require('../../js/node/grid');
const {icons, defaults, obsChar, roverChar} = require('../../js/node/const');


describe('Rover', function() {
  const roverName = 'tester';

  describe('Constructor', function() {
    let rover;
    let output;

    beforeEach('Creating default Rover', function() {
      output = stdout.inspectSync(function() {
        rover = new Rover(roverName);
      });
    });

    it('Should requiere the name property', function() {
      assert.strictEqual(Rover.length, 1);
      assert.strictEqual(rover.name, roverName);
    });
    it('Should have default values', function() {
      assert.strictEqual(rover.position.x, defaults.x);
      assert.strictEqual(rover.position.y, defaults.y);
      assert.strictEqual(rover.direction, defaults.direction);
      assert.strictEqual(rover.mars instanceof Grid, true);
      assert.strictEqual(output.findIndex((element) => element.includes(
          // eslint-disable-next-line
          `${roverName}: Landing position: ${defaults.x}, ${defaults.y} [${defaults.direction}]`,
      )), 0);
    });
    it('Should only have landing log', function() {
      assert.strictEqual(rover.travelLog.length, 1);
    });
  });

  describe('Turning', function() {
    let rover;

    beforeEach('Creating default Rover', function() {
      stdout.ignoreSync(function() {
        rover = new Rover(roverName, direction='N');
      });
    });

    it('Should turn right', function() {
      const icon = icons.turn.forthArrow;
      const instruction = icons.turn.forthInstruction;

      const output = stdout.inspectSync(function() {
        rover.right();
      });

      assert.strictEqual(rover.direction, 'E');
      assert.strictEqual(output.findIndex((element) => element.includes(
          `${icon} ${roverName} turning ${instruction}`,
      )), 0);
      assert.strictEqual(rover.travelLog.length, 1);
    });
    it('Should turn left', function() {
      const icon = icons.turn.backArrow;
      const instruction = icons.turn.backInstruction;

      const output = stdout.inspectSync(function() {
        rover.left();
      });

      assert.strictEqual(rover.direction, 'W');
      assert.strictEqual(output.findIndex((element) => element.includes(
          `${icon} ${roverName} turning ${instruction}`,
      )), 0);
      assert.strictEqual(rover.travelLog.length, 1);
    });
  });

  describe('Moving', function() {
    let rover;
    const initialPosition = parseInt(defaults.rows / 2);

    beforeEach('Creating default Rover', function() {
      stdout.ignoreSync(function() {
        rover = new Rover(roverName, x=initialPosition, y=initialPosition);
      });
    });

    it('Should move forwards', function() {
      const icon = icons.move.forthArrow;
      const instruction = icons.move.forthInstruction;

      const output = stdout.inspectSync(function() {
        rover.forwards();
      });

      assert.strictEqual(rover.direction, defaults.direction);
      assert.strictEqual(rover.position.y, initialPosition - 1);
      assert.strictEqual(output.findIndex((element) => element.includes(
          `${icon} ${roverName} moving ${instruction}`,
      )), 0);
      assert.strictEqual(rover.travelLog.length, 2);
    });
    it('Should move backwards', function() {
      const icon = icons.move.backArrow;
      const instruction = icons.move.backInstruction;

      const output = stdout.inspectSync(function() {
        rover.backwards();
      });

      assert.strictEqual(rover.direction, defaults.direction);
      assert.strictEqual(rover.position.y, initialPosition + 1);
      assert.strictEqual(output.findIndex((element) => element.includes(
          `${icon} ${roverName} moving ${instruction}`,
      )), 0);
      assert.strictEqual(rover.travelLog.length, 2);
    });
  });

  describe('Edges', function() {
    const initialPosition = {'x': 0, 'y': 0};
    const errorMessage = 'Error: Rover can\'t go over the edges.';

    it('Should not move over the top edge', function() {
      let rover;
      const output = stdout.inspectSync(function() {
        rover = new Rover(
            roverName, x=initialPosition.x, y=initialPosition.y, direction='N',
        );
        rover.forwards();
      });
      assert.deepStrictEqual(rover.position, initialPosition);
      assert.strictEqual(
          output.findIndex((element) => element.includes(errorMessage)), 2,
      );
      assert.strictEqual(rover.travelLog.length, 1);
    });
    it('Should not move over the left edge', function() {
      let rover;
      const output = stdout.inspectSync(function() {
        rover = new Rover(
            roverName, x=initialPosition.x, y=initialPosition.y, direction='E',
        );
        rover.backwards();
      });
      assert.deepStrictEqual(rover.position, initialPosition);
      assert.strictEqual(
          output.findIndex((element) => element.includes(errorMessage)), 2,
      );
      assert.strictEqual(rover.travelLog.length, 1);
    });
  });

  describe('Obstacles', function() {
    let rover;
    const initialPosition = {'x': 0, 'y': 0};

    beforeEach('Creating default Rover', function() {
      stdout.ignoreSync(function() {
        rover = new Rover(
            roverName, x=initialPosition.x, y=initialPosition.y, direction='E',
        );
      });
    });

    it('Should not move through a rover', function() {
      rover.mars.grid[initialPosition.y][initialPosition.x + 1] = roverChar;
      const output = stdout.inspectSync(function() {
        rover.forwards();
      });
      assert.deepStrictEqual(rover.position, initialPosition);
      assert.strictEqual(
          output.findIndex((element) => element.includes('Rover found')), 1,
      );
      assert.strictEqual(rover.travelLog.length, 1);
    });
    it('Should not move through an obstacle', function() {
      rover.mars.grid[initialPosition.y][initialPosition.x + 1] = obsChar;
      const output = stdout.inspectSync(function() {
        rover.forwards();
      });
      assert.deepStrictEqual(rover.position, initialPosition);
      assert.strictEqual(
          output.findIndex((element) => element.includes('Obstacle found')), 1,
      );
      assert.strictEqual(rover.travelLog.length, 1);
    });
  });

  describe('Commands', function() {
    let rover;
    const initialDirection = 'N';
    const initialPosition = {'x': 0, 'y': 0};

    stdout.ignoreSync(function() {
      rover = new Rover(
          roverName,
          x=initialPosition.x,
          y=initialPosition.y,
          direction=initialDirection,
      );
    });

    it('Should return to the initial position', function() {
      const command = 'rfbl';
      const movingCommands = [...command]
          .filter((c) => c === 'f' || c === 'b').length;

      rover.mars.grid[initialPosition.y + 1][initialPosition.x + 1] = '';

      stdout.inspectSync(function() {
        rover.command(command);
        rover.done();
      });

      assert.deepStrictEqual(rover.position, initialPosition);
      assert.strictEqual(rover.direction, initialDirection);
      // eslint-disable-next-line
      assert.strictEqual(rover.travelLog.length, movingCommands + 1); // 1 -> Initial log position
    });
  });
});
