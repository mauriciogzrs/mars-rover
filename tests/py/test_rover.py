from pyc.const import chars, defaults
from pyc.rover import Rover


def test_create_rover():
    rover = Rover("test")

    assert rover.name == "test"
    assert rover.direction == defaults["direction"]
    assert rover.position == {"x": defaults["x"], "y": defaults["y"]}


def test_turn_right(capsys):
    icon = defaults["icons"]["turn"]["forth_arrow"]
    instruction = defaults["icons"]["turn"]["forth_instruction"]

    rover = Rover("test", direction="N")

    rover.right()
    output = capsys.readouterr()

    assert rover.direction == "E"
    assert f"{icon} {rover.name} turning" in output.out
    assert f"turning {instruction} [{rover.direction}]" in output.out


def test_turn_left(capsys):
    icon = defaults["icons"]["turn"]["back_arrow"]
    instruction = defaults["icons"]["turn"]["back_instruction"]

    rover = Rover("test", direction="N")

    rover.left()
    output = capsys.readouterr()

    assert rover.direction == "W"
    assert f"{icon} {rover.name} turning" in output.out
    assert f"{instruction} [{rover.direction}]" in output.out


def test_move_forwards(capsys):
    icon = defaults["icons"]["move"]["forth_arrow"]
    instruction = defaults["icons"]["move"]["forth_instruction"]

    rover = Rover("test", x=0, y=0, direction="S")
    rover.mars.grid[1][0] = ""

    rover.forwards()
    output = capsys.readouterr()

    assert rover.direction == "S"
    assert rover.position == {"x": 0, "y": 1}
    assert f"{icon} {rover.name} moving {instruction}" in output.out
    assert f'To:   [{rover.position["x"]}, {rover.position["y"]}]' in output.out


def test_move_backwards(capsys):
    icon = defaults["icons"]["move"]["back_arrow"]
    instruction = defaults["icons"]["move"]["back_instruction"]

    rover = Rover("test", x=0, y=0, direction="N")
    rover.mars.grid[1][0] = ""

    rover.backwards()
    output = capsys.readouterr()

    assert rover.direction == "N"
    assert rover.position == {"x": 0, "y": 1}
    assert f"{icon} {rover.name} moving {instruction}" in output.out
    assert f'To:   [{rover.position["x"]}, {rover.position["y"]}]' in output.out


def test_edges(capsys):
    initial_position = {"x": 0, "y": 0}
    message = "Error: Rover can't go over the edges."

    rover = Rover("test", direction="N", **initial_position)

    rover.forwards()
    output = capsys.readouterr()

    assert rover.position == initial_position
    assert message in output.out

    rover = Rover("test", x=0, y=0, direction="W")

    rover.forwards()
    output = capsys.readouterr()

    assert rover.position == initial_position
    assert message in output.out


def test_obstacles(capsys):
    initial_position = {"x": 0, "y": 0}

    rover = Rover("test", direction="E", **initial_position)
    rover.mars.grid[0][1] = chars["rover"]

    rover.forwards()
    output = capsys.readouterr()

    assert rover.position == initial_position
    assert "Rover found [1, 0]" in output.out

    rover.mars.grid[0][1] = chars["obstacle"]

    rover.forwards()
    output = capsys.readouterr()

    assert rover.position == initial_position
    assert "Obstacle found [1, 0]" in output.out


def test_command(capsys):
    command = "rfbl"
    moving_commands = 0
    moving_commands += command.count("f")
    moving_commands += command.count("b")

    rover = Rover("test", x=0, y=0, direction="N")
    rover.mars.grid[0][1] = ""

    rover.command(command)
    rover.done()
    output = capsys.readouterr()

    assert rover.direction == "N"
    assert rover.position == {"x": 0, "y": 0}
    assert isinstance(rover.travel_log, list)
    assert len(rover.travel_log) == moving_commands + 1  # 1 -> Initial log position
    assert (
        f'Final position: {rover.position["x"]}, {rover.position["y"]} [{rover.direction}]'
        in output.out
    )
