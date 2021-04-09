import { FC } from "react";
import { Posts_Bool_Exp } from "../graphql/generated";
import { useSessionQuery } from "../graphql/queries/Session";
import { usePostsQuery } from "../graphql/queries/Posts";
import { UserRef } from "./UserRef";
import { TimestampRef } from "./TimestampRef";
import { VoteButton } from "./VoteButton";

export const PostsList: FC<{ where: Posts_Bool_Exp }> = ({ where }) => {
  const showAuthor = !where.user_id;
  const { user } = useSessionQuery();
  const { loading, error, data, posts, postCount, loadMorePosts } = usePostsQuery(where);
  if (!data) {
    if (error) return <div>Error loading</div>;
    return <div>Loading...</div>;
  }
  const areMorePosts = posts.length < postCount;
  return (
    <div>
      <p>
        Showing {posts.length} of {postCount} posts
      </p>
      <table>
        <thead>
          <tr>
            <th>Date / Time {showAuthor && "/ Author"}</th>
            <th>Post</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <TimestampRef value={post.created_at} />
                <br />
                {showAuthor && <UserRef user={post.user} link />}
              </td>
              <td>{post.content}</td>
              <td>
                <div className="vote_total">{post.vote_total}</div>
                {user && (
                  <div>
                    <VoteButton post={post} value={-1} />
                    <VoteButton post={post} value={+1} />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer">
        {areMorePosts && (
          <button onClick={() => loadMorePosts()} disabled={loading}>
            {loading ? "Loading..." : "Show More"}
          </button>
        )}
      </div>
      <style jsx>{`
        th,
        td {
          text-align: center;
        }
        th,
        td:first-child,
        td:last-child {
          white-space: nowrap;
        }
        .vote_total {
          font-size: 150%;
          font-weight: bolder;
        }
        .footer {
          text-align: right;
        }
      `}</style>
    </div>
  );
};
