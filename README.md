# hasura-node-monolith-example

Example of a monolithic web application using Hasura GraphQL Engine + Express.js + Next.js

## Local development notes

Requires Node.js v14, yarn package manager v1, Docker

`yarn install`

Copy contents of [`.env.example`](./.env.example) to `.env`, & if on Windows replace "local-only" variable values.
The other values from `.env.example` work for a local dev environment.

Start development db with `yarn db` (needs to be running for next two tasks)

Start app in development mode with `yarn dev`.

*or*

Start app (locally) in production mode with `yarn start`.

## Production deployment notes

Use the Dockerfile in the project root
and define the variables documented in [`.env.example`](./.env.example)
(excluding the local-only section).

With Heroku:

- This project is ready to deploy without code changes (i.e. includes [heroku.yml](./heroku.yml))
- Create app in Heroku web ui, and **before connecting to repo**,
run `heroku stack:set container -a your-app-name-here` (in any directory),
then (in Heroku web ui) connect app to repo (under "Deploy" tab -> "Deployment method").
- Set environment variable `HASURA_GRAPHQL_CLI_ENVIRONMENT=default` as per
[hasura/graphql-engine#4651](https://github.com/hasura/graphql-engine/issues/4651#issuecomment-623414531)
