# hasura-node-monolith-example

This is a sample fullstack web application incorporating the following:

- [Hasura GraphQL Engine](https://hasura.io/docs/latest/graphql/core/index.html) for a data backend
- Node.js server to handle custom [GraphQL Engine Actions](https://hasura.io/docs/latest/graphql/core/actions/index.html)
- Authentication server using [NextAuth.js](https://next-auth.js.org/), handles [GraphQL Engine's auth webhook](https://hasura.io/docs/latest/graphql/core/auth/authentication/webhook.html#configuring-webhook-mode) to define client's user id & role for GraphQL Engine
- UI frontend using [Next.js](https://nextjs.org/), [Apollo \[GraphQL\] Client](https://www.apollographql.com/docs/react/), [TypeScript](https://www.typescriptlang.org/), and [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- _All rolled into a single dockerized service, for simplified deployment, using [composite-service](https://github.com/zenflow/composite-service)_

## Architecture Notes

- GraphQL Engine's auth webhook is used (as opposed to configuring GraphQL Engine to read JWT claims directly)
  because it allows the user's role to be dynamic.
  This way (supposing we had more roles in the app) users won't have to sign out & sign in when their role changes.

## Local development

Requires [Node.js](https://nodejs.org/en/) >= v14, yarn package manager v1, & docker ( [Docker Desktop](https://docs.docker.com/desktop/) >= v3.2 for Windows & Mac, or [Docker Engine](https://docs.docker.com/engine/) >= v19.03 for Linux).

Copy contents of [`.env.example`](./.env.example) to `.env` and fill in values.

`yarn install`

Start development db with `yarn db` (needs to be running for either of next two tasks)

Start app in dev mode with `yarn dev`, *or* start app in production mode with `yarn start`.

## Production deployment

Use the Dockerfile in the project root
and define the variables documented in [`.env.example`](./.env.example).

### With Heroku

- This project is ready to deploy without code changes (i.e. includes [heroku.yml](./heroku.yml))
- Heroku Postgres will define the `DATABASE_URL` environment variable. Be sure to copy it to `HASURA_GRAPHQL_ADMIN_SECRET`
- Create app in Heroku web ui, and **before connecting to repo**,
run `heroku stack:set container -a your-app-name-here` (in any unrelated directory),
then (in Heroku web ui) connect app to repo (under "Deploy" tab -> "Deployment method").
- Set environment variable `HASURA_GRAPHQL_CLI_ENVIRONMENT=default` as per
[hasura/graphql-engine#4651](https://github.com/hasura/graphql-engine/issues/4651#issuecomment-623414531)
