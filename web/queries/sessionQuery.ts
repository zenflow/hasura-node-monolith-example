import gql from "graphql-tag";
import { QueryResult, useQuery } from "@apollo/client";

export const sessionQuery = gql`
  query {
    session {
      user {
        name
      }
    }
  }
`;

export interface SessionQueryData {
  session: Session;
}

export interface Session {
  user?: {
    name: string;
  };
}

export function useSessionQuery(): QueryResult<SessionQueryData> & {
  session: Session;
} {
  const queryResult = useQuery<SessionQueryData>(sessionQuery);
  // `queryResult.data` is always defined when rendering,
  // because this query is called in getInitialProps in pages/_app.tsx.
  return { ...queryResult, session: queryResult.data!.session };
}
