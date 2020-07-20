import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

function createApolloClient(accessToken, initialState) {
  const client = new ApolloClient({
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: `${process.browser ? window.location.origin : process.env.HASURA_URL}/v1/graphql`,
      credentials: 'same-origin',
      headers: accessToken
        ? { 'access-token': accessToken }
        : {},
    }),
    cache: new InMemoryCache(),
  })
  if (initialState) {
    client.cache.restore(initialState)
  }
  return client
}

let globalApolloClient

export function initializeApollo(accessToken, initialState) {
  if (process.browser) {
    // TODO: new client when new accessToken
    if (!globalApolloClient) {
      globalApolloClient = createApolloClient(accessToken, initialState)
    }
    return globalApolloClient
  } else {
    return createApolloClient(accessToken, initialState)
  }
}
