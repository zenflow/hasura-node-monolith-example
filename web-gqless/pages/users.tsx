import { NextPage } from "next";
import { withGqless } from "../gqless";
import { UsersList } from "../components/UsersList";

const UsersPage: NextPage = () => {
  return (
    <>
      <h2>Users</h2>
      <UsersList />
    </>
  );
};

export default withGqless(UsersPage);
