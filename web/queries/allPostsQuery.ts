import gql from "graphql-tag";
import { QueryResult, useQuery } from "@apollo/client";

// TODO: should use a graphql fragment for Post fields, same as in insertPostMutation.ts
export const allPostsQuery = gql`
  query($limit: Int!, $offset: Int!) {
    posts(order_by: { created_at: desc }, limit: $limit, offset: $offset) {
      id
      title
      url
      user {
        name
      }
      vote_total
      my_vote_value
    }
    posts_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export interface AllPostsQueryData {
  posts: Post[];
  posts_aggregate: { aggregate: { count: number } };
}

export interface Post {
  id: number;
  title: string;
  url: string;
  user?: { name: string };
  vote_total: number;
  my_vote_value?: number;
}

export const allPostsQueryVars = {
  offset: 0,
  limit: 5,
};

export function useAllPostsQuery(): QueryResult<AllPostsQueryData> & {
  posts: Post[];
  postCount: number;
  loadMorePosts: () => void;
} {
  const queryResult = useQuery<AllPostsQueryData>(allPostsQuery, {
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true,
  });
  const posts = queryResult.data?.posts ?? [];
  const postCount = queryResult.data?.posts_aggregate.aggregate.count ?? 0;
  const loadMorePosts = () => {
    if (!queryResult.data) {
      return;
    }
    queryResult.fetchMore({
      variables: {
        offset: queryResult.data.posts.length,
      },
    });
  };
  return { ...queryResult, posts, postCount, loadMorePosts };
}
