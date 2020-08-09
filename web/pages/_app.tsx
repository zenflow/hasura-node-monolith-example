import "@exampledev/new.css";
import "./global.css";
import App, { AppProps, AppInitialProps, AppContext } from "next/app";
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import { getApolloClient } from "../lib/apolloClient";
import { sessionQuery } from "../queries/sessionQuery";
import { PageLayout } from "../components/PageLayout";

interface MyAppInitialProps extends AppInitialProps {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  initialApolloState?: NormalizedCacheObject;
}

MyApp.getInitialProps = async (ctx: AppContext): Promise<MyAppInitialProps> => {
  const apolloClient = getApolloClient(ctx.ctx.req);
  (apolloClient as any).toJSON = () => undefined; // prevent object from being serialized

  const [appProps] = await Promise.all([
    App.getInitialProps(ctx),
    apolloClient.query({ query: sessionQuery }), // preload session query
  ]);

  const initialApolloState = process.browser
    ? undefined
    : apolloClient.cache.extract();

  return { ...appProps, apolloClient, initialApolloState };
};

type MyAppProps = MyAppInitialProps & AppProps;

export default function MyApp({
  Component,
  pageProps,
  apolloClient,
  initialApolloState,
}: MyAppProps) {
  apolloClient = apolloClient || getApolloClient(undefined, initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ApolloProvider>
  );
}
