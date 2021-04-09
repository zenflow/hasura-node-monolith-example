import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { createWithApollo } from "./lib/next-apollo";

const isServer = typeof window === "undefined";
const baseUri = isServer ? process.env.HASURA_GRAPHQL_ENDPOINT : window.location.origin;
const uri = `${baseUri}/v1/graphql`;

export const withApollo = createWithApollo({
  // debug: true,
  link({ headers }) {
    return isServer
      ? new BatchHttpLink({ uri, headers: { cookie: headers!.cookie } })
      : new HttpLink({ uri });
  },
  client({ ssrMode, link }) {
    return new ApolloClient({
      ssrMode,
      link,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              posts: offsetLimitPagination((_, { variables = {} }) => {
                // TODO: should this not be the default function provided by Apollo Client?
                const { offset, limit, ...rest } = variables;
                return JSON.stringify(rest);
              }),
            },
          },
        },
      }),
    });
  },
});
