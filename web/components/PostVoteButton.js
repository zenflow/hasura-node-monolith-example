import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useSession } from '../lib/session'

const VOTE_MUTATION = gql`
  mutation ($post_id: Int!, $value: smallint!) {
    vote(post_id: $post_id, value: $value) {
      __typename
      vote {
        __typename
        post {
          __typename
          id
          vote_total
          my_vote_value
        }
      }
    }
  }
`

export default function PostVoteButton({ post, value, children }) {
  const { user } = useSession()
  const [voteMutation] = useMutation(VOTE_MUTATION)
  const vote = value => {
    voteMutation({
      variables: { post_id: post.id, value },
      optimisticResponse: {
        __typename: 'Mutation',
        vote: {
          __typename: 'VoteOutput',
          vote: {
            __typename: 'votes',
            post: {
              __typename: 'posts',
              id: post.id,
              vote_total: post.vote_total - post.my_vote_value + value,
              my_vote_value: value,
            },
          },
        },
      },
    })
  }
  return (
    <>
      <button
        disabled={!user}
        className={post.my_vote_value === value ? 'is-active' : ''}
        onClick={() => vote(post.my_vote_value === value ? 0 : value)}
      >
        {children}
      </button>
      <style jsx>{`
        button {
          border: 1px solid #e4e4e4;
          margin: 4px;
          background-color: white;
          color: black;
        }
        button:active {
          background-color: #e4e4e4;
        }
        button.is-active {
          box-shadow: 4px 4px 4px 0px rgba(0,0,0,0.75);
          transform: translateX(-4px) translateY(-4px);
        }
      `}</style>
    </>
  )
}
