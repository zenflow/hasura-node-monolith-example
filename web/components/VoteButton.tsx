import { FC } from "react";
import { Post } from "../queries/allPostsQuery";
import { useSessionQuery } from "../queries/sessionQuery";
import { useVoteMutation } from "../queries/voteMutation";

export const VoteButton: FC<{ post: Post; value: -1 | 1 }> = (props) => {
  const { session } = useSessionQuery();
  const [vote] = useVoteMutation();
  const isMyCurrentVote = props.post.my_vote_value === props.value;

  function handleClick() {
    vote(props.post, isMyCurrentVote ? 0 : props.value);
  }

  return (
    <>
      <button
        disabled={!session.user}
        className={isMyCurrentVote ? "is-active" : ""}
        onClick={handleClick}
      >
        {props.children}
      </button>
      <style jsx>{`
        button {
          background-color: white;
          color: black;
          border: 0.1em solid #e4e4e4;
          margin: 0.2em;
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
