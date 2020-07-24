import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const AUTH_QUERY = gql`
  query {
    auth {
      user {
        name
      }
    }
  }
`

export const useAuth = () => {
  const { data } = useQuery(AUTH_QUERY)
  return data.auth
}

export const getAuth = async apolloClient => {
  const { data } = await apolloClient.query({ query: AUTH_QUERY })
  return data.auth
}
