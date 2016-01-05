BIN := ./node_modules/.bin/

.PHONY: serve build

build:
	@echo "Building dummyserver.js with Browserify"
	$(BIN)browserify -r ./controller/dummyServer.js > ./browser.js