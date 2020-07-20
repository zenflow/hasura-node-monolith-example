const { spawnSync } = require('child_process')
const { startCompositeService, onceTcpPortUsed, configureHttpGateway } = require('composite-service')

const {
  NODE_ENV,
  DOCKER_ENGINE_HOST,
  DOCKER_HOST_HOST,
  PORT,
  DATABASE_URL,
  HASURA_GRAPHQL_ADMIN_SECRET,
  NEXTAUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_JWT_SECRET,
} = process.env

const dev = NODE_ENV !== 'production'

if (dev) {
  function exec (command, ...args) {
    process.stdout.write(['>', command, ...args].join(' ') + '\n')
    spawnSync(command, args, { stdio: 'inherit' })
  }
  // Kill docker container in case it didn't receive a ctrl+c and therefore continues to run even though `docker run` exited
  exec('docker', 'kill', 'hnme_hasura_1')
  exec('docker', 'build', '--tag', 'hnme_hasura', `${__dirname}/../hasura`)
}

const hasuraHost = dev ? DOCKER_ENGINE_HOST : 'localhost'
const [hasuraPort, authPort, webPort] = [8080, 8081, 8082]

const hasuraEnv = {
  HASURA_GRAPHQL_DATABASE_URL: DATABASE_URL,
  HASURA_GRAPHQL_ADMIN_SECRET,
  HASURA_GRAPHQL_AUTH_HOOK: `http://${dev ? DOCKER_HOST_HOST : 'localhost'}:${authPort}/hasura-auth-hook`,
}
const HASURA_URL = `http://${hasuraHost}:${hasuraPort}`

startCompositeService({
  services: {
    hasura: {
      command: dev // --tty
        ? `docker run
            --name hnme_hasura_1
            --env PORT
            --env HASURA_GRAPHQL_DATABASE_URL
            --env HASURA_GRAPHQL_ADMIN_SECRET
            --env HASURA_GRAPHQL_AUTH_HOOK
            --publish ${hasuraPort}:${hasuraPort}
            --rm
            --interactive
            hnme_hasura`
        : `graphql-engine serve --server-port ${hasuraPort}`,
      env: dev
        ? { ...process.env, PORT: hasuraPort, ...hasuraEnv }
        : hasuraEnv,
      ready: ctx => onceTcpPortUsed(hasuraPort, hasuraHost),
    },
    auth: {
      cwd: `${__dirname}/../auth`,
      // TODO: make `nodemon server.js` work here (when `!!dev`)
      command: 'node server.js',
      env: {
        PORT: authPort,
        DATABASE_URL,
        NEXTAUTH_URL,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        AUTH_JWT_SECRET,
      },
      ready: ctx => onceTcpPortUsed(authPort)
    },
    web: {
      cwd: `${__dirname}/../web`,
      /* Note we are unable to call the 'next' command directly here
        since the production docker image from scratch won't let us execute shell scripts.
        E.g. calling `/path/to/node_modules/.bin/next start` will error saying the `next` file is not found
        and `RUN chmod a+x /path/to/node_modules/.bin/next` does not seem to help. */
      command: `node node_modules/next/dist/bin/next ${dev ? 'dev' : 'start'} --port ${webPort}`,
      env: {
        HASURA_URL,
      },
      ready: ctx => onceTcpPortUsed(webPort),
    },
    gateway: configureHttpGateway({
      dependencies: ['hasura', 'auth', 'web'],
      port: PORT,
      proxies: [
        [
          ['/v1', '/v1alpha1', '/v1beta1', '/healthz'],
          { target: HASURA_URL, ws: true }
        ],
        ['/api/auth', { target: `http://localhost:${authPort}` }],
        ['/', { target: `http://localhost:${webPort}` }]
      ]
    })
  },
})
