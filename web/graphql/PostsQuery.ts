import { QueryResult, useQuery } from "@apollo/client";
import {
  Posts_Bool_Exp,
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
} from "../graphql-codegen";

const postsQueryPageSize = 5;

export const defaultPostsQueryVariables = {
  limit: postsQueryPageSize,
  offset: 0,
};

export function usePostsQuery(
  where: Posts_Bool_Exp,
): QueryResult<PostsQuery, PostsQueryVariables> & {
  posts: NonNullable<PostsQuery["posts"]>;
  postCount: number;
  loadMorePosts: () => void;
} {
  const queryResult = useQuery(PostsDocument, {
    variables: { ...defaultPostsQueryVariables, where },
    notifyOnNetworkStatusChange: true,
  });
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
