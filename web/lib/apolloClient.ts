import { IncomingMessage } from "http";
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { offsetLimitPagination } from "@apollo/client/utilities";

let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export function getApolloClient(
  req?: IncomingMessage,
  initialState?: NormalizedCacheObject
) {
  if (process.browser) {
    if (!globalApolloClient) {
      globalApolloClient = createApolloClient(undefined, initialState);
    }
    return globalApolloClient;
  } else {
    if (!req) throw new Error("Request object required server-side");
    const request = req as IncomingMessage & {
      apolloClient?: ApolloClient<NormalizedCacheObject>;
    };
    if (!request.apolloClient) {
      request.apolloClient = createApolloClient(req, initialState);
    }
    return request.apolloClient;
  }
}

const baseUri = process.browser
  ? window.location.origin
  : process.env.HASURA_URL;

const uri = `${baseUri}/v1/graphql`;

function createApolloClient(
  req?: IncomingMessage,
  initialState?: NormalizedCacheObject
) {
  const headers = req?.headers.cookie ? { cookie: req.headers.cookie } : {};
  const client = new ApolloClient({
    ssrMode: !process.browser,
    link: process.browser
      ? new HttpLink({ uri, headers })
      : new BatchHttpLink({ uri, headers }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: offsetLimitPagination(),
          },
        },
      },
    }),
  });
  if (initialState) {
    client.cache.restore(initialState);
  }
  return client;
}
