from const import chars


class Rover:
    def __init__(self, name, x=0, y=0, direction="N", mars=object()):
        self.compass = ["N", "E", "S", "W"]
        self.mars = mars
        self.name = name
        self.direction = direction
        self.position = {"x": x, "y": y}
        self.travel_log = []
        self._create()

    def _logger(self):
        log = [coord for coord in self.position.values()]
        log.append(self.direction)

        return self.travel_log.append(tuple(log))

    def _create(self):
        name = self.name
        x = self.position["x"]
        y = self.position["y"]
        direction = self.direction
        grid = self.mars.grid if self.mars.grid else [[]]

        grid[y][x] = chars["rover"]

        print(f"• {name}: Landing position: {x}, {y} [{direction}]\n")

        return self._logger()

    def _output(self, kind, direction, moves):
        icons = {
            "turn": {
                "forth_arrow": "↻",
                "back_arrow": "↺",
                "forth_instruction": "right",
                "back_instruction": "left",
            },
            "move": {
                "forth_arrow": "↑",
                "back_arrow": "↓",
                "forth_instruction": "forwards",
                "back_instruction": "backwards",
            },
        }

        forth_arrow = icons[kind]["forth_arrow"]
        back_arrow = icons[kind]["back_arrow"]
        forth_instruction = icons[kind]["forth_instruction"]
        back_instruction = icons[kind]["back_instruction"]

        polarity = direction > 0
        arrow = forth_arrow if polarity else back_arrow
        instruction = forth_instruction if polarity else back_instruction

        x_moves = f" x{moves}" if moves > 1 else ""

        return (arrow, instruction, x_moves)

    def _turn(self, direction=1, moves=1):
        arrow, instruction, x_moves = self._output("turn", direction, moves)

        operator = "+" if direction else "-"
        now = self.compass.index(self.direction)
        total = eval(f"{now} {operator} {moves}")
        index = total % len(self.compass)

        self.direction = self.compass[index]

        print(f"{arrow} {self.name} turning {instruction}{x_moves} [{self.direction}]")

        return self.direction

    def _get_position(self, direction=1, moves=1):
        x = self.position["x"]
        y = self.position["y"]

        if direction:
            x += moves if self.direction == "E" else 0
            x -= moves if self.direction == "W" else 0
            y -= moves if self.direction == "N" else 0
            y += moves if self.direction == "S" else 0
        else:
            x -= moves if self.direction == "E" else 0
            x += moves if self.direction == "W" else 0
            y += moves if self.direction == "N" else 0
            y -= moves if self.direction == "S" else 0

        return (x, y)

    def _validate_move(self, direction=1):
        grid = self.mars.grid if self.mars.grid else [[]]

        x, y = self._get_position(direction, 1)

        if not 0 <= y < len(grid) or not 0 <= x < len(grid):
            print("\tError: Rover can't go over the edges.")
            return (x, y, False)

        if grid[y][x]:
            kind = "Obstacle" if grid[y][x] == chars["obstacle"] else "Rover"
            print(f"\t{self.name}: {kind} found [{x}, {y}]. Can't move.")
            return (x, y, False)

        return (x, y, True)

    def _move(self, direction=1, moves=1):
        arrow, instruction, x_moves = self._output("move", direction, moves)
        to_x, to_y = self._get_position(direction, moves)

        print(
            f'{arrow} {self.name} moving {instruction}{x_moves}...\
            \n\tFrom: [{self.position["x"]}, {self.position["y"]}] \
            \n\tTo:   [{to_x}, {to_y}]'
        )

        for n in range(moves):
            x, y, safe = self._validate_move(direction)

            if not safe:
                break

            self.mars.grid[y][x] = chars["rover"]
            self.mars.grid[self.position["y"]][self.position["x"]] = ""

            self.position["x"] = x
            self.position["y"] = y

            self._logger()

        return (self.position["x"], self.position["y"])

    def right(self, moves=1):
        return self._turn(moves=moves)

    def left(self, moves=1):
        return self._turn(0, moves)

    def forwards(self, moves=1):
        return self._move(moves=moves)

    def backwards(self, moves=1):
        return self._move(0, moves)

    def command(self, commands):
        valid = ["r", "l", "f", "b"]

        for command in commands:
            if command in valid:
                self.right() if command == valid[0] else 0
                self.left() if command == valid[1] else 0
                self.forwards() if command == valid[2] else 0
                self.backwards() if command == valid[3] else 0

    def done(self):
        name = self.name
        x = self.position["x"]
        y = self.position["y"]
        direction = self.direction
        log = self.travel_log

        print(
            f"\n• {name}: Final position: {x}, {y} [{direction}] \
            \n\t{name}: Travel Log:\n\t{log}\n"
        )

        return (x, y, direction)
