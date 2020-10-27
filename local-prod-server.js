/**
 * Problem: Google OAuth2 signin fails when running app on host other than `localhost`.
 * Docker for Windows exposes ports on a host that is not `localhost`,
 * so when running the app on Windows in production mode we have a problem signing in.
 * Solution: This script. Use composite-service (again) to run app & reverse proxy from docker machine to localhost.
 * If you want to run the app locally on Linux or Max in production mode, you probably don't need this script;
 *    you can run simply build the Dockerfile, start a container with `docker run` and access the app on localhost.
 */

const { spawnSync } = require("child_process");
const {
  startCompositeService,
  onceTcpPortUsed,
  configureHttpGateway,
} = require("composite-service");

// Load environment variables from local `.env` file
require("dotenv-expand")(require("dotenv").config());

// Before starting, make sure the last container created by this script has been removed
spawnSync("docker", ["rm", "--force", "hnme_app_1"]);

const { PORT, DOCKER_ENGINE_HOST } = process.env;

startCompositeService({
  windowsCtrlCShutdown: true,
  services: {
    app: {
      command: `
        docker-run-kill
          --name hnme_app_1
          --signal SIGINT
          --publish ${PORT}:${PORT}
          --env PORT
          --env HASURA_GRAPHQL_DATABASE_URL
          --env HASURA_GRAPHQL_ADMIN_SECRET
          --env NEXTAUTH_URL
          --env GOOGLE_CLIENT_ID
          --env GOOGLE_CLIENT_SECRET
          --env AUTH_JWT_SECRET
          hnme_app
      `,
      ready: ctx => onceTcpPortUsed(PORT, DOCKER_ENGINE_HOST),
      onCrash: ctx => Promise.reject("Crash"),
    },
    gateway: configureHttpGateway({
      dependencies: ["app"],
      port: PORT,
      proxies: [
        ["/", { target: `http://${DOCKER_ENGINE_HOST}:${PORT}`, ws: true }],
      ],
    }),
  },
});
