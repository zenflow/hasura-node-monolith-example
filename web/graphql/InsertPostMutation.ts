import { MutationResult, useMutation } from "@apollo/client";
import { produce } from "immer";
import {
  InsertPostMutation,
  InsertPostMutationVariables,
  InsertPostDocument,
  AllPostsQuery,
  AllPostsQueryVariables,
  AllPostsDocument,
} from "../graphql-codegen";
import { allPostsQueryVars } from "./AllPostsQuery";

export type InsertPostFunction = (title: string, url: string) => void;

export function useInsertPostMutation(): [InsertPostFunction, MutationResult] {
  const [mutationFunction, mutationResult] = useMutation<
    InsertPostMutation,
    InsertPostMutationVariables
  >(InsertPostDocument);
  const insertPostFunction: InsertPostFunction = (title, url) => {
    mutationFunction({
      variables: { title, url },
      update: (proxy, { data: mutationData }) => {
        if (!mutationData) return;
        const data = proxy.readQuery<AllPostsQuery, AllPostsQueryVariables>({
          query: AllPostsDocument,
          variables: allPostsQueryVars,
        });
        if (!data) return;
        proxy.writeQuery({
          query: AllPostsDocument,
          variables: allPostsQueryVars,
          data: produce(data, (data) => {
            data.posts.unshift(mutationData.insert_posts_one!);
            data.posts_aggregate.aggregate!.count!++;
          }),
        });
      },
    });
  };
  return [insertPostFunction, mutationResult];
}
