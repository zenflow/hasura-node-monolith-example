const { pool } = require("../db");

module.exports = async (req, res) => {
  const { "x-hasura-user-id": user_id } = req.body.session_variables;
  let { post_id, value } = req.body.input;
  value = value === 0 ? 0 : value > 0 ? 1 : -1;
  const {
    rows: [vote],
  } = await pool.query({
    text: `
        INSERT INTO votes (user_id, post_id, value)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, post_id) DO UPDATE SET value = EXCLUDED.value
        RETURNING id
      `,
    values: [user_id, post_id, value],
  });
  return { vote_id: vote.id };
};
