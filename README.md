# hasura-node-monolith-example

Example of a monolithic web application using Hasura GraphQL Engine + Express.js + Next.js

## Local development

Requires [Node.js](https://nodejs.org/en/) >= v14, yarn package manager v1, & docker ( [Docker Desktop](https://docs.docker.com/desktop/) >= v3.2 for Windows & Mac, or [Docker Engine](https://docs.docker.com/engine/) >= v19.03 for Linux).

Copy contents of [`.env.example`](./.env.example) to `.env` and fill in values.

`yarn install`

Start development db with `yarn db` (needs to be running for either of next two tasks)

Start app in dev mode with `yarn dev`, *or* start app in production mode with `yarn start`.

## Production deployment

Use the Dockerfile in the project root
and define the variables documented in [`.env.example`](./.env.example).

With Heroku:

- This project is ready to deploy without code changes (i.e. includes [heroku.yml](./heroku.yml))
- Create app in Heroku web ui, and **before connecting to repo**,
run `heroku stack:set container -a your-app-name-here` (in any directory),
then (in Heroku web ui) connect app to repo (under "Deploy" tab -> "Deployment method").
- Set environment variable `HASURA_GRAPHQL_CLI_ENVIRONMENT=default` as per
[hasura/graphql-engine#4651](https://github.com/hasura/graphql-engine/issues/4651#issuecomment-623414531)
