import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import PostVoteButton from './PostVoteButton'

// TODO: should use a graphql fragment for result fields, same as in Submit.js
export const ALL_POSTS_QUERY = gql`
  query ($limit: Int!, $offset: Int!) {
    posts(
      order_by: {created_at: desc},
      limit: $limit,
      offset: $offset
    ) {
      id
      title
      url
      user {
        name
      }
      vote_total
      my_vote_value
    }
    posts_aggregate {
      aggregate {
        count
      }
    }
  }
`

export const allPostsQueryVars = {
  offset: 0,
  limit: 5,
}

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      variables: allPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        offset: posts.length,
      },
      updateQuery: (previous, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previous
        }
        return {
          ...previous,
          posts: [...previous.posts, ...fetchMoreResult.posts],
        }
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const { posts, posts_aggregate: { aggregate: { count }} } = data
  const areMorePosts = posts.length < count

  return (
    <section>
      <h3>
        Posts ({posts.length} of {count})
      </h3>
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <a target="_blank" href={post.url}>{post.title}</a>
              <span>by {post.user ? post.user.name : 'anonymous'}</span>
            </div>
            <div>
              <span>&nbsp;&nbsp;</span>
              <span>Score:</span>
              <span className="post-vote-total">
                {post.vote_total}
              </span>
              <PostVoteButton post={post} value={-1}>
                -1
              </PostVoteButton>
              <PostVoteButton post={post} value={+1}>
                +1
              </PostVoteButton>
            </div>
          </li>
        ))}
      </ul>
      {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )}
      <style jsx>{`
        li {
          display: block;
        }
        div {
          margin: .5rem 0;
          align-items: center;
          display: flex;
        }
        a {
          margin-right: .5rem;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          margin-right: .5rem;
        }
        span.post-vote-total {
          min-width: 3rem;
          text-align: right;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}
