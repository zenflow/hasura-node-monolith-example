import { NextPageContext } from "next";
import { getApolloClient } from "../lib/apolloClient";
import { apolloClientQuery } from "../lib/apollo-helpers";
import { Posts_Bool_Exp, PostsDocument } from "../graphql-codegen";
import { defaultPostsQueryVariables } from "../graphql/PostsQuery";
import { PostForm } from "../components/PostForm";
import { PostsList } from "../components/PostsList";

const where: Posts_Bool_Exp = {};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const apolloClient = getApolloClient(ctx.req);
  await apolloClientQuery(apolloClient, {
    query: PostsDocument,
    variables: { ...defaultPostsQueryVariables, where },
  });
  return { ok: true };
};

function IndexPage() {
  return (
    <>
      <p>
        <span role="img" aria-label="Info">
          ℹ
        </span>{" "}
        Anonymous users can see everything & make anonymous posts, but cannot
        vote. Sign in to vote.
      </p>
      <h3>Submit Post</h3>
      <PostForm />
      <h3>Posts</h3>
      <PostsList where={where} />
    </>
  );
}

export default IndexPage;
