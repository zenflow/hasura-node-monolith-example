const { spawnSync } = require("child_process");
const {
  startCompositeService,
  onceTcpPortUsed,
  configureHttpGateway,
} = require("composite-service");

const dev = process.env.NODE_ENV !== "production";

if (dev) {
  // Load environment variables from local `.env` file
  require("dotenv-expand")(require("dotenv").config());

  // Before starting, make sure the last container created by this script has been removed
  spawnSync("docker", ["rm", "--force", "hnme_hasura_1"]);
}

const {
  PATH,
  DOCKER_ENGINE_HOST,
  DOCKER_HOST_HOST,
  PORT,
  HASURA_GRAPHQL_DATABASE_URL,
  HASURA_GRAPHQL_ADMIN_SECRET,
  NEXTAUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_JWT_SECRET,
} = process.env;

const [authPort, actionsPort, hasuraPort, webPort] = [8080, 8081, 8082, 8083];

const hasuraHost = dev ? DOCKER_ENGINE_HOST : "localhost";
const HASURA_GRAPHQL_ENDPOINT = `http://${hasuraHost}:${hasuraPort}`;

/* Note we are unable to call the 'next' command directly since the production docker image from scratch
doesn't seem to let us execute shell scripts. E.g. calling `/path/to/node_modules/.bin/next start` will error
saying the `next` file is not found and `RUN chmod a+x /path/to/node_modules/.bin/next` does not seem to help. */
const nextJsBin = "node node_modules/next/dist/bin/next";

startCompositeService({
  gracefulShutdown: !dev,
  windowsCtrlCShutdown: true,
  services: {
    auth: {
      cwd: `${__dirname}/auth`,
      command: `${dev ? "nodemon" : "node"} server.js`,
      env: {
        ...(dev ? { PATH } : {}), // nodemon needs PATH env var
        PORT: authPort,
        HASURA_GRAPHQL_DATABASE_URL,
        NEXTAUTH_URL,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        AUTH_JWT_SECRET,
        DEBUG: dev ? "auth:*" : undefined,
      },
      ready: ctx => onceTcpPortUsed(authPort),
    },
    actions: {
      cwd: `${__dirname}/actions`,
      command: `${dev ? "nodemon" : "node"} server.js`,
      env: {
        ...(dev ? { PATH } : {}), // nodemon needs PATH env var
        PORT: actionsPort,
        HASURA_GRAPHQL_DATABASE_URL,
      },
      ready: ctx => onceTcpPortUsed(actionsPort),
    },
    hasura: {
      dependencies: ["auth", "actions"],
      command: dev
        ? `docker-run-kill
            --name hnme_hasura_1
            --env HASURA_GRAPHQL_SERVER_PORT
            --env HASURA_GRAPHQL_DATABASE_URL
            --env HASURA_GRAPHQL_ADMIN_SECRET
            --env HASURA_GRAPHQL_AUTH_HOOK
            --env ACTIONS_URL
            --publish ${hasuraPort}:${hasuraPort}
            hnme_hasura`
        : `graphql-engine serve`,
      env: {
        ...(dev ? process.env : {}), // Includes some env vars needed to run docker
        HASURA_GRAPHQL_SERVER_PORT: hasuraPort,
        HASURA_GRAPHQL_DATABASE_URL,
        HASURA_GRAPHQL_ADMIN_SECRET,
        HASURA_GRAPHQL_AUTH_HOOK: `http://${
          dev ? DOCKER_HOST_HOST : "localhost"
        }:${authPort}/hasura-auth-hook`,
        ACTIONS_URL: `http://${
          dev ? DOCKER_HOST_HOST : "localhost"
        }:${actionsPort}`,
      },
      ready: ctx => onceTcpPortUsed(hasuraPort, hasuraHost),
    },
    web: {
      dependencies: ["hasura"],
      cwd: `${__dirname}/web`,
      command: `${nextJsBin} ${dev ? "dev" : "start"} --port ${webPort}`,
      env: {
        HASURA_GRAPHQL_ENDPOINT,
      },
      ready: ctx => onceTcpPortUsed(webPort),
    },
    gateway: configureHttpGateway({
      dependencies: ["hasura", "auth", "web"],
      port: PORT,
      proxies: [
        ["/api/auth", { target: `http://localhost:${authPort}` }],
        [
          ["/v1", "/v1alpha1", "/v1beta1", "/healthz"],
          { target: HASURA_GRAPHQL_ENDPOINT, ws: true },
        ],
        ["/", { target: `http://localhost:${webPort}` }],
      ],
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
