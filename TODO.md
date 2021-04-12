# TODO

- (re-)implement Hasura cli migrations & create SKIP_MIGRATIONS env var for speeding up startup in both production & local development
- rename "session" query action -> "auth"
- report back on Hasura issue
- https://github.com/aaronhayes/awesome-hasura
- deal with scenario where user signed out (or signed in) in another tab
- fix PostsList pagination to not show a duplicate when user clicks "show more" right after another user inserted a post
- Cypress + cucumber + (for apps using component library) visual snapshots
- heroku no insecure sessions!
- heroku review apps (with isolated database & unique secret keys)
- hasura
    - 'Cache-Control': 'max-age=300' in Hasura auth hook response doesn't seem to work.
    Hook is run twice when executing `session` & `posts` graphql queries in parallel.
    - Can still access protected subscription (but not query) after role has been changed to anonymous? (using http auth hook)
    - Computed fields can be accessed by any user without being assigned that permission
