const Rover = require('./rover');
const Grid = require('./grid');
const {obsChar, roverChar, defaults} = require('./const');

module.exports = class Mars {
  constructor(rows = defaults.rows, obstacles = defaults.obstacles) {
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

    this.grid.forEach((row) => {
      count += row.filter((e) => e === obsChar).length;
    });

    console.log(`• Total obstacles: ${count} \n`);
  }

  addRover(
      name, x = defaults.x, y = defaults.y, direction = defaults.direction,
  ) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    direction = direction.toUpperCase();

    if (this.grid[y][x]) {
      throw new Error(`Error: Can't place ${name} at ${x}, ${y}`);
    }

    console.log(`${name} is landing on Mars!`);

    const rover = new Rover(name, x, y, direction, this.mars);

    this.rovers.push(rover);
    this.grid[y][x] = roverChar;

    return rover;
  }

  printGrid() {
    console.log(this.grid, '\n');
  }
};
