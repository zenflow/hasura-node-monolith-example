import { MutationResult, useMutation } from "@apollo/client";
import { apolloCacheUpdateQuery } from "../../lib/apollo-immer";
import { InsertPostDocument, Posts_Bool_Exp, PostsDocument } from "../generated";
import { defaultPostsQueryVariables } from "../queries/Posts";

export type InsertPostFunction = (title: string) => void;

export function useInsertPostMutation(): [InsertPostFunction, MutationResult] {
  const [mutationFunction, mutationResult] = useMutation(InsertPostDocument);
  const insertPostFunction: InsertPostFunction = (content) => {
    mutationFunction({
      variables: { content },
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
        // if users could submit posts on their profile page we would uncomment this:
        // if (user) updatePostsQuery({ user_id: { _eq: user.id } });
        // (const { user } = useSessionQuery();)
      },
    });
  };
  return [insertPostFunction, mutationResult];
}
