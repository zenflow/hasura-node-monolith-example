const NextAuth = require('next-auth').default
const Providers = require('next-auth/providers')
const { getUserByAccessToken } = require('../../db')

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
  },
}


module.exports = app => {
  const baseUrl = '/api/auth/'
  // Do *not* `app.use(baseUrl, ...)` because this changes `req.url` to be relative to `baseUrl`.
  app.use((req, res, next) => {
    if (!req.url.startsWith(baseUrl)) {
      next()
      return
    }
    // Fill in the "nextauth" [catch all route parameter](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)
    req.query.nextauth = req.url
      .slice(baseUrl.length)
      .replace(/\?.*/, '')
      .split('/')
    try {
      NextAuth(req, res, options)
    } catch (error) {
      next(error)
    }
  })
}
