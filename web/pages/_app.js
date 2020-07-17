import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import NextAuthClient from 'next-auth/client'
import { useApollo } from '../lib/apolloClient'

export default function MyApp({ Component, pageProps, session }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <NextAuthClient.Provider session={session} options={{
        // clientMaxAge: 60 // Re-fetch session if cache is older than 60 seconds
        // keepAlive: 5 * 60 // Send keepAlive message every 5 minutes
      }}>
        <Component {...pageProps} />
      </NextAuthClient.Provider>
    </ApolloProvider>
  )
}
MyApp.getInitialProps = async (ctx) => {
  const [appProps, session] = await Promise.all([
    App.getInitialProps(ctx),
    NextAuthClient.getSession({ req: ctx.ctx.req }),
  ])
  return { ...appProps, session }
}
