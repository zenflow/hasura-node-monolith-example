require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { PORT, HASURA_GRAPHQL_ADMIN_SECRET } = process.env;

/**
 * @type {import("@gqless/cli").GqlessConfig}
 */
const config = {
  destination: "./gqless/index.ts",
  introspection: {
    endpoint: `http://localhost:${PORT}/v1/graphql`,
    headers: {
      "X-Hasura-Admin-Secret": HASURA_GRAPHQL_ADMIN_SECRET,
      "X-Hasura-Role": "user",
    },
  },
  enumsAsStrings: false,
  react: true,
  preImport: "",
  subscriptions: true,
  scalars: {
    DateTime: "string",
    bigint: "number",
    json: "any",
    smallint: "number",
    timestamptz: "string",
    uuid: "string",
  },
};

module.exports = config;
