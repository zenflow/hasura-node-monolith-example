# Import `node` runtime
FROM astefanutti/scratch-node:14.14.0 as node-runtime

# Prepare packages
FROM node:14.15.0-slim as node-build
# Note: Using newer node version here to please "jest-worker@27.0.0-next.5"'s node version contraint
WORKDIR /app
ADD package.json yarn.lock ./
ADD actions/package.json ./actions/
ADD auth/package.json ./auth/
ADD web/package.json ./web/
RUN yarn install --frozen-lockfile
ADD web/ ./web/
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
RUN cd web && yarn next build && cd ..
RUN yarn install --frozen-lockfile --prod
ADD actions/ ./actions/
ADD auth/ ./auth/
ADD composite-service.js ./

# Base this image on hasura graphql engine (CLI migrations version)
FROM hasura/graphql-engine:v1.3.3.cli-migrations-v2

# Install `node` runtime
COPY --from=node-runtime /bin/node /bin/node
COPY --from=node-runtime /lib/ld-musl-*.so.1 /lib/
COPY --from=node-runtime /etc/passwd /tmp/node_etc_passwd
RUN cat /tmp/node_etc_passwd >> /etc/passwd

# Copy hasura migrations & metadata
COPY hasura/metadata /hasura-metadata/
COPY hasura/migrations /hasura-migrations/

# Copy packages
COPY --from=node-build /app /app

ENV NODE_ENV=production ACTIONS_URL=foo
# "NODE_ENV=production" signals production mode
# "ACTIONS_URL=foo" prevents errors in cli-migrations-v2 startup (ACTIONS_URL is actually defined in main-server.js)

# Start main server
CMD node /app/composite-service.js
