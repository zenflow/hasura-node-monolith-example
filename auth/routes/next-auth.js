const debug = require("debug")("auth:next-auth");
const rescue = require("express-rescue");
const NextAuth = require("next-auth").default;
const Providers = require("next-auth/providers");
const { pool } = require("../db");

const baseUrl = "/api/auth/";

module.exports = rescue(async (req, res, next) => {
  if (!req.url.startsWith(baseUrl)) {
    return next();
  }
  // Fill in the "nextauth" [catch all route parameter](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)
  req.query.nextauth = req.url // start with request url
    .slice(baseUrl.length) // make relative to baseUrl
    .replace(/\?.*/, "") // remove query part, use only path part
    .split("/"); // as array of strings
  NextAuth(req, res, options);
});

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.HASURA_GRAPHQL_DATABASE_URL,
  session: {
    jwt: true,
  },
  secret: process.env.AUTH_JWT_SECRET,
  callbacks: {
    async jwt(token, user) {
      if (user) {
        // TODO: replace next line with `token.id = user.id` once `user.id` is fixed
        token.userId = await getUserIdByEmail(user.email);
      }
      debug("jwt token: %o", token);
      return token;
    },
  },
};

async function getUserIdByEmail(email) {
  const { rows } = await pool.query({
    text: `
      SELECT id
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    values: [email],
  });
  return rows[0]?.id;
}
