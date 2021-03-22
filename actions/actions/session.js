module.exports = (req, res) => {
  const {
    "x-hasura-user-id": user_id,
    "x-hasura-role": role,
  } = req.body.session_variables;
  return { user_id, role };
};
