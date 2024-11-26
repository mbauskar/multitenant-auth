build:
	docker-compose -f local.yaml build --pogress=plain
	docker image prune -f

run:
	docker-compose -f local.yaml up

down:
	docker-compose -f local.yaml down

run-app:
	docker-compose -f local.yaml up app -d

down-app:
	docker-compose -f local.yaml down app

run-db:
	docker-compose -f local.yaml up postgres-db -d

down-db:
	docker-compose -f local.yaml down postgres-db
