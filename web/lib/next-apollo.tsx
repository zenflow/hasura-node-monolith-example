import { IncomingHttpHeaders } from "http";
import { NextPage } from "next";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import { useEffect, useMemo } from "react";
import { NextRouter } from "next/router";

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
  link: ApolloLinkFactory;
  client?: ApolloClientFactory<TCache>;
}

export interface WithApolloOptions {
  preload: boolean;
}

const isServer = typeof window === "undefined";

export function createWithApollo<TCache>(options: CreateWithApolloOptions<TCache>) {
  const linkFactory = options.link;
  const defaultClientFactory: ApolloClientFactory<TCache> = ({ ssrMode, link }) =>
    new ApolloClient<TCache>({ ssrMode, link, cache: new InMemoryCache({}) as any });
  const clientFactory = options.client || defaultClientFactory;

  function createClient(
    ssrMode: boolean,
    cache: TCache | undefined,
    headers?: IncomingHttpHeaders,
  ) {
    let link: ApolloLink;
    if (isServer && !headers) {
      // preload is disabled. prevent unwanted network requests.
      // workaround for https://github.com/apollographql/apollo-client/issues/7940
      link = ApolloLink.empty();
    } else {
      link = linkFactory({ headers });
    }
    const client = clientFactory({ ssrMode, link });
    if (cache) client.cache.restore(cache);
    client.disableNetworkFetches = true;
    // The above forces fetchPolicy "cache-first".
    //   `ssrMode: true` enables this but we want it *initially* on client too.
    //   See https://github.com/apollographql/apollo-client/issues/4814
    return client;
  }

  function withApollo<UserProps = {}>(options: WithApolloOptions, Page: NextPage<UserProps>) {
    interface PageWithApolloProps {
      userProps: UserProps;
      apolloClient?: ApolloClient<TCache>;
      apolloCache?: TCache;
    }
    const PageWithApollo: NextPage<PageWithApolloProps> = (props) => {
      // TODO: Pages using `preload: false` should get fresh client on route
      //   changes too, always, not just when arriving from another page.
      const apolloClient = useMemo(
        () => props.apolloClient || createClient(isServer, props.apolloCache),
        [props.apolloClient, props.apolloCache],
      );
      useEffect(() => {
        apolloClient.disableNetworkFetches = false;
        return () => apolloClient.stop();
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
        const apolloClient = createClient(true, undefined, ctx.req?.headers);
        (ctx as any).apolloClient = apolloClient; // TODO: provide type for this to consumer

        let userProps = {} as UserProps;
        if (Page.getInitialProps) {
          userProps = await Page.getInitialProps(ctx);
          if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
            return { userProps };
          }
        }

        let apolloCache: TCache | undefined;
        if (options.preload) {
          // Avoid using ctx.AppTree until it works client-side https://github.com/vercel/next.js/pull/23721
          const mockRouter = {
            pathname: ctx.pathname,
            query: ctx.query,
            asPath: ctx.asPath,
          } as NextRouter;
          const tree = (
            <RouterContext.Provider value={mockRouter}>
              <PageWithApollo userProps={userProps} apolloClient={apolloClient} />
            </RouterContext.Provider>
          );
          await getMarkupFromTree({ tree }); // TODO: use lightweight react-ssr-prepass instead
          // Head.rewind(); // TODO: how would this know what request to rewind head for?
          apolloCache = apolloClient.cache.extract();
        }

        (apolloClient as any).toJSON = () => undefined; // prevent from being serialized & sent to browser
        return {
          userProps,
          // force client-side to create a new apollo client /w ssrMode: false
          apolloClient: isServer ? apolloClient : undefined,
          apolloCache,
        };
      };
    }
    return PageWithApollo;
  }

  return withApollo;
}
