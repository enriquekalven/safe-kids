.PHONY: test mutation forbid-fabrication preview verify all

PYTHON ?= python3
PORT ?= 8080

all: verify

test:
	$(PYTHON) -m unittest discover -s tests -v

mutation:
	$(PYTHON) tools/sim/mutation_check.py

forbid-fabrication:
	$(PYTHON) tools/ci/forbid_fabrication.py

verify: forbid-fabrication test mutation

preview:
	$(PYTHON) -m http.server $(PORT) --bind 127.0.0.1 --directory public
