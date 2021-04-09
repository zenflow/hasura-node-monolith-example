import { useQuery } from "@apollo/client";
import { SessionDocument } from "../generated";

export function useSessionQuery() {
  const queryResult = useQuery(SessionDocument, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });
  return {
    ...queryResult,
    user: queryResult.data?.session?.user,
  };
}
