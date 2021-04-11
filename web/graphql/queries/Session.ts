import { useQuery } from "@apollo/client";
import { SessionDocument } from "../generated";

export function useSessionQuery() {
  const queryResult = useQuery(SessionDocument);
  return {
    ...queryResult,
    user: queryResult.data?.session?.user,
  };
}
