import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { BatchHttpLink } from 'apollo-link-batch-http'

function createApolloClient(req, initialState) {
  const uri = `${process.browser ? window.location.origin : process.env.HASURA_URL}/v1/graphql`
  const headers = req && req.headers.cookie ? { cookie: req.headers.cookie } : {}
  const client = new ApolloClient({
    ssrMode: !process.browser,
    link: process.browser
      ? new HttpLink({ uri, headers })
      : new BatchHttpLink({ uri, headers }),
    cache: new InMemoryCache(),
  })
  if (initialState) {
    client.cache.restore(initialState)
  }
  return client
}

let globalApolloClient

export function initializeApollo(req, initialState) {
  if (process.browser) {
    // TODO: new client when auth state changes
    if (!globalApolloClient) {
      globalApolloClient = createApolloClient(null, initialState)
    }
    return globalApolloClient
  } else {
    if (!req) throw new Error('Request object required server-side')
    return createApolloClient(req, initialState)
  }
}
