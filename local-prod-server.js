/**
 * Problem: Cannot do Google OAuth2 signin flow when running locally on Windows in production mode.
 * Cause: Hostname of OAuth2 callback URL must be either `localhost` or the registered hostname.
 *    On Windows, Docker container ports are published on a different IP address than `localhost` (i.e. not `127.0.0.1`).
 * Solution: This script. Use composite-service (again) to run app & reverse proxy from docker machine to localhost.
 * If you want to run the app locally on Linux or Max in production mode, you probably don't need this script;
 *    you can run simply build the Dockerfile, start a container with `docker run` and access the app on localhost.
 */

const { spawnSync } = require('child_process')
const { startCompositeService, onceTcpPortUsed, configureHttpGateway } = require('composite-service')

function exec (command, ...args) {
  process.stdout.write(['>', command, ...args].join(' ') + '\n')
  spawnSync(command, args, { stdio: 'inherit' })
}
// Kill docker container in case it didn't receive a ctrl+c and therefore continues to run even though `docker run` exited
exec('docker', 'kill', 'hnme_app_1')
exec('docker', 'build', '--tag', 'hnme_app', '.')

const { PORT, DOCKER_ENGINE_HOST } = process.env

startCompositeService({
  services: {
    app: {
      // --tty
      command: `
        docker run
          --name hnme_app_1
          --publish ${PORT}:${PORT}
          --env PORT
          --env HASURA_GRAPHQL_DATABASE_URL
          --env HASURA_GRAPHQL_ADMIN_SECRET
          --env NEXTAUTH_URL
          --env GOOGLE_CLIENT_ID
          --env GOOGLE_CLIENT_SECRET
          --env AUTH_JWT_SECRET
          --rm
          --interactive
          hnme_app
      `,
      env: process.env,
      ready: ctx => onceTcpPortUsed(PORT, DOCKER_ENGINE_HOST),
      onCrash: ctx => Promise.reject('Crash'),
    },
    gateway: configureHttpGateway({
      dependencies: ['app'],
      port: PORT,
      proxies: [['/', { target: `http://${DOCKER_ENGINE_HOST}:${PORT}`, ws: true }]]
    }),
  }
})
