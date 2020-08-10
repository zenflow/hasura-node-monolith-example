import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  useQuery as superUseQuery,
  QueryHookOptions,
  useMutation as superUseMutation,
  MutationHookOptions,
  ApolloClient,
  QueryOptions,
  MutationOptions,
} from "@apollo/client";

export function useQuery<TData, TVariables>(
  query: TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
) {
  return superUseQuery<TData, TVariables>(query, options);
}

export function useMutation<Mutation, MutationVariables>(
  mutation: TypedDocumentNode<Mutation, MutationVariables>,
  options?: MutationHookOptions<Mutation, MutationVariables>
) {
  return superUseMutation<Mutation, MutationVariables>(mutation, options);
}

export interface TypedQueryOptions<TData, TVariables>
  extends QueryOptions<TVariables> {
  query: TypedDocumentNode<TData, TVariables>;
}

export function apolloClientQuery<TData, TVariables>(
  apolloClient: ApolloClient<any>,
  options: TypedQueryOptions<TData, TVariables>
) {
  return apolloClient.query<TData, TVariables>(options);
}

export interface TypedMutationOptions<TData, TVariables>
  extends MutationOptions<TData, TVariables> {
  mutation: TypedDocumentNode<TData, TVariables>;
}

export function apolloClientMutation<TData, TVariables>(
  apolloClient: ApolloClient<any>,
  options: TypedMutationOptions<TData, TVariables>
) {
  return apolloClient.mutate<TData, TVariables>(options);
}
