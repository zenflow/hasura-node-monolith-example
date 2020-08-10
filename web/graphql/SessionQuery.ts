import { QueryResult } from "@apollo/client";
import { useQuery } from "../lib/apollo-helpers";
import { SessionDocument, SessionQuery } from "../graphql-codegen";

export type Session = NonNullable<SessionQuery["session"]>;

export function useSessionQuery(): QueryResult<SessionQuery> & {
  session: Session;
  user: Session["user"];
} {
  const queryResult = useQuery(SessionDocument);
  // `queryResult.data` is always defined when rendering,
  // because this query is called in getInitialProps in pages/_app.tsx.
  const session = queryResult.data!.session!;
  return { ...queryResult, session, user: session.user };
}
