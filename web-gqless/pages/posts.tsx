import { NextPage } from "next";
import { withGqless } from "../gqless";
import { PostsList } from "../components/PostsList";

const PostsPage: NextPage = () => {
  return (
    <>
      <h2>Posts</h2>
      <PostsList />
    </>
  );
};

export default withGqless(PostsPage);
