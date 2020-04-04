from pyc.rover import Rover

rover = Rover("test")

def test_create_rover():
    assert rover.name == "test"
    assert rover.direction == "N"
    assert rover.position == {"x": 0, "y":0}

def test_turn_right(capsys):
    rover.direction = "N"

    rover.right()
    output = capsys.readouterr()

    assert rover.direction == "E"
    assert f"↻ {rover.name} turning right [{rover.direction}" in output.out

def test_turn_left(capsys):
    rover.direction = "N"

    rover.left()
    output = capsys.readouterr()

    assert rover.direction == "W"
    assert f"↺ {rover.name} turning left [{rover.direction}]"  in output.out

def test_move_forwards(capsys):
    rover.direction = "S"
    rover.position = {"x": 0, "y": 0}
    rover.mars.grid[1][0] = ""

    rover.forwards()
    output = capsys.readouterr()

    assert rover.direction == "S"
    assert rover.position == {"x": 0, "y": 1}
    assert f"↑ {rover.name} moving forward" in output.out
    assert f'To:   [{rover.position["x"]}, {rover.position["y"]}]' in output.out

def test_move_backwards(capsys):
    rover.direction = "N"
    rover.position = {"x": 0, "y": 0}
    rover.mars.grid[1][0] = ""

    rover.backwards()
    output = capsys.readouterr()

    assert rover.direction == "N"
    assert rover.position == {"x": 0, "y": 1}
    assert f"↓ {rover.name} moving backwards" in output.out
    assert f'To:   [{rover.position["x"]}, {rover.position["y"]}]' in output.out

def test_edges(capsys):
    rover.direction = "N"
    rover.position = {"x": 0, "y": 0}
    message = "Error: Rover can't go over the edges."

    rover.forwards()
    output = capsys.readouterr()

    assert rover.position == {"x": 0, "y": 0}
    assert message in output.out

    rover.direction = "W"

    rover.forwards()
    output = capsys.readouterr()

    assert rover.position == {"x": 0, "y": 0}
    assert message in output.out

def test_obstacles(capsys):
    rover.direction = "E"
    rover.position = {"x": 0, "y": 0}
    rover.mars.grid[0][1] = "R"

    rover.forwards()
    output = capsys.readouterr()

    assert rover.position == {"x": 0, "y": 0}
    assert "Rover found [1, 0]" in output.out

    rover.direction = "E"
    rover.mars.grid[0][1] = "O"

    rover.forwards()
    output = capsys.readouterr()

    assert rover.position == {"x": 0, "y": 0}
    assert "Obstacle found [1, 0]" in output.out

def test_command(capsys):
    rover.direction = "N"
    rover.position = {"x": 0, "y": 0}
    rover.mars.grid[0][1] = ""

    rover.command("rfbl")
    rover.done()
    output = capsys.readouterr()

    assert rover.direction == "N"
    assert rover.position == {"x": 0, "y": 0}
    assert f'{rover.position["x"]}, {rover.position["y"]} [{rover.direction}]' in output.out
