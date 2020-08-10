import { ApolloCache } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import produce from "immer";

export interface ApolloCacheUpdateQueryParams<Query, QueryVariables> {
  query: TypedDocumentNode<Query, QueryVariables>;
  variables: QueryVariables;
  update: (query: Query) => void;
}

export function apolloCacheUpdateQuery<Query, QueryVariables>(
  cache: ApolloCache<any>,
  params: ApolloCacheUpdateQueryParams<Query, QueryVariables>
) {
  const { query, variables, update } = params;
  let queryResult: Query | null = null;
  try {
    queryResult = cache.readQuery<Query, QueryVariables>({
      query,
      variables,
    });
  } catch (error) {}
  if (queryResult) {
    cache.writeQuery<Query, QueryVariables>({
      query,
      variables,
      data: produce(queryResult, update),
    });
  }
}
