import { FC } from "react";
import { Posts_Bool_Exp } from "../graphql-codegen";
import { useSessionQuery } from "../graphql/SessionQuery";
import { usePostsQuery } from "../graphql/PostsQuery";
import { UserReference } from "./UserReference";
import { TimestampReference } from "./TimestampReference";
import { VoteButton } from "./VoteButton";

export const PostsList: FC<{ where: Posts_Bool_Exp }> = ({ where }) => {
  const showAuthor = !where.user_id;

  const { user } = useSessionQuery();
  const { loading, error, data, posts, postCount, loadMorePosts } = usePostsQuery(where);

  if (!data) {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading posts</div>;
  }

  const areMorePosts = posts.length < postCount;

  return (
    <div>
      <span>
        Showing {posts.length} of {postCount} posts
      </span>
      <ol>
        {posts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>
                <a target="_blank" rel="noreferrer" href={post.url}>
                  {post.title}
                </a>{" "}
                {showAuthor && (
                  <>
                    by <UserReference user={post.user} link />
                  </>
                )}{" "}
                <TimestampReference value={post.created_at} />
              </span>
            </div>
            <div>
              <span>Score:</span>
              <span className="vote_total">{post.vote_total}</span>
              {user && (
                <>
                  <VoteButton post={post} value={-1} />
                  <VoteButton post={post} value={+1} />
                </>
              )}
            </div>
          </li>
        ))}
        <style jsx>{`
          .vote_total {
            display: inline-block;
            min-width: 1.5em;
            text-align: center;
          }
        `}</style>
      </ol>
      {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loading}>
          {loading ? "Loading..." : "Show More"}
        </button>
      )}
    </div>
  );
};
