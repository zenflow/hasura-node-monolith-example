import { FC, useState, Fragment } from "react";
import { PostFragment, Posts_Bool_Exp, UserInfoFragment } from "../graphql/generated";
import { useSessionQuery } from "../graphql/queries/Session";
import { usePostsQuery } from "../graphql/queries/Posts";
import { useVoteMutation } from "../graphql/mutations/Vote";
import { usePostVotersQuery } from "../graphql/queries/PostVoters";
import { UserRef } from "./UserRef";
import { TimestampRef } from "./TimestampRef";

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
            <td />
            <th>Date / Time {showAuthor && "/ Author"}</th>
            <th>Post</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostListItem
              key={post.id}
              post={post}
              showAuthor={showAuthor}
              showVoteButtons={!!user}
            />
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
        th {
          text-align: center;
          white-space: nowrap;
        }
        .footer {
          text-align: right;
          margin-bottom: 5rem;
        }
      `}</style>
    </div>
  );
};

const PostListItem: FC<{ post: PostFragment; showAuthor: boolean; showVoteButtons: boolean }> = ({
  post,
  showAuthor,
  showVoteButtons,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded((isExpanded) => !isExpanded);
  return (
    <>
      <tr>
        <th>
          <button onClick={toggle} className={`expand-button ${isExpanded ? "is-active" : ""}`}>
            <span>🡲</span>
          </button>
        </th>
        <td>
          <TimestampRef value={post.created_at} />
          <br />
          {showAuthor && <UserRef user={post.user} link />}
        </td>
        <td className="content-cell">{post.content}</td>
        <td>
          <div className="vote-total">
            {post.vote_total && post.vote_total > 0 ? "+" : ""}
            {post.vote_total}
          </div>
          {showVoteButtons && (
            <div>
              <VoteButton post={post} value={-1} />
              <VoteButton post={post} value={+1} />
            </div>
          )}
        </td>
      </tr>
      {isExpanded ? <PostVotersRow post={post} /> : <tr />}
      <style jsx>{`
        th,
        td {
          text-align: center;
          white-space: nowrap;
        }
        td.content-cell {
          white-space: normal;
        }
        .expand-button.is-active {
          background: cornflowerblue;
        }
        .expand-button span {
          display: inline-block;
          transition: all 0.3s;
        }
        .expand-button.is-active span {
          transform: rotate(90deg);
        }
        .vote-total {
          font-size: 150%;
          font-weight: bolder;
        }
      `}</style>
    </>
  );
};

export const VoteButton: FC<{ post: PostFragment; value: 1 | -1 }> = ({ post, value }) => {
  const [vote] = useVoteMutation();
  const isMyCurrentVote = post.my_vote_value === value;
  const handleClick = () => vote(post, isMyCurrentVote ? 0 : value);
  return (
    <>
      <button className={isMyCurrentVote ? "is-active" : ""} onClick={handleClick}>
        {value === 1 ? "+1" : "-1"}
      </button>
      <style jsx>{`
        button {
          display: inline-block;
          width: 2em;
          margin: 0.2em;
          padding: 0.2em 0;
          border: 1px solid #e4e4e4;
          background-color: white;
          color: black;
          font-weight: normal;
        }
        button:focus {
          outline: none;
          border-color: black;
        }
        button:active {
          background-color: #e4e4e4;
        }
        button.is-active {
          box-shadow: 4px 4px 2px 0px rgba(0, 0, 0, 0.75);
          transform: translateX(-4px) translateY(-4px);
        }
      `}</style>
    </>
  );
};

const PostVotersRow: FC<{ post: PostFragment }> = ({ post }) => {
  const { data, downvoters, upvoters } = usePostVotersQuery(post.id);
  if (!data) return <tr />;
  const voterList = (voters: UserInfoFragment[]) =>
    voters.map((user) => (
      <Fragment key={user.id}>
        {" "}
        <UserRef user={user} link />
      </Fragment>
    ));
  return (
    <tr>
      <td colSpan={4}>
        <div>
          <strong>{upvoters.length} Upvoters</strong>
          {voterList(upvoters)}
        </div>
        <div>
          <strong>{downvoters.length} Downvoters</strong>
          {voterList(downvoters)}
        </div>
      </td>
    </tr>
  );
};
