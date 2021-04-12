import { MutationResult, useMutation } from "@apollo/client";
import { apolloCacheUpdateQuery } from "../../lib/apollo-immer";
import { PostFragment, PostVotersDocument, UserDetailsDocument, VoteDocument } from "../generated";
import { useSessionQuery } from "../queries/Session";

export type VoteFunction = (post: PostFragment, value: 0 | -1 | 1) => void;

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
        // update list of post voters
        apolloCacheUpdateQuery(cache, {
          query: PostVotersDocument,
          variables: { postId: post.id },
          update(query) {
            for (const which of ["upvotes", "downvotes"] as const) {
              query.posts_by_pk![which] = query.posts_by_pk![which].filter(
                (vote) => vote.user.id !== user.id,
              );
            }
            if (value !== 0) {
              query.posts_by_pk![value === 1 ? "upvotes" : "downvotes"].push({ user });
            }
          },
        });
        // update user details -> "upvotes given" & "downvotes given"
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
