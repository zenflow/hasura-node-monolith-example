const path = require("path");
const { startCompositeService } = require("composite-service");
const { configureHttpGateway } = require("composite-service-http-gateway");

const authPort = 8000;
const actionsPort = 8001;
const hasuraPort = 8002;
const webPort = 8003;

const dev = process.env.NODE_ENV !== "production";
const [, , hasuraContainerName] = process.argv;

if (dev) {
  // Before starting, make sure the last container created by this script has been removed
  require("child_process").spawnSync("docker", ["rm", "--force", hasuraContainerName]);
  require("dotenv").config();
}

const {
  PATH,
  NODE_ENV,
  DEBUG,
  HASURA_GRAPHQL_ENABLED_LOG_TYPES,
  PORT,
  HASURA_GRAPHQL_DATABASE_URL,
  NODE_PG_SSL_NO_VERIFY,
  HASURA_GRAPHQL_ADMIN_SECRET,
  NEXTAUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_JWT_SECRET,
} = process.env;

const commonBackendEnv = {
  ...(dev && { PATH }), // nodemon needs this
  NODE_ENV,
  DEBUG,
  DATABASE_URL: dev
    ? HASURA_GRAPHQL_DATABASE_URL.replace("@host.docker.internal:", "@localhost:")
    : HASURA_GRAPHQL_DATABASE_URL,
  ...(NODE_PG_SSL_NO_VERIFY === "true" && { PGSSLMODE: "no-verify" }),
};

const maybeDockerHost = dev ? "host.docker.internal" : "localhost";
const hasuraEnv = {
  HASURA_GRAPHQL_ENABLED_LOG_TYPES,
  HASURA_GRAPHQL_SERVER_PORT: hasuraPort,
  HASURA_GRAPHQL_DATABASE_URL,
  HASURA_GRAPHQL_ADMIN_SECRET,
  HASURA_GRAPHQL_AUTH_HOOK: `http://${maybeDockerHost}:${authPort}/hasura-auth-hook`,
  ACTIONS_URL: `http://${maybeDockerHost}:${actionsPort}`,
};

const HASURA_GRAPHQL_ENDPOINT = `http://localhost:${hasuraPort}`;

const nextJsBin = `node ${__dirname}/node_modules/next/dist/bin/next`;
// node scripts can't be executed directly in the production Docker container for some reason

startCompositeService({
  windowsCtrlCShutdown: true,
  services: {
    auth: {
      cwd: `${__dirname}/auth`,
      command: `${dev ? "nodemon" : "node"} server.js`,
      env: {
        ...commonBackendEnv,
        PORT: authPort,
        NEXTAUTH_URL,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        AUTH_JWT_SECRET,
      },
      ready: (ctx) => ctx.onceTcpPortUsed(authPort),
    },
    actions: {
      cwd: `${__dirname}/actions`,
      command: `${dev ? "nodemon" : "node"} server.js`,
      env: {
        ...commonBackendEnv,
        PORT: actionsPort,
      },
      ready: (ctx) => ctx.onceTcpPortUsed(actionsPort),
    },
    hasura: {
      dependencies: ["auth", "actions"],
      command: dev
        ? `docker-run-kill
            --name ${hasuraContainerName}
            ${Object.keys(hasuraEnv)
              .map((key) => `--env ${key}`)
              .join(" ")}
            --publish ${hasuraPort}:${hasuraPort}
            ${
              // workaround for https://github.com/docker/for-linux/issues/264
              dev && !["win32", "cygwin", "darwin"].includes(process.platform)
                ? "--add-host=host.docker.internal:host-gateway"
                : ""
            }
            -v ${path.join(__dirname, "hasura", "metadata")}:/hasura-metadata
            -v ${path.join(__dirname, "hasura", "migrations")}:/hasura-migrations
            hasura/graphql-engine:v2.0.0-alpha.10.cli-migrations-v3`
        : `graphql-engine serve`,
      env: dev ? { ...process.env, ...hasuraEnv } : hasuraEnv,
      ready: (ctx) => ctx.onceHttpOk({ url: `${HASURA_GRAPHQL_ENDPOINT}/healthz` }),
    },
    web: {
      dependencies: ["hasura"],
      cwd: `${__dirname}/web`,
      command: `${nextJsBin} ${dev ? "dev" : "start"} --port ${webPort}`,
      env: {
        HASURA_GRAPHQL_ENDPOINT,
      },
      ready: (ctx) => ctx.onceTcpPortUsed(webPort),
    },
    gateway: configureHttpGateway({
      dependencies: ["hasura", "auth", "web"],
      port: PORT,
      routes: {
        "/api/auth": { proxy: { target: `http://localhost:${authPort}` } },
        "/v1": { proxy: { target: HASURA_GRAPHQL_ENDPOINT } },
        "/v1alpha1": { proxy: { target: HASURA_GRAPHQL_ENDPOINT } },
        "/v1beta1": { proxy: { target: HASURA_GRAPHQL_ENDPOINT } },
        "/healthz": { proxy: { target: HASURA_GRAPHQL_ENDPOINT } },
        "/": { proxy: { target: `http://localhost:${webPort}` } },
      },
      onReady: () => {
        if (dev) require("opener")(`http://localhost:${PORT}/`);
      },
    }),

    // services for dev-time only
    "hasura-console": dev && {
      dependencies: ["hasura"],
      cwd: `${__dirname}/hasura`,
      command: `hasura console --skip-update-check`,
      env: {
        HASURA_GRAPHQL_ENDPOINT,
        HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
    "graphql-codegen": dev && {
      dependencies: ["hasura"],
      cwd: `${__dirname}/web`,
      command: `graphql-codegen --watch`,
      env: {
        HASURA_GRAPHQL_ENDPOINT,
        HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
});
