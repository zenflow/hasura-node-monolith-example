const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function getUserByAccessToken (accessToken) {
  const { rows } = await pool.query({
    text: `
      SELECT id, is_moderator
      FROM users
      WHERE id IN (SELECT user_id FROM sessions WHERE access_token = $1)
      LIMIT 1
    `,
    values: [accessToken],
  })
  return rows[0]
}

module.exports = {
  getUserByAccessToken,
}
