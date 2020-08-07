import PostSubmit from "../components/PostSubmit";
import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from "../components/PostList";
import { AuthSection } from "../components/AuthSection";

const IndexPage = () => (
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
    <hr />
    <PostList />
  </>
);
IndexPage.getInitialProps = async ({ apolloClient }) => {
  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  });
  return { _stop_nextjs_from_complaining: true };
};

export default IndexPage;
