# Prepare packages
FROM node:14.17.2-slim as node-build
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
FROM hasura/graphql-engine:v2.0.2.cli-migrations-v3

# Install Node.js
RUN apt-get -y install curl gnupg2 \
  && curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get -y install nodejs=14.17.2-1nodesource1 \
  && apt-get -y remove curl gnupg2 \
  && apt-get -y auto-remove \
  && apt-get -y clean \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /usr/share/doc/ \
  && rm -rf /usr/share/man/ \
  && rm -rf /usr/share/locale/

# Copy hasura migrations & metadata
COPY hasura/metadata /hasura-metadata/
COPY hasura/migrations /hasura-migrations/

# Copy packages
COPY --from=node-build /app /app

ENV NODE_ENV=production ACTIONS_URL=foo
# "NODE_ENV=production" signals production mode
# "ACTIONS_URL=foo" prevents warnings in cli-migrations startup (ACTIONS_URL is actually defined in main-server.js)

# Start main server
CMD node /app/composite-service.js
