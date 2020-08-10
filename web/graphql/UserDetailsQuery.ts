import { QueryResult } from "@apollo/client";
import { useQuery } from "../lib/apollo-helpers";
import {
  UserDetailsQuery,
  UserDetailsQueryVariables,
  UserDetailsDocument,
} from "../graphql-codegen";

export function useUserDetailsQuery(
  id: number | undefined
): QueryResult<UserDetailsQuery, UserDetailsQueryVariables> & {
  user: UserDetailsQuery["users_by_pk"];
  userUpvoteCount: number | null | undefined;
  userDownvoteCount: number | null | undefined;
} {
  const queryResult = useQuery(UserDetailsDocument, {
    variables: { id: id ?? 0 },
    skip: !id,
  });
  const user = queryResult.data?.users_by_pk;
  const userUpvoteCount = user?.upvotes_aggregate.aggregate?.count;
  const userDownvoteCount = user?.downvotes_aggregate.aggregate?.count;
  return { ...queryResult, user, userUpvoteCount, userDownvoteCount };
}
