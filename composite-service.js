const { startCompositeService } = require("composite-service");
const { configureHttpGateway } = require("composite-service-http-gateway");

const [authPort, actionsPort, hasuraPort, webPort] = [8000, 8001, 8002, 8003];

const dev = process.env.NODE_ENV !== "production";
const [, , hasuraImageName, hasuraContainerName] = process.argv;

if (dev) {
  require("assert").ok(hasuraImageName && hasuraContainerName);
  // Before starting, make sure the last container created by this script has been removed
  require("child_process").spawnSync("docker", [
    "rm",
    "--force",
    hasuraContainerName,
  ]);
  require("dotenv").config();
}

const {
  PATH,
  PORT,
  HASURA_GRAPHQL_DATABASE_URL,
  NODE_PG_SSL_NO_VERIFY,
  HASURA_GRAPHQL_ADMIN_SECRET,
  NEXTAUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_JWT_SECRET,
} = process.env;

const nodePostgresEnv = {
  HASURA_GRAPHQL_DATABASE_URL,
  ...(NODE_PG_SSL_NO_VERIFY === "true" && { PGSSLMODE: "no-verify" }),
};

const maybeDockerHost = dev ? "host.docker.internal" : "localhost";
const hasuraEnv = {
  HASURA_GRAPHQL_SERVER_PORT: hasuraPort,
  HASURA_GRAPHQL_DATABASE_URL,
  HASURA_GRAPHQL_ADMIN_SECRET,
  HASURA_GRAPHQL_AUTH_HOOK: `http://${maybeDockerHost}:${authPort}/hasura-auth-hook`,
  ACTIONS_URL: `http://${maybeDockerHost}:${actionsPort}`,
};

const HASURA_GRAPHQL_ENDPOINT = `http://localhost:${hasuraPort}`;

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
        ...nodePostgresEnv,
        NEXTAUTH_URL,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        AUTH_JWT_SECRET,
        DEBUG: dev ? "auth:*" : undefined,
      },
      ready: ctx => ctx.onceTcpPortUsed(authPort),
    },
    actions: {
      cwd: `${__dirname}/actions`,
      command: `${dev ? "nodemon" : "node"} server.js`,
      env: {
        ...(dev ? { PATH } : {}), // nodemon needs PATH env var
        PORT: actionsPort,
        ...nodePostgresEnv,
      },
      ready: ctx => ctx.onceTcpPortUsed(actionsPort),
    },
    hasura: {
      dependencies: ["auth", "actions"],
      command: dev
        ? `docker-run-kill
            --name ${hasuraContainerName}
            ${Object.keys(hasuraEnv)
              .map(key => `--env ${key}`)
              .join(" ")}
            --publish ${hasuraPort}:${hasuraPort}
            ${
              // workaround for https://github.com/docker/for-linux/issues/264
              dev && !["win32", "cygwin", "darwin"].includes(process.platform)
                ? "--add-host=host.docker.internal:host-gateway"
                : ""
            }
            ${hasuraImageName}`
        : `graphql-engine serve`,
      env: dev ? { ...process.env, ...hasuraEnv } : hasuraEnv,
      ready: async ctx => {
        // TODO: ctx.onceUrlReady(`${HASURA_GRAPHQL_ENDPOINT}/healthz`)
        let isTempServer = false;
        ctx
          .onceOutputLineIncludes(
            "starting graphql engine temporarily on port ",
          )
          .then(() => (isTempServer = true));
        const serverStarted = () =>
          ctx.onceOutputLineIncludes('"message":"starting API server"');

        await serverStarted();
        if (isTempServer) await serverStarted();
      },
    },
    web: {
      dependencies: ["hasura"],
      cwd: `${__dirname}/web`,
      command: `${nextJsBin} ${dev ? "dev" : "start"} --port ${webPort}`,
      env: {
        HASURA_GRAPHQL_ENDPOINT,
      },
      ready: ctx => ctx.onceTcpPortUsed(webPort),
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
