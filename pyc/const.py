chars = {
    "obstacle": "O",
    "rover": "R",
}

defaults = {
    "x": 0,
    "y": 0,
    "direction": "N",
    "compass": ["N", "E", "S", "W"],
    "rows": 10,
    "obstacles": 5,
    "valid_commands": ["r", "l", "f", "b"],
}

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
