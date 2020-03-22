from random import randrange, shuffle

from const import chars


class Grid:
    def __init__(self, rows=10, obstacles=5):
        self.grid = []
        self.rows = rows
        self.obstacles = obstacles
        self.max_obstacles = int(self.rows ** 2 / 2)
        self._create()

    def _fill_grid(self):
        for x in range(self.rows):
            self.grid.append([])
            self.grid[x] = [""] * self.rows

    def _obstacles(self):
        if self.obstacles > self.max_obstacles:
            print("Too many obstacles:", self.obstacles, f"[max {self.max_obstacles}]")
            self.obstacles = self.max_obstacles

        for n in range(self.obstacles):
            x = randrange(self.rows) if n >= self.rows else n

            while self.grid[x][x] or self.grid[x].count(chars["obstacle"]) > self.rows:
                x = randrange(self.rows)

            self.grid[x][x] = chars["obstacle"]

            shuffle(self.grid)

    def _create(self):
        self._fill_grid()
        self._obstacles()
