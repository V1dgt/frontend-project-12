make build: # сборка приложения
	npm run build

make start: # запуск приложения
	npx start-server -s ./frontend.dist
