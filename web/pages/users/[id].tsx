import { NextPage } from "next";
import { withApollo } from "../../apollo";
import { PageLayout } from "../../components/PageLayout";
import { useUserDetailsQuery } from "../../graphql/queries/UserDetails";
import { UserRef } from "../../components/UserRef";
import { TimestampRef } from "../../components/TimestampRef";
import { PostsList } from "../../components/PostsList";
import { Error404Page } from "../404";

const getWhere = (userId: number) => ({ user_id: { _eq: userId } });

const UserPage: NextPage<{ userId?: number }> = ({ userId }) => {
  const { error, data, user, userUpvotes, userDownvotes } = useUserDetailsQuery(userId);
  if (!data) {
    if (error) return <PageLayout>Error loading</PageLayout>;
    return <PageLayout>Loading...</PageLayout>;
  }
  if (!userId || !user) return <Error404Page />;
  return (
    <PageLayout>
      <h2>
        <UserRef user={user} />
      </h2>
      <h3>{user.name}'s Details</h3>
      <table>
        <tbody>
          <tr>
            <th>member since</th>
            <td>
              <TimestampRef value={user.created_at} />
            </td>
          </tr>
          <tr>
            <th>upvotes given</th>
            <td>{userUpvotes}</td>
          </tr>
          <tr>
            <th>downvotes given</th>
            <td>{userDownvotes}</td>
          </tr>
        </tbody>
      </table>
      <h3>Posts by {user.name}</h3>
      <PostsList where={getWhere(userId)} />
      <style jsx>{`
        tr {
          background: none;
        }
      `}</style>
    </PageLayout>
  );
};

UserPage.getInitialProps = (ctx) => ({ userId: Number(ctx.query.id) });

export default withApollo({ preload: true }, UserPage);
