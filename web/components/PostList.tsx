import { FC } from "react";
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading posts</div>;
  }

  const areMorePosts = posts.length < postCount;

  return (
    <section>
      <h3>
        Posts ({posts.length} of {postCount})
      </h3>
      <ol>
        {posts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>
                <a target="_blank" rel="noreferrer" href={post.url}>
                  {post.title}
                </a>{" "}
                by {post.user ? post.user.name : "anonymous"}
              </span>
            </div>
            <div>
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
      </ol>
      {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loading}>
          {loading ? "Loading..." : "Show More"}
        </button>
      )}
      <style jsx>{`
        .post-vote-total {
          display: inline-block;
          text-align: center;
          min-width: 2rem;
        }
      `}</style>
    </section>
  );
};
