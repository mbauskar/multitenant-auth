run-db:
	docker-compose -f local.yaml up postgres-db -d

down-db:
	docker-compose -f local.yaml down postgres-db
