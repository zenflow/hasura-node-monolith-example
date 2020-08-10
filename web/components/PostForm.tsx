import { FC, FormEvent } from "react";
import { useInsertPostMutation } from "../graphql/InsertPostMutation";

export const PostForm: FC<{}> = () => {
  const [insertPost, { loading }] = useInsertPostMutation();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new window.FormData(form);
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    form.reset();
    insertPost(title, url);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="title" name="title" type="text" required />
      <input placeholder="url" name="url" type="url" required />
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};
