import { NextPageContext } from "next";
import { getApolloClient } from "../lib/apolloClient";
import { doAllPostsQuery } from "../graphql/AllPostsQuery";
import { PostSubmit } from "../components/PostSubmit";
import { PostList } from "../components/PostList";
import { AuthSection } from "../components/AuthSection";

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const apolloClient = getApolloClient(ctx.req);
  await doAllPostsQuery(apolloClient); // preload "all posts" query into cache
  return { ok: true }; // stop next.js from warning: https://err.sh/vercel/next.js/empty-object-getInitialProps
};

function IndexPage() {
  return (
    <>
      <p>
        <span role="img" aria-label="Info">
          ℹ
        </span>
        ️ TODO: info here.
      </p>
      <hr />
      <AuthSection />
      <hr />
      <PostSubmit />
      <PostList />
    </>
  );
}

export default IndexPage;
