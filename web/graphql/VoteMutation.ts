import { MutationResult, useMutation } from "@apollo/client";
import {
  PostInfoFragment,
  VoteDocument,
  VoteMutation,
  VoteMutationVariables,
} from "../graphql-codegen";

export type VoteFunction = (post: PostInfoFragment, value: 0 | -1 | 1) => void;

export function useVoteMutation(): [VoteFunction, MutationResult] {
  const [mutationFunction, mutationResult] = useMutation<
    VoteMutation,
    VoteMutationVariables
  >(VoteDocument);
  const voteFunction: VoteFunction = (post, value) => {
    mutationFunction({
      variables: { post_id: post.id, value },
      optimisticResponse: {
        vote: {
          __typename: "VoteOutput",
          vote: {
            __typename: "votes",
            post: {
              __typename: "posts",
              id: post.id,
              vote_total:
                (post.vote_total ?? 0) - (post.my_vote_value ?? 0) + value,
              my_vote_value: value,
            },
          },
        },
      },
    });
  };
  return [voteFunction, mutationResult];
}
