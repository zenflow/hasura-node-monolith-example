import { useQuery } from "@apollo/client";
import { UserDetailsDocument } from "../generated";

export function useUserDetailsQuery(id: number | undefined) {
  const queryResult = useQuery(UserDetailsDocument, {
    variables: { id: id ?? 0 },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });
  const user = queryResult.data?.users_by_pk;
  const userUpvotes = user?.upvotes_aggregate.aggregate?.count;
  const userDownvotes = user?.downvotes_aggregate.aggregate?.count;
  return { ...queryResult, user, userUpvotes, userDownvotes };
}
