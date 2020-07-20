import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from '../components/PostList'
import { initializeApollo } from '../lib/apolloClient'

const IndexPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ TODO: info here.</InfoBox>
    <Submit />
    <PostList />
  </App>
)
IndexPage.getInitialProps = async ({ apolloClient }) => {
  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })
  return { _stop_nextjs_from_complaining: true }
}

export default IndexPage
