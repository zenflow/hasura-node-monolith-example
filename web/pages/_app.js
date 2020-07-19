import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import NextAuthClient from 'next-auth/client'
import { initializeApollo } from '../lib/apolloClient'

export default function MyApp({ Component, pageProps, session, apolloClient, initialApolloState }) {
  apolloClient = apolloClient || initializeApollo(null, initialApolloState)
  return (
    <NextAuthClient.Provider session={session} options={{
      // clientMaxAge: 60 // Re-fetch session if cache is older than 60 seconds
      // keepAlive: 5 * 60 // Send keepAlive message every 5 minutes
    }}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </NextAuthClient.Provider>
  )
}
MyApp.getInitialProps = async (ctx) => {
  const session = await NextAuthClient.getSession({ req: ctx.ctx.req })
  ctx.ctx.session = ctx.session = session
  const apolloClient = initializeApollo(ctx.ctx.req)
  apolloClient.toJSON = () => null
  ctx.ctx.apolloClient = ctx.apolloClient = apolloClient
  const appProps = await App.getInitialProps(ctx)
  return {
    ...appProps,
    session,
    apolloClient,
    initialApolloState: !process.browser && apolloClient.cache.extract(),
  }
}
