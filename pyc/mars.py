from pprint import pformat

from pyc.const import chars, defaults
from pyc.grid import Grid
from pyc.rover import Rover


class Mars:
    def __init__(self, rows=defaults["rows"], obstacles=defaults["obstacles"]):
        self.rows = rows
        self.obstacles = obstacles
        self.mars = {}
        self.grid = [[]]
        self.rovers = []
        self._create()

    def _create(self):
        self.mars = Grid(rows=self.rows, obstacles=self.obstacles)
        self.grid = self.mars.grid

        print("Welcome to Mars!")

        count = 0

        for x in range(len(self.grid)):
            count += self.grid[x].count(chars["obstacle"])

        print(f"• Total obstacles: {count} \n")

    def add_rover(
        self, name, x=defaults["x"], y=defaults["y"], direction=defaults["direction"]
    ):
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
