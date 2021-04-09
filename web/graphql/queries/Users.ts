import { useQuery } from "@apollo/client";
import { UsersDocument } from "../generated";

export function useUsersQuery() {
  return useQuery(UsersDocument, {
    // notifyOnNetworkStatusChange: true, TODO ?
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });
}
