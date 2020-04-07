from pyc.const import chars, defaults
from pyc.grid import Grid


def test_create():
    map_ = Grid()

    obs_count = 0
    for n in range(map_.rows):
        obs_count += map_.grid[n].count(chars["obstacle"])

    assert map_.rows == defaults["rows"]
    assert map_.obstacles == defaults["obstacles"]
    assert map_.max_obstacles == int(defaults["rows"] ** 2 / 2)
    assert map_.obstacles == obs_count


def test_over_obstacles(capsys):
    rows = 5
    obs = int(rows ** 2 / 2)

    map_ = Grid(rows=rows, obstacles=obs + 1)
    output = capsys.readouterr()

    assert map_.max_obstacles == obs
    assert "Too many obstacles" in output.out
