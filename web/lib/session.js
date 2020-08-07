import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const SESSION_QUERY = gql`
  query {
    session {
      user {
        name
      }
    }
  }
`;

export const useSession = () => {
  const { data } = useQuery(SESSION_QUERY);
  return data.session;
};

export const getSession = async (apolloClient) => {
  const { data } = await apolloClient.query({ query: SESSION_QUERY });
  return data.session;
};
