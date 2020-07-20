const debug = require('debug')('auth:hasura-auth-hook')
const { getToken } = require('next-auth/jwt')
const { Pool } = require('pg')

module.exports = {
  match: req => req.url === '/hasura-auth-hook',
  async handle (req, res) {
    debug('headers: %o', req.headers)
    const token = await getToken({
      req,
      secret: process.env.AUTH_JWT_SECRET,
    })
    debug('token: %o', token)
    const user = token && await getUserByEmail(token.email)
    debug('user: %o', user)
    const response = {
      'X-Hasura-Role': user ? (user.is_moderator ? 'moderator' : 'user' ) : 'anonymous',
      'X-Hasura-User-Id': user ? String(user.id) : undefined,
      'Cache-Control': 'max-age=3', // cache for only 3 seconds because demo allows you to change roles
    }
    res.json(response)
    debug('response: %o', response)
  }
}

const pool = new Pool({
  connectionString: process.env.HASURA_GRAPHQL_DATABASE_URL,
})

async function getUserByEmail (email) {
  const { rows: [user] } = await pool.query({
    text: `
      SELECT id, is_moderator
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    values: [email],
  })
  if (!user) {
    throw new Error(`User not found by email ${JSON.stringify(email)}`)
  }
  return user
}
