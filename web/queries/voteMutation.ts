import gql from "graphql-tag";
import { MutationResult, useMutation } from "@apollo/client";
import { Post } from "./allPostsQuery";

export const voteMutation = gql`
  mutation($post_id: Int!, $value: smallint!) {
    vote(post_id: $post_id, value: $value) {
      __typename
      vote {
        __typename
        post {
          __typename
          id
          vote_total
          my_vote_value
        }
      }
    }
  }
`;

export type VoteFunction = (post: Post, value: 0 | -1 | 1) => void;

export function useVoteMutation(): [VoteFunction, MutationResult] {
  const [mutationFunction, mutationResult] = useMutation(voteMutation);
  const voteFunction: VoteFunction = (post, value) => {
    if (post.my_vote_value === undefined) {
      return;
    }
    mutationFunction({
      variables: { post_id: post.id, value },
      optimisticResponse: {
        __typename: "Mutation",
        vote: {
          __typename: "VoteOutput",
          vote: {
            __typename: "votes",
            post: {
              __typename: "posts",
              id: post.id,
              vote_total: post.vote_total - post.my_vote_value + value,
              my_vote_value: value,
            },
          },
        },
      },
    });
  };
  return [voteFunction, mutationResult];
}
