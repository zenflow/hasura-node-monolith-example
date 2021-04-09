import { FormEvent } from "react";
import { signin } from "next-auth/client";
import { withApollo } from "../apollo";
import { useSessionQuery } from "../graphql/queries/Session";
import { useInsertPostMutation } from "../graphql/mutations/InsertPost";
import { PageLayout } from "../components/PageLayout";
import { PostsList } from "../components/PostsList";

const PostsPage = () => {
  return (
    <PageLayout>
      <MaybeSignInReminder />
      <h2>Submit Post</h2>
      <SubmitPostForm />
      <h2>Posts</h2>
      <PostsList where={{}} />
    </PageLayout>
  );
};

const MaybeSignInReminder = () => {
  const { user } = useSessionQuery();
  if (user) return <></>;
  return (
    <blockquote>
      <p>
        <span role="img" aria-label="Info">
          ℹ
        </span>{" "}
        Anonymous users can see everything & make anonymous posts, but cannot vote.
      </p>
      <p>
        <button onClick={() => signin("google")}>Sign in with Google</button> to vote!
        <span />
        {/* span prevents unwanted styles from being applied to button. github.com/xz/new.css/pull/73 */}
      </p>
      <style jsx>{`
        blockquote {
          text-align: center;
        }
      `}</style>
    </blockquote>
  );
};

const SubmitPostForm = () => {
  const [insertPost, { loading }] = useInsertPostMutation();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new window.FormData(form);
    insertPost(formData.get("title") as string);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Say something creative..."
        aria-label="title"
        type="text"
        required
      />
      <button type="submit" disabled={loading}>
        Submit
      </button>
      <style jsx>{`
        form {
          display: flex;
        }
        input {
          width: 100%;
          margin-right: 0.5rem;
        }
      `}</style>
    </form>
  );
};

export default withApollo({ preload: true }, PostsPage);
