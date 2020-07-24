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
      'X-Hasura-Role': user ? 'user' : 'anonymous',
      'X-Hasura-User-Id': user ? String(user.id) : undefined,
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
      SELECT id
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    values: [email],
  })
  return user
}
