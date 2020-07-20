// TODO: learn & use 'debug' package
const DEBUG = true

const { getToken } = require('next-auth/jwt')
const { getUserByEmail } = require('../db')

const debug = DEBUG
  ? object => setImmediate(() => console.log('GET /hasura-auth-hook debug', JSON.stringify(object, null, 2)))
  : () => {}

module.exports = {
  match: req => req.url === '/hasura-auth-hook',
  async handle (req, res) {
    debug({ headers: req.headers })
    const token = await getToken({
      req,
      secret: process.env.AUTH_JWT_SECRET,
    })
    const user = token && await getUserByEmail(token.email)
    const response = {
      'X-Hasura-Role': user ? (user.is_moderator ? 'moderator' : 'user' ) : 'anonymous',
      'X-Hasura-User-Id': user ? String(user.id) : undefined,
      'Cache-Control': 'max-age=3', // cache for only 3 seconds because demo allows you to change roles
    }
    res.json(response)
    debug({ response })
  }
}
