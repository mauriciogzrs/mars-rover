from pprint import pformat

from const import chars
from grid import Grid
from rover import Rover


class Mars:
    def __init__(self, rows=10, obstacles=5):
        self.rows = rows
        self.obstacles = obstacles
        self.mars = None
        self.grid = None
        self.rovers = []
        self._create()

    def _create(self):
        self.mars = Grid(rows=self.rows, obstacles=self.obstacles)
        self.grid = self.mars.grid

        print("Welcome to Mars!")

        count = 0

        for x in range(len(self.grid)):
            count += self.grid[x].count("O")

        print(f"• Total obstacles: {count} \n")

    def add_rover(self, name, x=0, y=0, direction="N"):
        name = name.capitalize()
        direction = direction.upper()

        if self.grid[y][x]:
            raise Exception(f"Error: Can't place {name} at {x}, {y}")

        print(f"{name} is landing on Mars!")

        rover = Rover(name, x, y, direction, self.mars)
        self.rovers.append(rover)
        self.grid[y][x] = chars["rover"]

        return rover

    def print_grid(self):
        print(pformat(self.grid, indent=2), "\n")
