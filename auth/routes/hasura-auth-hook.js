const debug = require("debug")("auth:hasura-auth-hook");
const { getToken } = require("next-auth/jwt");

module.exports = {
  match: (req) => req.url === "/hasura-auth-hook",
  async handle(req, res) {
    debug("headers: %o", req.headers);
    const token = await getToken({
      req,
      secret: process.env.AUTH_JWT_SECRET,
    });
    debug("token: %o", token);
    const response = {
      "X-Hasura-Role": token ? "user" : "anonymous",
      "X-Hasura-User-Id": token ? String(token.userId) : undefined,
    };
    res.json(response);
    debug("response: %o", response);
  },
};
