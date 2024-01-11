#!/usr/bin/env bash
# checks if script is s
function check_command() {
    "$@"
    status=$?
    if [ $status -ne 0 ]; then
        exit $status
    fi
    return $status
}

DIR="$(cd "$(dirname "$0")" && pwd)"


# make sure database is ready 
# exits script if database times out
docker-compose up -d
check_command npx prisma db push

./node_modules/.bin/nodemon ./src/index.ts