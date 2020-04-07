const {obsChar, roverChar} = require('./const');

module.exports = class Rover {
  constructor(
      name, x = 0, y = 0, direction = 'N', mars = {'grid': [[], []]},
  ) {
    this.compass = ['N', 'E', 'S', 'W'];
    this.direction = direction;
    this.mars = mars;
    this.name = name;
    this.position = {'x': x, 'y': y};
    this.travelLog = [];
    this.create();
  }

  logger() {
    const log = Object.values(this.position);
    log.push(this.direction);
    return this.travelLog.push(log);
  }

  create() {
    const direction = this.direction;
    const grid = this.mars.grid;
    const name = this.name;
    const x = this.position.x;
    const y = this.position.y;

    grid[y][x] = roverChar;

    console.log(`${name}: Landing position: ${x}, ${y} [${direction}] \n`);

    return this.logger();
  }

  output(type, direction, moves) {
    const icons = {
      'turn': {
        'forthArrow': '↻',
        'backArrow': '↺',
        'forthInstruction': 'right',
        'backInstruction': 'left',
      },
      'move': {
        'forthArrow': '↑',
        'backArrow': '↓',
        'forthInstruction': 'forwards',
        'backInstruction': 'backwards',
      },
    };

    const forthArrow = icons[type].forthArrow;
    const backArrow = icons[type].backArrow;
    const forthInstruction = icons[type].forthInstruction;
    const backInstruction = icons[type].backInstruction;

    const polarity = direction > 0;
    const arrow = polarity ? forthArrow : backArrow;
    const instruction = polarity ? forthInstruction : backInstruction;

    const xMoves = moves > 1 ? ` x${moves}` : '';

    return [arrow, instruction, xMoves];
  }

  turn(direction = 1, moves = 1) {
    const [arrow, instruction, xMoves] = this.output('turn', direction, moves);
    let [...compass] = this.compass;

    compass = !direction ? compass.reverse() : compass;

    const now = compass.indexOf(this.direction);
    const total = (now + moves) % compass.length;

    this.direction = compass[total];

    console.log(
        `${arrow} ${this.name} turning ${instruction}${xMoves}`,
        `[${this.direction}]`,
    );

    return this.direction;
  }

  getPosition(direction = 1, moves = 1) {
    let x = this.position.x;
    let y = this.position.y;

    if (direction) {
        this.direction === 'E' ? x += moves : 0;
        this.direction === 'W' ? x -= moves : 0;
        this.direction === 'N' ? y -= moves : 0;
        this.direction === 'S' ? y += moves : 0;
    } else {
        this.direction === 'E' ? x -= moves : 0;
        this.direction === 'W' ? x += moves : 0;
        this.direction === 'N' ? y += moves : 0;
        this.direction === 'S' ? y -= moves : 0;
    }

    return [x, y];
  }

  validateMove(direction = 1) {
    const grid = this.mars.grid;
    const [x, y] = this.getPosition(direction, 1);

    if (! (y >= 0 && y < grid.length) ||
        ! (x >= 0 && x < grid.length) ) {
      console.log('\tError: Rover can\'t go over the edges.');

      return [x, y, false];
    }

    if (grid[y][x]) {
      const type = grid[y][x] === obsChar ? 'Obstacle' : 'Rover';

      console.log(`\t${this.name}: ${type} found [${x}, ${y}]. Can't move.`);

      return [x, y, false];
    }

    return [x, y, true];
  }

  move(direction = 1, moves = 1) {
    const [arrow, instruction, xMoves] = this.output('move', direction, moves);
    const [toX, toY] = this.getPosition(direction, moves);

    console.log(
        `${arrow} ${this.name} moving ${instruction}${xMoves}... \
          \n\tFrom: [${this.position.x}, ${this.position.y}] \
          \n\tTo:   [${toX}, ${toY}]`);

    for (let i = 0; i < moves; i++) {
      const [x, y, safe] = this.validateMove(direction);

      if (!safe) break;

      this.mars.grid[y][x] = roverChar;
      this.mars.grid[this.position.y][this.position.x] = '';

      this.position.x = x;
      this.position.y = y;

      this.logger();
    }

    return [this.position.x, this.position.y];
  }

  right(moves = 1) {
    return this.turn(1, moves);
  };

  left(moves = 1) {
    return this.turn(0, moves);
  };

  forwards(moves = 1) {
    return this.move(1, moves);
  };

  backwards(moves = 1) {
    return this.move(0, moves);
  };

  command(commands) {
    const valid = ['r', 'l', 'f', 'b'];

    for (const command of commands) {
      if (valid.includes(command)) {
        command === valid[0] ? this.right() : null;
        command === valid[1] ? this.left() : null;
        command === valid[2] ? this.forwards() : null;
        command === valid[3] ? this.backwards() : null;
      }
    }
  };

  done() {
    const direction = this.direction;
    const name = this.name;
    const x = this.position.x;
    const y = this.position.y;

    console.log(
        `\n• ${name}: Final position: ${x}, ${y} [${direction}] \
        \n\t${name}: Travel Log:\n\t`,
        JSON.stringify(this.travelLog), '\n',
    );

    return [x, y, direction];
  }
};
