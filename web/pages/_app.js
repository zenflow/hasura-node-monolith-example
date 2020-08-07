import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { initializeApollo } from "../lib/apolloClient";
import { getSession } from "../lib/session";
import { PageLayout } from "../components/PageLayout";

export default function MyApp({
  Component,
  pageProps,
  apolloClient,
  initialApolloState,
}) {
  apolloClient = apolloClient || initializeApollo(null, initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const apolloClient = initializeApollo(ctx.ctx.req);
  apolloClient.toJSON = () => null;
  ctx.ctx.apolloClient = ctx.apolloClient = apolloClient;

  const sessionPromise = getSession(apolloClient);
  ctx.ctx.session = ctx.session = async () => sessionPromise;

  const appProps = await App.getInitialProps(ctx);

  await sessionPromise;
  const initialApolloState = !process.browser && apolloClient.cache.extract();

  return { ...appProps, apolloClient, initialApolloState };
};
