# hasura-node-monolith-example

Example of a monolithic web application using Hasura GraphQL Engine + Express.js + Next.js

## TODO
- replace `useSession` with `useCurrentUser`, using gql connection only (no GET /api/auth/session)
- ui integration
- not hard-code 'http://docker-machine:8080' in apolloClient.js
- FAIL if session token is invalid
- use composite-service only for production mode, not development mode, for better/specialized control (npm package `concurrently`, or `gulp`)
- next-auth
    - as per [the "Note" here](https://next-auth-docs-git-v3.iaincollins.vercel.app/configuration/databases#what-is-a-database-used-for)
        - > If you do specify a database then database sessions are be enabled by default, unless you explicitly enable JSON Web Tokens for sessions by passing the option sessions { jwt: true }
        - when: `options.database && options.session.jwt === true`
        - (simple: jwt is not used at all)
        - expected: next-auth.session-token cookie is (same as when not using database)
        JWT containing publicly decryptable (TODO: that intentional?) session data
        (should be sufficient to return a session without accessing database).
        - actual: next-auth.session-token cookie is 64-character token/key matching `user.session_token`.
        next-auth.session-token is now just a reference to entity in database.
        requests to `GET /api/auth/session` require database access (TODO: make sure)
    - how to stop extra /api/auth/session request when rehydrating client-side
    - log out action doesn't work, doesn't refresh page or session
    - express-compatible handler
    - fix "Edit this page" link
    - add postgres up.sql to docs
        - schema for https://next-auth-docs-git-v3.iaincollins.vercel.app/schemas/postgres#verification-request
- hasura
    - not passing 'Cookie' header, violating docs:
    hasura.io/docs/1.0/graphql/manual/auth/authentication/webhook.html#get-request
    - Can still access protected subscription (but not query) after role has been changed to anonymous? (using http auth hook)
- next.js with-apollo
    - extract queries from pre-rendered react element tree
