import React from "react";
import { GqlessClient } from "gqless";
import { ReactClient } from "@gqless/react";
import { NextPage, NextPageContext } from "next";

const isServer = typeof window === "undefined";

export interface BasicSchema {
  query: object;
  mutation: object;
  subscription: object;
}

export type CreateGqlessClientsFunction<Schema extends BasicSchema> = (
  req?: NextPageContext["req"],
) => GqlessClients<Schema>;

export interface GqlessClients<Schema extends BasicSchema> {
  client: GqlessClient<Schema>;
  react: ReactClient<Schema>;
}

export function createGqlessNextClient<Schema extends BasicSchema>(
  createGqlessClients: CreateGqlessClientsFunction<Schema>,
) {
  let globalGqlessClients: GqlessClients<Schema> | undefined;

  const getGqlessClients: (req?: NextPageContext["req"]) => GqlessClients<Schema> = (req) => {
    if (isServer) {
      if (!req) throw new Error("`req` is required server-side");
      const gqlessClients = createGqlessClients(req);
      (gqlessClients as any).toJSON = () => undefined; // prevent value from being serialized
      return gqlessClients;
    } else {
      if (!globalGqlessClients) globalGqlessClients = createGqlessClients();
      return globalGqlessClients;
    }
  };

  const GqlessContext = React.createContext<GqlessClients<Schema> | null>(null);

  function withGqless<PageProps = {}>(Page: NextPage<PageProps>) {
    const PageWithGqless: NextPage<{
      gqlessClients?: GqlessClients<Schema> | undefined;
      cacheSnapshot?: string | undefined;
      userProps: PageProps;
    }> = ({ gqlessClients, cacheSnapshot, userProps }) => {
      gqlessClients = gqlessClients || getGqlessClients();
      if (cacheSnapshot) gqlessClients.react.useHydrateCache({ cacheSnapshot });
      return (
        <GqlessContext.Provider value={gqlessClients}>
          <Page {...userProps} />
        </GqlessContext.Provider>
      );
    };
    PageWithGqless.getInitialProps = async (ctx) => {
      const userProps = Page.getInitialProps ? await Page.getInitialProps(ctx) : ({} as PageProps);
      const gqlessClients = getGqlessClients(ctx.req);
      const { cacheSnapshot } = await gqlessClients.react.prepareReactRender(
        <PageWithGqless gqlessClients={gqlessClients} userProps={userProps} />,
      );
      return { gqlessClients, cacheSnapshot: isServer ? cacheSnapshot : undefined, userProps };
    };
    return PageWithGqless;
  }

  function useQuery(...args: Parameters<ReactClient<Schema>["useQuery"]>) {
    const clients = React.useContext(GqlessContext);
    if (!clients) throw new Error("GqlessContext has not been provided");
    return clients.react.useQuery(...args);
  }

  return { getGqlessClients, GqlessContext, withGqless, useQuery };
}
