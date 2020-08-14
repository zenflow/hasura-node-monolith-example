import { MutationResult, useMutation } from "@apollo/client";
import { apolloCacheUpdateQuery } from "../lib/apollo-helpers";
import {
  PostInfoFragment,
  UserDetailsDocument,
  VoteDocument,
} from "../graphql-codegen";
import { useSessionQuery } from "./SessionQuery";

export type VoteFunction = (post: PostInfoFragment, value: 0 | -1 | 1) => void;

export function useVoteMutation(): [VoteFunction, MutationResult] {
  const { user } = useSessionQuery();
  const [mutationFunction, mutationResult] = useMutation(VoteDocument);
  const voteFunction: VoteFunction = (post, value) => {
    const previousValue = (post.my_vote_value ?? 0) as 0 | 1 | -1;
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
              vote_total: (post.vote_total ?? 0) + (value - previousValue),
              my_vote_value: value,
            },
          },
        },
      },
      update: (cache, { data }) => {
        if (!user || !data) return;
        apolloCacheUpdateQuery(cache, {
          query: UserDetailsDocument,
          variables: { id: user.id },
          update(query) {
            const getAggregateForValue = (value: 1 | -1) =>
              (value > 0
                ? query.users_by_pk!.upvotes_aggregate
                : query.users_by_pk!.downvotes_aggregate
              ).aggregate!;
            if (previousValue) {
              getAggregateForValue(previousValue).count!--;
            }
            if (value) {
              getAggregateForValue(value).count!++;
            }
          },
        });
      },
    });
  };
  return [voteFunction, mutationResult];
}
