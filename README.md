# hasura-node-monolith-example

This is a sample fullstack web application incorporating the following:

- [Hasura GraphQL Engine](https://hasura.io/docs/latest/graphql/core/index.html) for a data backend
- Node.js server to handle custom [Hasura Actions](https://hasura.io/docs/latest/graphql/core/actions/index.html)
- Authentication server using [NextAuth.js](https://next-auth.js.org/), handles [Hasura's auth webhook](https://hasura.io/docs/latest/graphql/core/auth/authentication/webhook.html#configuring-webhook-mode) to define client's user id & role for Hasura
- UI frontend using [TypeScript](https://www.typescriptlang.org/), [Next.js](https://nextjs.org/), [Apollo \[GraphQL\] Client](https://www.apollographql.com/docs/react/), and [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- _All rolled into a single dockerized service, for simplified deployment, using [composite-service](https://github.com/zenflow/composite-service)_

#### Check out my [Production Deployment on Heroku](https://hasura-node-monolith-example.herokuapp.com/) *(please be patient while it wakes up)*

## Architecture Notes

- Hasura's auth webhook is used (as opposed to configuring Hasura to read JWT claims directly)
  because it allows the user's role to be dynamic.
  This way (supposing we had more roles in the app) users won't have to sign out & sign in when their role changes.
  We can also easily implement user or token blocklists if required.

## Local development

Requires [Node.js](https://nodejs.org/en/) >= v14, yarn package manager v1, & docker ( [Docker Desktop](https://docs.docker.com/desktop/) >= v3.2 for Windows & Mac, or [Docker Engine](https://docs.docker.com/engine/) >= v19.03 for Linux).

Copy contents of [`.env.example`](./.env.example) to `.env` and optionally fill in values (defaults should work).

`yarn install`

Start development db with `yarn db` (needs to be running for either of next two tasks)

Start app in dev mode with `yarn dev`, *or* start app in production mode with `yarn start`.

When the app is started in dev mode,
the [Hasura Console](https://hasura.io/docs/latest/graphql/core/hasura-cli/hasura_console.html)
(Hasura's web UI) will be opened in a browser tab along with the Next.js web app.
Changes made via the Hasura Console will be reflected in changes in
`hasura/migrations/` & `hasura/metadata/` which can be committed to Git.
These migrations & metadata are applied whenever the app starts, for both dev mode & production,
using Hasura's [cli-migrations image](https://hasura.io/docs/latest/graphql/core/migrations/advanced/auto-apply-migrations.html).

You can execute other [hasura-cli](https://hasura.io/docs/latest/graphql/core/hasura-cli/index.html)
commands with `yarn _hasura`, e.g. `yarn _hasura seed apply` or `yarn _hasura --help`.

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
