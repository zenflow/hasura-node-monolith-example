import { useQuery } from "../gqless";

export const PostsList: React.FC = () => {
  const { posts } = useQuery();
  return (
    <>
      {posts().map((post) => (
        <div key={post.id || 0}>
          <span>{new Date(post.created_at).toLocaleString()}</span> <span>{post.user?.name}</span>{" "}
          <span>{post.title}</span>
          <span>My vote: {JSON.stringify(post.my_vote_value)}</span>
        </div>
      ))}
    </>
  );
};
