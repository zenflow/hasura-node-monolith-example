const NextAuth = require('next-auth').default
const Providers = require('next-auth/providers')
const { getUserByAccessToken } = require('../db')

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

const baseUrl = '/api/auth/'
module.exports = {
  match: req => req.url.startsWith(baseUrl),
  handle (req, res) {
    // Fill in the "nextauth" [catch all route parameter](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)
    req.query.nextauth = req.url
      .slice(baseUrl.length)
      .replace(/\?.*/, '')
      .split('/')
    NextAuth(req, res, options)
  }
}
