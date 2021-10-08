USER = "$(shell id -u):$(shell id -g)"

install:
	npm ci

lint:
	npx eslint .

start:
	npm start

docker-run:
	docker build -t dialog-dev:latest -f ./Dockerfile.dev .
	docker run -it --rm \
		--env-file ./.env \
		-v $(PWD):/code \
		-v $(PWD)/config/dialogflow.key:/etc/dialogflow.key \
		-v $(PWD)/config/certs/dev.key:/certs/key.pem \
		-v $(PWD)/config/certs/dev.crt:/certs/cert.pem \
		-p 3000:3000 \
		--user=$(USER) \
		-e HOME=$(HOME) \
		-v $(HOME):$(HOME) \
		dialog-dev:latest bash

docker-push:
	docker build -t dialog:latest -f ./Dockerfile.prod .
	docker image tag dialog:latest hardandheavy/dialog:latest
	docker push hardandheavy/dialog:latest