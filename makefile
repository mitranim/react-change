MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
TEST := test.mjs
DENO := deno run --importmap=test-imports.json

test-w:
	$(DENO) --watch $(TEST)

test:
	$(DENO) $(TEST)

prep: test
