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

# generate schema for testing
FILE_PATH="./prisma/schema.prisma"
OUTPUT_FILE_PATH="./prisma/testing.schema.prisma"
rm $OUTPUT_FILE_PATH
cp $FILE_PATH $OUTPUT_FILE_PATH
sed -i 's/DATABASE_URL/TESTING_DATABASE_URL/g' $OUTPUT_FILE_PATH

# make sure database is ready 
# exits script if database times out
docker-compose up -d
check_command npx prisma db push --schema=./prisma/testing.schema.prisma

vitest