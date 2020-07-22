FROM hasura/graphql-engine:v1.3.0.cli-migrations-v2

COPY metadata /hasura-metadata/
COPY migrations /hasura-migrations/

CMD graphql-engine serve --server-port $PORT
