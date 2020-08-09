# TODO

- network error handling (test offline)
- heroku no insecure sessions!
- try (main-server -> dev-server & prod-server)
- fix repetition of Post fields in queries using a fragment
- "My Votes" view
- info header for index page
- about page
- document
- Github Template repositories let users generate new repositories with the same directory structure and file

- next-auth
    - "User object" passed to `jwt` callback has wrong `id` property
    - log out action doesn't work (doesn't refresh page or session) when page is already on next-auth.callback-url
    - express-compatible handler
    - fix "Edit this page" link
    - add postgres up.sql to docs
        - schema for https://next-auth-docs-git-v3.iaincollins.vercel.app/schemas/postgres#verification-request
- hasura
    - 'Cache-Control': 'max-age=300' in Hasura auth hook response doesn't seem to work.
    Hook is run twice when executing `session` & `posts` graphql queries in parallel.
    - Can still access protected subscription (but not query) after role has been changed to anonymous? (using http auth hook)
    - Computed fields can be accessed by any user without being assigned that permission
- outreach
    - https://github.com/aaronhayes/awesome-hasura
