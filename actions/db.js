const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.HASURA_GRAPHQL_DATABASE_URL,
})

module.exports = { pool }
