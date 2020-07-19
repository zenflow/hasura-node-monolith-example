import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import { initializeApollo } from '../lib/apolloClient'
import { getAuth } from '../lib/auth'

export default function MyApp({ Component, pageProps, apolloClient, initialApolloState }) {
  apolloClient = apolloClient || initializeApollo(null, initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
MyApp.getInitialProps = async (ctx) => {
  const apolloClient = initializeApollo(ctx.ctx.req)
  apolloClient.toJSON = () => null
  ctx.ctx.apolloClient = ctx.apolloClient = apolloClient
  const auth = await getAuth(apolloClient)
  ctx.ctx.auth = ctx.auth = auth
  const appProps = await App.getInitialProps(ctx)
  return {
    ...appProps,
    apolloClient,
    initialApolloState: !process.browser && apolloClient.cache.extract(),
  }
}
