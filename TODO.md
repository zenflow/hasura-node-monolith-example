# TODO

- Cypress + cucumber + (for apps using component library) visual snapshots
- heroku no insecure sessions!
- heroku review apps (with isolated database & unique secret keys)

- react-admin?

- deal with scenario where user signed out (or signed in) in another tab
    - https://next-auth.js.org/getting-started/client#options
    - https://github.com/apollographql/apollo-cache-persist
    - client.clearStore()
- next-auth
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
