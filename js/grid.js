class Grid {
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
      [grid[i], grid[j]] = [grid[j], grid[i]];
    }
    return grid;
  }

  createObstacles() {
    if (this.obstacles > this.max_obstacles) {
      console.log(
          'Too many obstacles:', this.obstacles,
          `[max ${this.max_obstacles}]`,
      );

      this.obstacles = this.max_obstacles;
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
