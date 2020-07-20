const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.HASURA_GRAPHQL_DATABASE_URL,
})

async function getUserByEmail (email) {
  const { rows } = await pool.query({
    text: `
      SELECT id, is_moderator
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    values: [email],
  })
  return rows[0]
}

module.exports = {
  getUserByEmail,
}
