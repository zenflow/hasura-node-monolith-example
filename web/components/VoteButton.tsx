import { FC } from "react";
import { PostInfoFragment } from "../graphql-codegen";
import { useVoteMutation } from "../graphql/VoteMutation";

export const VoteButton: FC<{
  post: PostInfoFragment;
  value: 1 | -1;
}> = ({ post, value }) => {
  const [vote] = useVoteMutation();
  const isMyCurrentVote = post.my_vote_value === value;

  function handleClick() {
    vote(post, isMyCurrentVote ? 0 : value);
  }

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
          border: 0.1em solid #e4e4e4;
          background-color: white;
          color: black;
        }
        button:focus {
          outline: none;
          border-color: black;
        }
        button:active {
          background-color: #e4e4e4;
        }
        button.is-active {
          box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.75);
          transform: translateX(-4px) translateY(-4px);
        }
      `}</style>
    </>
  );
};
