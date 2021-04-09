import { withApollo } from "../apollo";
import { PageLayout } from "../components/PageLayout";
import { useUsersQuery } from "../graphql/queries/Users";
import { UserRef } from "../components/UserRef";

const UsersPage = () => {
  return (
    <PageLayout>
      <h2>Users</h2>
      <UsersList />
    </PageLayout>
  );
};

const UsersList = () => {
  const { error, data } = useUsersQuery();
  if (!data) {
    if (error) return <div>Error loading</div>;
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>Showing {data.users.length} users</p>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user) => (
            <tr key={user.id}>
              <td>
                <UserRef user={user} link />
              </td>
              <td>{user.posts_aggregate.aggregate?.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        th,
        td {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default withApollo({ preload: true }, UsersPage);
