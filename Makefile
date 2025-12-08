make install: # установка зависимостей
	npm ci

make build: # сборка приложения
	rm -rf frontend/dist
	npm run build

make start: # запуск приложения
	npx start-server -s ./frontend.dist
