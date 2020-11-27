module.exports = {
  'obsChar': 'O',
  'roverChar': 'R',
  'defaults': {
    'x': 0,
    'y': 0,
    'direction': 'N',
    'compass': ['N', 'E', 'S', 'W'],
    'rows': 10,
    'obstacles': 5,
    'validCommands': ['r', 'l', 'f', 'b'],
  },
  'icons': {
    'turn': {
      'forthArrow': '↻',
      'backArrow': '↺',
      'forthInstruction': 'right',
      'backInstruction': 'left',
    },
    'move': {
      'forthArrow': '↑',
      'backArrow': '↓',
      'forthInstruction': 'forwards',
      'backInstruction': 'backwards',
    },
  },
};
