BIN := ./node_modules/.bin/

.PHONY: serve build

serve:
	@echo "Starting HTTP server on port 8000"
	python -m SimpleHTTPServer

build:
	@echo "Building main.js with Browserify"
	$(BIN)browserify -r cylon-mindflex main.js > ./browser.js
