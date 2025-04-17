#!/bin/bash

container_name="keycloak"
realm_name="nutric"

local_dir="./keycloak/"

# Execute the export command inside the Docker container
docker exec -u root -it $container_name bash -c "cp -rp /opt/keycloak/data/h2 /tmp ; /opt/keycloak/bin/kc.sh export --file /opt/keycloak/data/import/export.json --users same_file --realm $realm_name --db dev-file --db-url 'jdbc:h2:file:/tmp/h2/keycloakdb;NON_KEYWORDS=VALUE'"

# Copy the exported file from the Docker container to the local directory
docker cp $container_name:/opt/keycloak/data/import/export.json $local_dir/$realm_name-realm.json

# Remove export file in Docker container
docker exec -u root -it $container_name bash -c "rm -rf /opt/keycloak/data/import/export.json"