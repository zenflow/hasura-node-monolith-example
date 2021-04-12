import { PostVotersDocument, UserInfoFragment } from "../generated";
import { useQuery } from "@apollo/client";

export function usePostVotersQuery(postId: number) {
  const queryResult = useQuery(PostVotersDocument, {
    variables: { postId },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });
  const downvoters: UserInfoFragment[] =
    queryResult.data?.posts_by_pk?.downvotes.map(({ user }) => user) ?? [];
  const upvoters: UserInfoFragment[] =
    queryResult.data?.posts_by_pk?.upvotes.map(({ user }) => user) ?? [];
  return { ...queryResult, downvoters, upvoters };
}
