# Mars Rover

Ironhack's WebDev Mars Rover prework lab.

This repo is meant for reference, and as a guide, ***not*** *for copy/pasting the actual code*.

Hopefully this will help some students resolve some doubts.

> It's been a while since I've developed in JS/Node, so I started this project with Python, and then I just "translated" my code to JS. There's a lot of room for improvement in any language. **Please, contribute!**

## Getting started

Make sure you have installed:
- [Python 3.7+](https://www.python.org/downloads/)
- [Node 10+](https://nodejs.org/en/download/)

### :information_source: Important

Even though I started the project based on Python, I "defaulted" all the following commands to work with Node.

To run with Python, after any `make` command, add the *RUNTIME* variable `RT`:
```sh
make [command] RT=py
```

## Installation

Setup your workspace:
```sh
git clone https://github.com/mauriciogzrs/mars-rover.git
cd mars-rover
make install
```

## Run app

To run the app:
```sh
make start
```

To run on the browser console:
```sh
make start RT=browser
```

## Testing

> :construction: Unit tests are still needed so, for now this command will output an error because none are found. More will be added in the future.

To run the tests, execute:
```sh
make tests
```

## Validations

You can check the code's validations:

*JavaScript*
- `eslint`: find problematic patterns or style guidelines

*Python*
- `black`: style check
- `autoflake`: check unused imports and variables
- `isort`: dependency import order

Some of the lint errors can be fixed automatically through:
```sh
make lint-fix
```

To check both lint and testing, run:
```sh
make validate
```

### Maintainers
- Mauricio González Robles

### Contact
- Email: mauricio.gzrs@gmail.com
- Ironhack Slack: @mao
