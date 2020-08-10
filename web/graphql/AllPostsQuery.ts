import {
  ApolloClient,
  NormalizedCacheObject,
  QueryResult,
  useQuery,
} from "@apollo/client";
import {
  AllPostsDocument,
  AllPostsQuery,
  AllPostsQueryVariables,
} from "../graphql-codegen";

export const allPostsQueryVars: AllPostsQueryVariables = {
  offset: 0,
  limit: 5,
};

export function useAllPostsQuery(): QueryResult<
  AllPostsQuery,
  AllPostsQueryVariables
> & {
  posts: NonNullable<AllPostsQuery["posts"]>;
  postCount: number;
  loadMorePosts: () => void;
} {
  const queryResult = useQuery<AllPostsQuery, AllPostsQueryVariables>(
    AllPostsDocument,
    {
      variables: allPostsQueryVars,
      notifyOnNetworkStatusChange: true,
    }
  );
  const posts = queryResult.data?.posts ?? [];
  const postCount = queryResult.data?.posts_aggregate.aggregate?.count ?? 0;
  const loadMorePosts = () => {
    if (!queryResult.data) return;
    queryResult.fetchMore({
      variables: {
        offset: queryResult.data.posts.length,
      },
    });
  };
  return { ...queryResult, posts, postCount, loadMorePosts };
}

export function doAllPostsQuery(
  apolloClient: ApolloClient<NormalizedCacheObject>
) {
  return apolloClient.query<AllPostsQuery, AllPostsQueryVariables>({
    query: AllPostsDocument,
    variables: allPostsQueryVars,
  });
}
