import { MutationResult, useMutation } from "@apollo/client";
import { apolloCacheUpdateQuery } from "../lib/apollo-helpers";
import {
  InsertPostDocument,
  Posts_Bool_Exp,
  PostsDocument,
} from "../graphql-codegen";
import { useSessionQuery } from "./SessionQuery";
import { defaultPostsQueryVariables } from "./PostsQuery";

export type InsertPostFunction = (title: string, url: string) => void;

export function useInsertPostMutation(): [InsertPostFunction, MutationResult] {
  const { user } = useSessionQuery();
  const [mutationFunction, mutationResult] = useMutation(InsertPostDocument);
  const insertPostFunction: InsertPostFunction = (title, url) => {
    mutationFunction({
      variables: { title, url },
      update: (cache, { data }) => {
        if (!data) return;
        const updatePostsQuery = (where: Posts_Bool_Exp) => {
          apolloCacheUpdateQuery(cache, {
            query: PostsDocument,
            variables: { ...defaultPostsQueryVariables, where },
            update(query) {
              query.posts.unshift(data.insert_posts_one!);
              query.posts_aggregate.aggregate!.count!++;
            },
          });
        };
        updatePostsQuery({});
        if (user) {
          updatePostsQuery({ user_id: { _eq: user.id } });
        }
      },
    });
  };
  return [insertPostFunction, mutationResult];
}
