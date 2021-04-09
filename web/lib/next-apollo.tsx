import { IncomingHttpHeaders } from "http";
import { NextPage } from "next";
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import { useEffect } from "react";

export type ApolloLinkFactoryParams = {
  headers: IncomingHttpHeaders | undefined;
};
export type ApolloLinkFactory = (params: ApolloLinkFactoryParams) => ApolloLink;
export type ApolloClientFactoryParams = {
  ssrMode: boolean;
  link: ApolloLink;
};
export type ApolloClientFactory<TCache> = (
  params: ApolloClientFactoryParams,
) => ApolloClient<TCache>;

export interface CreateWithApolloOptions<TCache> {
  debug?: boolean;
  link: ApolloLinkFactory;
  client?: ApolloClientFactory<TCache>;
}

export interface WithApolloOptions {
  preload: boolean;
}

const isServer = typeof window === "undefined";

export function createWithApollo<TCache>(options: CreateWithApolloOptions<TCache>) {
  const createLink = options.link;
  const defaultClientFactory: ApolloClientFactory<TCache> = ({ ssrMode, link }) =>
    new ApolloClient<TCache>({ ssrMode, link, cache: new InMemoryCache({}) as any });
  const createClient = options.client || defaultClientFactory;

  let globalApolloClient: ApolloClient<TCache> | undefined;
  function getApolloClient(cache: TCache | undefined, headers?: IncomingHttpHeaders) {
    if (isServer) return create();
    if (!globalApolloClient) globalApolloClient = create();
    return globalApolloClient;
    function create() {
      let link: ApolloLink;
      if (isServer && !headers) {
        // on server & preload is disabled
        // workaround for https://github.com/apollographql/apollo-client/issues/7940
        link = ApolloLink.empty();
      } else {
        link = createLink({ headers });
        if (options.debug) {
          link = DebuggerLink.concat(link);
        }
      }
      const client = createClient({ ssrMode: isServer, link });
      if (cache) client.cache.restore(cache);
      client.disableNetworkFetches = true;
      // The above forces fetchPolicy "cache-first".
      //   `ssrMode: true` enables this but we want it *initially* on client too.
      return client;
    }
  }

  function withApollo<UserProps = {}>(options: WithApolloOptions, Page: NextPage<UserProps>) {
    interface PageWithApolloProps {
      userProps: UserProps;
      apolloClient?: ApolloClient<TCache>;
      apolloCache?: TCache;
    }
    const PageWithApollo: NextPage<PageWithApolloProps> = (props) => {
      const apolloClient = props.apolloClient || getApolloClient(props.apolloCache);
      useEffect(() => {
        apolloClient.disableNetworkFetches = false;
      }, [apolloClient]);
      return (
        <ApolloProvider client={apolloClient}>
          <Page {...props.userProps} />
        </ApolloProvider>
      );
    };
    PageWithApollo.displayName = `PageWithApollo(${Page.displayName || "unknown"})`;
    if (Page.getInitialProps || options.preload) {
      PageWithApollo.getInitialProps = async (ctx) => {
        const apolloClient = getApolloClient(undefined, ctx.req?.headers);
        (apolloClient as any).toJSON = () => undefined; // prevent from being serialized & sent to browser
        (ctx as any).apolloClient = apolloClient; // TODO: provide type for this to consumer

        let userProps = {} as UserProps;
        if (Page.getInitialProps) {
          userProps = await Page.getInitialProps(ctx);
          if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
            return { userProps };
          }
        }

        // Until client-side AppTree is fixed, let's skip client-side preload
        // See https://github.com/vercel/next.js/pull/23721
        if (!isServer) return { userProps, apolloClient };

        let apolloCache: TCache | undefined;
        if (options.preload) {
          const { AppTree } = ctx;
          // TODO: use lightweight react-ssr-prepass instead
          await getMarkupFromTree({ tree: <AppTree pageProps={{ userProps, apolloClient }} /> });
          // Head.rewind(); // TODO: how would this know what request to rewind head for?
          if (isServer) apolloCache = apolloClient.cache.extract();
        }

        return { userProps, apolloClient, apolloCache };
      };
    }
    return PageWithApollo;
  }

  return withApollo;
}

const DebuggerLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: Date.now() });
  return forward(operation).map((data) => {
    const time = Date.now() - operation.getContext().start;
    console.log(`Operation ${operation.operationName} took ${time} to complete`);
    return data;
  });
});
