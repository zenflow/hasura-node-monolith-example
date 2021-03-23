# Import `node` runtime
FROM astefanutti/scratch-node:14.14.0 as node-runtime

# Prepare packages
FROM node:14.14.0-slim as node-build

WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prod
ADD composite-service.js ./

WORKDIR /app/auth
ADD auth/package.json auth/yarn.lock ./
RUN yarn install --frozen-lockfile --prod
ADD auth/ ./

WORKDIR /app/actions
ADD actions/package.json actions/yarn.lock ./
RUN yarn install --frozen-lockfile --prod
ADD actions/ ./

WORKDIR /app/web
ADD web/package.json web/yarn.lock ./
RUN yarn install --frozen-lockfile
ADD web/ ./
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn next build
RUN yarn install --prod

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

# Set env vars used in metadata, preventing errors on cli-migrations-v2 startup.
# This env var is actually defined in main-server.js.
ENV ACTIONS_URL foo

# Set env var to signal production mode
ENV NODE_ENV production

# Start main server
CMD node /app/composite-service.js
