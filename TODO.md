# TODO

upgrade deps
  - eslint
  - hasura
  - nodejs
  - next-auth
  - eslint ignore graphql-codegen.ts

- websocket demo
- Cypress + cucumber + (for apps using component library) visual snapshots
- test incompatible schemas for different roles
- network error handling (test offline)
- heroku no insecure sessions!
- heroku review apps (with isolated database & unique secret keys)

- react-admin?

- about page
- document
- Github Template repositories let users generate new repositories with the same directory structure and file

- optimize by prerendering pages without auth context
- deal with scenario where user signed out (or signed in) in another tab
    - https://next-auth.js.org/getting-started/client#options
    - https://github.com/apollographql/apollo-cache-persist
    - client.clearStore()
- composite-process
    - colors :p
    - Service output sometimes cut off when crashing & sometimes doesn't even register crash.

        Why does that happen with both Hasura-based images but not with the following?
        ```
        const { startCompositeService } = require("composite-service");
        startCompositeService({
          services: {
            main: {
              command: [
                "docker-run-kill",
                "node:14.5.0",
                "-e",
                "throw new Error('ok')",
              ],
              env: process.env,
              onCrash: () => Promise.reject(new Error("crash")),
            },
          },
        });
        ```

- next-auth
    - "User object" passed to `jwt` callback has wrong `id` property
    - log out action doesn't work (doesn't refresh page or session) when page is already on next-auth.callback-url
    - express-compatible handler
    - add postgres up.sql to docs
        - schema for "verification_requests" table
        - next migration layer can set user.{name,email,photo} to non-nullable, and clean up frontend type assertions (e.g. UserBadge.ts)
- hasura
    - 'Cache-Control': 'max-age=300' in Hasura auth hook response doesn't seem to work.
    Hook is run twice when executing `session` & `posts` graphql queries in parallel.
    - Can still access protected subscription (but not query) after role has been changed to anonymous? (using http auth hook)
    - Computed fields can be accessed by any user without being assigned that permission
- outreach
    - https://github.com/aaronhayes/awesome-hasura
