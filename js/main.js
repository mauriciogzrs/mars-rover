(function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.d = function(exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
    }
  };
  __webpack_require__.r = function(exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
    }
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  };
  __webpack_require__.t = function(value, mode) {
    if (mode & 1) {
      value = __webpack_require__(value);
    }
    if (mode & 8) {
      return value;
    }
    if (mode & 4 && typeof value === 'object' && value && value.__esModule) {
      return value;
    }
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    if (mode & 2 && typeof value != 'string') {
      for (var key in value) {
        __webpack_require__.d(ns, key, function(key) {
          return value[key];
        }.bind(null, key));
      }
    }
    return ns;
  };
  __webpack_require__.n = function(module) {
    var getter = module && module.__esModule ? function getDefault() {
      return module['default'];
    } : function getModuleExports() {
      return module;
    };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };
  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  __webpack_require__.p = "";
  return __webpack_require__(__webpack_require__.s = 0);
})([ function(module, exports, __webpack_require__) {
  const Mars = __webpack_require__(1);
  m = new Mars;
  r1 = m.addRover('spirit');
  r2 = m.addRover('curiosity', 4, 4, 'S');
  r1.right();
  r1.forwards(2);
  r1.left(3);
  r1.forwards(4);
  r1.right();
  r1.backwards(3);
  r2.command('xrzfzzzf!@#frflfrrbfrf123flbbb');
  r1.done();
  r2.done();
  m.printGrid();
}, function(module, exports, __webpack_require__) {
  const Rover = __webpack_require__(2);
  const Grid = __webpack_require__(4);
  const {obsChar: obsChar, roverChar: roverChar} = __webpack_require__(3);
  module.exports = class Mars {
    constructor(rows = 10, obstacles = 5) {
      this.rows = rows;
      this.obstacles = obstacles;
      this.mars = null;
      this.grid = null;
      this.rovers = [];
      this.create();
    }
    create() {
      let count = 0;
      this.mars = new Grid(this.rows, this.obstacles);
      this.grid = this.mars.grid;
      console.log('Welcome to Mars!');
      this.grid.forEach(row => {
        count += row.filter(e => e === obsChar).length;
      });
      console.log(`• Total obstacles: ${count} \n`);
    }
    addRover(name, x = 0, y = 0, direction = 'N') {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      direction = direction.toUpperCase();
      if (this.grid[y][x]) {
        new Error(`Error: Can't place ${name} at ${x}, ${y}`);
      }
      console.log(`${name} is landing on Mars!`);
      const rover = new Rover(name, x, y, direction, this.mars);
      this.rovers.push(rover);
      this.grid[y][x] = roverChar;
      return rover;
    }
    printGrid() {
      console.log(this.grid);
    }
  };
}, function(module, exports, __webpack_require__) {
  const {obsChar: obsChar, roverChar: roverChar} = __webpack_require__(3);
  module.exports = class Rover {
    constructor(name, x = 0, y = 0, direction = 'N', mars = {
      grid: [ [], [] ]
    }) {
      this.compass = [ 'N', 'E', 'S', 'W' ];
      this.direction = direction;
      this.mars = mars;
      this.name = name;
      this.position = {
        x: x,
        y: y
      };
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
        turn: {
          forthArrow: '↻',
          backArrow: '↺',
          forthInstruction: 'right',
          backInstruction: 'left'
        },
        move: {
          forthArrow: '↑',
          backArrow: '↓',
          forthInstruction: 'forwards',
          backInstruction: 'backwards'
        }
      };
      const forthArrow = icons[type].forthArrow;
      const backArrow = icons[type].backArrow;
      const forthInstruction = icons[type].forthInstruction;
      const backInstruction = icons[type].backInstruction;
      const polarity = direction > 0;
      const arrow = polarity ? forthArrow : backArrow;
      const instruction = polarity ? forthInstruction : backInstruction;
      const xMoves = moves > 1 ? ` x${moves}` : '';
      return [ arrow, instruction, xMoves ];
    }
    turn(direction = 1, moves = 1) {
      const [arrow, instruction, xMoves] = this.output('turn', direction, moves);
      let [...compass] = this.compass;
      compass = !direction ? compass.reverse() : compass;
      const now = compass.indexOf(this.direction);
      const total = (now + moves) % compass.length;
      this.direction = compass[total];
      console.log(`${arrow} ${this.name} turning ${instruction}${xMoves}`, `[${this.direction}]`);
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
      return [ x, y ];
    }
    validateMove(direction = 1) {
      const grid = this.mars.grid;
      const [x, y] = this.getPosition(direction, 1);
      if (!(y >= 0 && y < grid.length) || !(x >= 0 && x < grid.length)) {
        console.log('\tError: Rover can\'t go over the edges.');
        return [ x, y, false ];
      }
      if (grid[y][x]) {
        const type = grid[y][x] === obsChar ? 'Obstacle' : 'Rover';
        console.log(`\t${this.name}: ${type} found [${x}, ${y}]. Can't move.`);
        return [ x, y, false ];
      }
      return [ x, y, true ];
    }
    move(direction = 1, moves = 1) {
      const [arrow, instruction, xMoves] = this.output('move', direction, moves);
      const [toX, toY] = this.getPosition(direction, moves);
      console.log(`${arrow} ${this.name} moving ${instruction}${xMoves}...           \n\tFrom: [${this.position.x}, ${this.position.y}]           \n\tTo:   [${toX}, ${toY}]`);
      for (let i = 0; i < moves; i++) {
        const [x, y, safe] = this.validateMove(direction);
        if (!safe) {
          break;
        }
        this.mars.grid[y][x] = roverChar;
        this.mars.grid[this.position.y][this.position.x] = '';
        this.position.x = x;
        this.position.y = y;
        this.logger();
      }
      return [ this.position.x, this.position.y ];
    }
    right(moves = 1) {
      return this.turn(1, moves);
    }
    left(moves = 1) {
      return this.turn(0, moves);
    }
    forwards(moves = 1) {
      return this.move(1, moves);
    }
    backwards(moves = 1) {
      return this.move(0, moves);
    }
    command(commands) {
      const valid = [ 'r', 'l', 'f', 'b' ];
      for (const command of commands) {
        if (valid.includes(command)) {
          command === valid[0] ? this.right() : null;
          command === valid[1] ? this.left() : null;
          command === valid[2] ? this.forwards() : null;
          command === valid[3] ? this.backwards() : null;
        }
      }
    }
    done() {
      const direction = this.direction;
      const name = this.name;
      const x = this.position.x;
      const y = this.position.y;
      console.log(`\n• ${name}: Final position: ${x}, ${y} [${direction}]         \n\t${name}: Travel Log:\n\t`, JSON.stringify(this.travelLog), '\n');
      return [ x, y, direction ];
    }
  };
}, function(module, exports) {
  module.exports = {
    obsChar: 'O',
    roverChar: 'R'
  };
}, function(module, exports, __webpack_require__) {
  const {obsChar: obsChar} = __webpack_require__(3);
  module.exports = class Grid {
    constructor(rows = 10, obstacles = 5) {
      this.grid = [];
      this.rows = rows;
      this.obstacles = obstacles;
      this.max_obstacles = parseInt(this.rows ** 2 / 2);
      this.create();
    }
    fillGrid() {
      for (let i = 0; i < this.rows; i++) {
        const row = Array(this.rows).fill('');
        this.grid.push(row);
      }
    }
    shuffleGrid() {
      const grid = this.grid;
      for (let i = grid.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [grid[i], grid[j]] = [ grid[j], grid[i] ];
      }
      return grid;
    }
    createObstacles() {
      if (this.obstacles > this.max_obstacles) {
        console.log('Too many obstacles:', this.obstacles, `[max ${this.max_obstacles}]`);
        this.obstacles = this.max_obstacles;
      }
      for (let i = 0; i < this.obstacles; i++) {
        let x = i >= this.rows ? Math.floor(Math.random() * this.rows) : i;
        const count = this.grid[x].filter(e => e === obsChar).length;
        while (this.grid[x][x] || count > this.rows) {
          x = Math.floor(Math.random() * this.rows);
        }
        this.grid[x][x] = obsChar;
        this.shuffleGrid();
      }
    }
    create() {
      this.fillGrid();
      this.createObstacles();
    }
  };
} ]);