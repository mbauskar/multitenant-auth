#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

echo "migrate all schema"
python develop.py migrate_schemas

echo "initialize the application"
python develop.py runscript initialise

echo "Launching the application....."
exec python develop.py runserver 0:8000
