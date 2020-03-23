SHELL=/bin/bash
PATH := .venv/bin:$(PATH)
export RT?=js
export TEST?=./tests


install:
	@( \
		if [ ! -d .venv ]; then python3 -m venv --copies .venv; fi; \
		source .venv/bin/activate; \
		pip install -qU pip; \
		pip install -r requirements.txt; \
		if [ ! -f package-lock.json ] ; then npm install; \
		else npm -c install ; fi; \
	)

start: start-${RT}

lint: lint-${RT}

lint-fix: lint-fix-${RT}

tests: tests-${RT}

eval: lint tests


# Node commands
start-js:
	@npm start

lint-js:
	@npm run lint;

lint-fix-js:
	@npm run lint-fix;

tests-js:
	@npm test;


# Python commands
start-py:
	@python ./py/app.py

black:
	@black . --exclude '.venv|build|target|dist' --check;

isort:
	@isort --recursive --check-only;

autoflake:
	@autoflake --recursive --exclude .venv --check --remove-all-unused-imports --remove-unused-variables ./ ;

lint-py: autoflake isort black

lint-fix-py:
	@( \
		autoflake --recursive --exclude .venv --in-place --remove-all-unused-imports ./ ; \
		isort --recursive --apply; \
		black . --exclude '.venv|build|target|dist'; \
	)

tests-py:
	@python -m pytest --cov=src --color=yes \
		--cov-config=./tests/py/.coveragerc \
		--cov-report term \
		--cov-report html:coverage \
		--junit-xml=junit.xml \
		--rootdir=. $${TEST};


.PHONY: tests
