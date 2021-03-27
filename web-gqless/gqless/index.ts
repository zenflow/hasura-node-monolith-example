import React from "react";
import { QueryFetcher, createClient, GqlessClient } from "gqless";
import { createSubscriptionsClient } from "@gqless/subscriptions";
import { createReactClient, ReactClient } from "@gqless/react";
import {
  generatedSchema,
  GeneratedSchema,
  scalarsEnumsHash,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";
import { createGqlessNextClient } from "../lib/gqless-next";

const isServer = typeof window === "undefined";

const gqlOrigin = isServer ? process.env.HASURA_GRAPHQL_ENDPOINT : window.location.origin;
const gqlUrl = `${gqlOrigin}/v1/graphql`;

export const {
  getGqlessClients,
  GqlessContext,
  withGqless,
  useQuery,
} = createGqlessNextClient<GeneratedSchema>((_req) => {
  const queryFetcher: QueryFetcher = async (query, variables) => {
    const response = await fetch(gqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      mode: "cors",
    });
    const json = await response.json();
    return json;
  };
  const subscriptionsClient = isServer
    ? undefined
    : createSubscriptionsClient({
        wsEndpoint: () => {
          const url = new URL(gqlUrl);
          url.protocol = url.protocol.replace("http", "ws");
          return url.href;
        },
      });
  const client = createClient<GeneratedSchema, SchemaObjectTypesNames, SchemaObjectTypes>({
    schema: generatedSchema,
    scalarsEnumsHash,
    queryFetcher,
    subscriptionsClient,
  });
  const react = createReactClient<GeneratedSchema>(client, {
    defaults: {
      suspense: false,
      staleWhileRevalidate: false,
    },
  });
  return { client, react };
});

export * from "./schema.generated";
