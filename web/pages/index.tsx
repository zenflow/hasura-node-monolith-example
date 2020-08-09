import { NextPageContext } from "next";
import { getApolloClient } from "../lib/apolloClient";
import { PostSubmit } from "../components/PostSubmit";
import { allPostsQuery, allPostsQueryVars } from "../queries/allPostsQuery";
import { PostList } from "../components/PostList";
import { AuthSection } from "../components/AuthSection";

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  // preload "all posts" query
  const apolloClient = getApolloClient(ctx.req);
  await apolloClient.query({
    query: allPostsQuery,
    variables: allPostsQueryVars,
  });
  return { _stop_nextjs_from_complaining: true };
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
