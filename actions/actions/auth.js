module.exports = (req, res) => {
  const {
    'x-hasura-user-id': user_id,
    'x-hasura-role': role,
  } = req.body.session_variables
  res.json({ user_id, role })
}
