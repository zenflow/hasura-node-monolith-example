const { spawnSync } = require("child_process");
const {
  startCompositeService,
  onceTcpPortUsed,
  configureHttpGateway,
} = require("composite-service");

const {
  NODE_ENV,
  DOCKER_ENGINE_HOST,
  DOCKER_HOST_HOST,
  PORT,
  HASURA_GRAPHQL_DATABASE_URL,
  HASURA_GRAPHQL_ADMIN_SECRET,
  DEBUG,
  NEXTAUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_JWT_SECRET,
  START_HASURA_CONSOLE,
} = process.env;

const dev = NODE_ENV !== "production";

if (dev) {
  // Kill docker container in case it didn't receive a ctrl+c and therefore continues to run even though `docker run` exited
  spawnSync("docker", ["kill", "hnme_hasura_1"], { stdio: "inherit" });
}

const [authPort, actionsPort, hasuraPort, webPort] = [8080, 8081, 8082, 8083];

const hasuraHost = dev ? DOCKER_ENGINE_HOST : "localhost";
const HASURA_URL = `http://${hasuraHost}:${hasuraPort}`;

startCompositeService({
  services: {
    auth: {
      cwd: `${__dirname}/auth`,
      command: `${dev ? "nodemon" : "node"} server.js`,
      env: {
        ...(dev ? process.env : {}), // Includes some env var(s) needed for nodemon to work properly
        PORT: authPort,
        HASURA_GRAPHQL_DATABASE_URL,
        DEBUG,
        NEXTAUTH_URL,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        AUTH_JWT_SECRET,
      },
      ready: (ctx) => onceTcpPortUsed(authPort),
    },
    actions: {
      cwd: `${__dirname}/actions`,
      command: `${dev ? "nodemon" : "node"} server.js`,
      env: {
        ...(dev ? process.env : {}), // Includes some env var(s) needed for nodemon to work properly
        PORT: actionsPort,
        HASURA_GRAPHQL_DATABASE_URL,
      },
      ready: (ctx) => onceTcpPortUsed(actionsPort),
    },
    hasura: {
      dependencies: ["auth", "actions"],
      command: dev // --tty
        ? `docker run
            --name hnme_hasura_1
            --env HASURA_GRAPHQL_SERVER_PORT
            --env HASURA_GRAPHQL_DATABASE_URL
            --env HASURA_GRAPHQL_ADMIN_SECRET
            --env HASURA_GRAPHQL_AUTH_HOOK
            --env ACTIONS_URL
            --publish ${hasuraPort}:${hasuraPort}
            --rm
            --interactive
            hnme_hasura`
        : `graphql-engine serve`,
      env: {
        ...process.env, // Includes env vars needed to run docker
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
      ready: (ctx) => onceTcpPortUsed(hasuraPort, hasuraHost),
    },
    web: {
      dependencies: ["hasura"],
      cwd: `${__dirname}/web`,
      /* Note we are unable to call the 'next' command directly here since
        the production docker image from scratch doesn't seem to let us execute shell scripts.
        E.g. calling `/path/to/node_modules/.bin/next start` will error saying the `next` file is not found
        and `RUN chmod a+x /path/to/node_modules/.bin/next` does not seem to help. */
      command: `node node_modules/next/dist/bin/next ${
        dev ? "dev" : "start"
      } --port ${webPort}`,
      env: {
        HASURA_URL,
      },
      ready: (ctx) => onceTcpPortUsed(webPort),
    },
    gateway: configureHttpGateway({
      dependencies: ["hasura", "auth", "web"],
      port: PORT,
      proxies: [
        ["/api/auth", { target: `http://localhost:${authPort}` }],
        [
          ["/v1", "/v1alpha1", "/v1beta1", "/healthz"],
          { target: HASURA_URL, ws: true },
        ],
        ["/", { target: `http://localhost:${webPort}` }],
      ],
    }),
    console: START_HASURA_CONSOLE === "true" && {
      dependencies: ["hasura"],
      cwd: `${__dirname}/hasura`,
      command: `
        hasura console
          --endpoint ${HASURA_URL}
          --admin-secret ${HASURA_GRAPHQL_ADMIN_SECRET}
      `,
    },
  },
});
