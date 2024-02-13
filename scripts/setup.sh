# create a env file for docker-compose

# test if the env file exists at the root of the project
if [ ! -f .env ]; then

	touch .env
	echo 'ERPNEXT_VERSION=v15.4.0
DB_PASSWORD=databasePassword
DB_HOST=db
DB_PORT=3306
REDIS_CACHE=redis-cache:6379
REDIS_QUEUE=redis-queue:6379
LETSENCRYPT_EMAIL=system@eventiva.co.uk
SITES=`site1.localhost`' >>.env

fi
