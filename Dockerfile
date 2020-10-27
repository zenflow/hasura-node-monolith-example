# Import `node` runtime
FROM astefanutti/scratch-node:14.5.0 as node-runtime

# Prepare main package
FROM node:14.5.0 as main-package
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prod
ADD main-server.js ./

# Prepare auth package
FROM node:14.5.0 as auth-package
WORKDIR /app/auth
ADD auth/package.json auth/yarn.lock ./
RUN yarn install --frozen-lockfile --prod
ADD auth/ ./

# Prepare actions package
FROM node:14.5.0 as actions-package
WORKDIR /app/actions
ADD actions/package.json actions/yarn.lock ./
RUN yarn install --frozen-lockfile --prod
ADD actions/ ./

# Prepare web package
FROM node:14.5.0 as web-package
WORKDIR /app/web
ADD web/package.json web/yarn.lock ./
RUN yarn install --frozen-lockfile
ADD web/ ./
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn next build
RUN yarn install --prod

# Base this image on hasura graphql engine (CLI migrations version)
FROM hasura/graphql-engine:v1.3.2.cli-migrations-v2

# Install `node` runtime
COPY --from=node-runtime /bin/node /bin/node
COPY --from=node-runtime /lib/ld-musl-*.so.1 /lib/
COPY --from=node-runtime /etc/passwd /tmp/node_etc_passwd
RUN cat /tmp/node_etc_passwd >> /etc/passwd

# Copy hasura migrations & metadata
COPY hasura/metadata /hasura-metadata/
COPY hasura/migrations /hasura-migrations/

# Copy main package
COPY --from=main-package /app /app

# Copy auth package
COPY --from=auth-package /app/auth /app/auth

# Copy actions package
COPY --from=actions-package /app/actions /app/actions

# Copy web package
COPY --from=web-package /app/web /app/web

# Set env vars used in metadata, preventing errors on cli-migrations-v2 startup.
# This env var is actually defined in main-server.js.
ENV ACTIONS_URL foo

# Set env var to signal production mode
ENV NODE_ENV production

# Start main server
CMD node /app/main-server.js
