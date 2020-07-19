import InfoBox from '../components/InfoBox'
import Submit from '../components/Submit'
import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from '../components/PostList'

const IndexPage = () => (
  <>
    <InfoBox>ℹ️ TODO: info here.</InfoBox>
    <Submit />
    <PostList />
  </>
)
IndexPage.getInitialProps = async ({ apolloClient }) => {
  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })
  return { _stop_nextjs_from_complaining: true }
}

export default IndexPage
