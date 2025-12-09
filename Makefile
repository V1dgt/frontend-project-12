install:
	npm ci
	make -C frontend install

build:
	make -C frontend build

start: build
	npx start-server -s ./frontend/dist

develop:
	make -C frontend start & npx start-server -s ./frontend/dist

clean:
	rm -rf frontend/dist
