import "@exampledev/new.css";
import "nprogress/nprogress.css";
import "./global.css";
import App, { AppProps, AppInitialProps, AppContext } from "next/app";
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import { installNextNProgress } from "../lib/next-nprogress";
import { getApolloClient } from "../lib/apolloClient";
import { SessionDocument } from "../graphql-codegen";
import { PageHeader } from "../components/PageHeader";

installNextNProgress({ showSpinner: false });

interface MyAppInitialProps extends AppInitialProps {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  initialApolloState?: NormalizedCacheObject;
}

MyApp.getInitialProps = async (ctx: AppContext): Promise<MyAppInitialProps> => {
  const apolloClient = getApolloClient(ctx.ctx.req);
  (apolloClient as any).toJSON = () => undefined; // prevent object from being serialized
  const [appProps] = await Promise.all([
    App.getInitialProps(ctx),
    apolloClient.query({ query: SessionDocument }),
  ]);
  const initialApolloState = process.browser
    ? undefined
    : apolloClient.cache.extract();
  return { ...appProps, apolloClient, initialApolloState };
};

type MyAppProps = MyAppInitialProps & AppProps;

export default function MyApp(props: MyAppProps) {
  let { Component, pageProps, apolloClient, initialApolloState } = props;
  apolloClient = apolloClient || getApolloClient(undefined, initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <main>
        <PageHeader />
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
