import { useQuery } from "@apollo/client";
import { Posts_Bool_Exp, PostsDocument, PostsQuery } from "../generated";

const postsQueryPageSize = 5;

export const defaultPostsQueryVariables = {
  limit: postsQueryPageSize,
  offset: 0,
};

export function usePostsQuery(where: Posts_Bool_Exp) {
  const queryResult = useQuery(PostsDocument, {
    variables: { ...defaultPostsQueryVariables, where },
    notifyOnNetworkStatusChange: true,
  });
  const posts: NonNullable<PostsQuery["posts"]> = queryResult.data?.posts ?? [];
  const postCount: number = queryResult.data?.posts_aggregate.aggregate?.count ?? 0;
  const loadMorePosts: () => void = () => {
    if (!queryResult.data || queryResult.loading) return;
    queryResult.fetchMore({
      variables: {
        offset: queryResult.data.posts.length,
      },
    });
  };
  return { ...queryResult, posts, postCount, loadMorePosts };
}
