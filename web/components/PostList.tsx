import { FC } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { VoteButton } from "./VoteButton";
import { useAllPostsQuery } from "../queries/allPostsQuery";

export const PostList: FC<{}> = () => {
  const {
    loading,
    error,
    data,
    posts,
    postCount,
    loadMorePosts,
  } = useAllPostsQuery();

  if (!data) {
    if (loading) return <div>Loading</div>;
    if (error) return <ErrorMessage message="Error loading posts." />;
  }

  const areMorePosts = posts.length < postCount;

  return (
    <section>
      <h3>
        Posts ({posts.length} of {postCount})
      </h3>
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <a target="_blank" rel="noreferrer" href={post.url}>
                {post.title}
              </a>
              <span>by {post.user ? post.user.name : "anonymous"}</span>
            </div>
            <div>
              <span>&nbsp;&nbsp;</span>
              <span>Score:</span>
              <span className="post-vote-total">{post.vote_total}</span>
              <VoteButton post={post} value={-1}>
                -1
              </VoteButton>
              <VoteButton post={post} value={+1}>
                +1
              </VoteButton>
            </div>
          </li>
        ))}
      </ul>
      {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loading}>
          {loading ? "Loading..." : "Show More"}
        </button>
      )}
      <style jsx>{`
        li {
          display: block;
        }
        div {
          margin: 0.5rem 0;
          align-items: center;
          display: flex;
        }
        a {
          margin-right: 0.5rem;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          margin-right: 0.5rem;
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
          content: "";
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  );
};
