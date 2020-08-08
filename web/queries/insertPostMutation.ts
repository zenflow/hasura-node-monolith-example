import gql from "graphql-tag";
import { MutationResult, useMutation } from "@apollo/client";
import { produce } from "immer";
import {
  allPostsQuery,
  AllPostsQueryData,
  allPostsQueryVars,
} from "./allPostsQuery";

// TODO: should use a graphql fragment for Post fields, same as in allPostsQuery.ts
export const insertPostMutation = gql`
  mutation($title: String!, $url: String!) {
    insert_posts_one(object: { title: $title, url: $url }) {
      id
      title
      url
      user {
        name
      }
      vote_total
      my_vote_value
    }
  }
`;

export type InsertPostFunction = (title: string, url: string) => void;

export function useInsertPostMutation(): [InsertPostFunction, MutationResult] {
  const [mutationFunction, mutationResult] = useMutation(insertPostMutation);
  const insertPostFunction: InsertPostFunction = (title, url) => {
    mutationFunction({
      variables: { title, url },
      update: (proxy, { data: { insert_posts_one } }) => {
        const data = proxy.readQuery<AllPostsQueryData>({
          query: allPostsQuery,
          variables: allPostsQueryVars,
        });
        if (!data) return;
        proxy.writeQuery({
          query: allPostsQuery,
          variables: allPostsQueryVars,
          data: produce(data, (data) => {
            data.posts.unshift(insert_posts_one);
            data.posts_aggregate.aggregate.count++;
          }),
        });
      },
    });
  };
  return [insertPostFunction, mutationResult];
}
