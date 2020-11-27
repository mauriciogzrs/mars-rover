const {obsChar, defaults} = require('./const');

module.exports = class Grid {
  constructor(rows = defaults.rows, obstacles = defaults.obstacles) {
    this.grid = [];
    this.rows = rows;
    this.obstacles = obstacles;
    this.maxObstacles = parseInt(this.rows ** 2 / 2);
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
      [grid[i], grid[j]] = [grid[j], grid[i]];
    }
    return grid;
  }

  createObstacles() {
    if (this.obstacles > this.maxObstacles) {
      console.log(
          'Too many obstacles:', this.obstacles,
          `[max ${this.maxObstacles}]`,
      );

      this.obstacles = this.maxObstacles;
    }

    for (let i = 0; i < this.obstacles; i++) {
      let x = i >= this.rows ? Math.floor(Math.random() * this.rows) : i;

      const count = this.grid[x].filter((e) => e === obsChar).length;

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
