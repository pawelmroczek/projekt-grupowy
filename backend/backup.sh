#!/bin/bash

# Parametry
CONTAINER_NAME="fashion-database"
DATABASE_NAME="fashion"
ROOT_PASSWORD="password"
OUTPUT_PATH="./fashionassistant/src/main/resources"
OUTPUT_FILE="${OUTPUT_PATH}/dump.sql"

if ! docker ps --filter "name=${CONTAINER_NAME}" --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
  echo "Kontener ${CONTAINER_NAME} nie działa lub nie istnieje."
  exit 1
fi

echo "Znaleziono kontener: $CONTAINER_NAME"

mkdir -p "$OUTPUT_PATH"

docker exec -i "$CONTAINER_NAME" mysqldump -u root -p"$ROOT_PASSWORD" "$DATABASE_NAME" > "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
  echo "Zrzut bazy danych został zapisany w: $OUTPUT_FILE"
else
  echo "Wystąpił błąd podczas wykonywania zrzutu bazy danych."
  exit 2
fi