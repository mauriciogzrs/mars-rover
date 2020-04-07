from pytest import raises

from pyc.const import chars, defaults
from pyc.mars import Mars


def test_create(capsys):
    mars = Mars()

    output = capsys.readouterr()

    assert mars.rows == defaults["rows"]
    assert mars.obstacles == defaults["obstacles"]
    assert "Welcome to Mars" in output.out


def test_add_rover(capsys):
    rover_name = "Test"

    mars = Mars()
    mars.grid[defaults["y"]][defaults["x"]] = ""
    rover = mars.add_rover(rover_name)

    output = capsys.readouterr()

    assert rover_name in output.out
    assert rover in mars.rovers
    assert mars.grid[defaults["y"]][defaults["x"]] == chars["rover"]


def test_add_rover_exception():
    rover_name = "Crash"

    mars = Mars()

    mars.grid[defaults["y"]][defaults["x"]] = chars["obstacle"]

    with raises(Exception):
        mars.add_rover(rover_name)


def test_print_grid(capsys):
    mars = Mars()

    mars.print_grid()
    output = capsys.readouterr()

    assert str(mars.grid[0]) in output.out
