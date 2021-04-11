import { useQuery } from "@apollo/client";
import { UsersDocument } from "../generated";

export function useUsersQuery() {
  return useQuery(UsersDocument);
}
