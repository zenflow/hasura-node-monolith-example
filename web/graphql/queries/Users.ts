import { useQuery } from "@apollo/client";
import { UsersDocument } from "../../graphql-codegen";

export function useUsersQuery() {
  return useQuery(UsersDocument, {
    // notifyOnNetworkStatusChange: true, TODO ?
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });
}
