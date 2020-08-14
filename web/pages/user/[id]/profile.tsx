import { NextPageContext } from "next";
import { getApolloClient } from "../../../lib/apolloClient";
import { UserDetailsDocument, PostsDocument } from "../../../graphql-codegen";
import { useUserDetailsQuery } from "../../../graphql/UserDetailsQuery";
import { defaultPostsQueryVariables } from "../../../graphql/PostsQuery";
import { UserReference } from "../../../components/UserReference";
import { TimestampReference } from "../../../components/TimestampReference";
import { PostsList } from "../../../components/PostsList";

const getWhere = (userId: number) => ({ user_id: { _eq: userId } });

UserProfilePage.getInitialProps = async ({ req, query }: NextPageContext) => {
  const userId = Number(query.id);
  if (Number.isNaN(userId)) {
    return { ok: true };
  }
  const apolloClient = getApolloClient(req);
  await Promise.all([
    apolloClient.query({
      query: UserDetailsDocument,
      variables: { id: userId },
    }),
    apolloClient.query({
      query: PostsDocument,
      variables: { ...defaultPostsQueryVariables, where: getWhere(userId) },
    }),
  ]);
  return { userId };
};

function UserProfilePage(props: { userId: number | undefined }) {
  const { user, userUpvoteCount, userDownvoteCount } = useUserDetailsQuery(
    props.userId
  );
  if (!props.userId || !user) {
    return <h3>No such user</h3>;
  }
  return (
    <>
      <h2>
        <UserReference user={user} />
      </h2>
      <h3>{user.name}'s Details</h3>
      <table>
        <tbody>
          <tr>
            <th>member since</th>
            <td>
              <TimestampReference value={user.created_at} />
            </td>
          </tr>
          <tr>
            <th>upvotes given</th>
            <td>{userUpvoteCount}</td>
          </tr>
          <tr>
            <th>downvotes given</th>
            <td>{userDownvoteCount}</td>
          </tr>
        </tbody>
      </table>
      <h3>{user.name}'s Posts</h3>
      <PostsList where={getWhere(props.userId)} />
      <style jsx>{`
        tr {
          background: none;
        }
      `}</style>
    </>
  );
}

export default UserProfilePage;
