# TODO

- websockets fast
- test incompatible schemas for different roles
- network error handling (test offline)
- heroku no insecure sessions!
- try (main-server -> dev-server & prod-server)

- about page
- document
- Github Template repositories let users generate new repositories with the same directory structure and file

- optimize by prerendering pages without auth context
- deal with scenario where user signed out (or signed in) in another tab
    - https://next-auth.js.org/getting-started/client#options
    - https://github.com/apollographql/apollo-cache-persist
    - client.clearStore()

- https://github.com/dotansimha/graphql-typed-document-node
    - apollo-client-3 demo broken
        - https://the-guild.dev/blog/typed-document-node
        - https://codesandbox.io/s/github/dotansimha/graphql-typed-document-node/tree/master/examples/apollo-client-3
- next-auth
    - "User object" passed to `jwt` callback has wrong `id` property
    - log out action doesn't work (doesn't refresh page or session) when page is already on next-auth.callback-url
    - express-compatible handler
    - fix "Edit this page" link
    - add postgres up.sql to docs
        - schema for https://next-auth-docs-git-v3.iaincollins.vercel.app/schemas/postgres#verification-request
        - next migration layer can set user.{name,email,photo} to non-nullable, and clean up frontend type assertions (e.g. UserBadge.ts)
- hasura
    - 'Cache-Control': 'max-age=300' in Hasura auth hook response doesn't seem to work.
    Hook is run twice when executing `session` & `posts` graphql queries in parallel.
    - Can still access protected subscription (but not query) after role has been changed to anonymous? (using http auth hook)
    - Computed fields can be accessed by any user without being assigned that permission
- outreach
    - https://github.com/aaronhayes/awesome-hasura
- future
    - in query hooks code, let generic types be implicit, when apollo client supports TypedDocumentNode
