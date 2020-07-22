# hasura-node-monolith-example

Example of a monolithic web application using Hasura GraphQL Engine + Express.js + Next.js

## Production deployment notes

See the `docker run` command in `local-prod-server.js`
for how a production docker container can be started,
particularly which environment variables are needed.

You can find comments about the required environment variables in [.env.example](./.env.example).

With Heroku:

- **Before** connecting to repo in Heroku web ui,
run `heroku stack:set container -a heroku-app-name-here` to set the app to work with Docker.
- Set environment variable `HASURA_GRAPHQL_CLI_ENVIRONMENT=default` as per
[hasura/graphql-engine#4651](https://github.com/hasura/graphql-engine/issues/4651#issuecomment-623414531)
