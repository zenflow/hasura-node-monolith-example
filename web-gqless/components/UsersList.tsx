import { useQuery } from "../gqless";

export const UsersList: React.FC = () => {
  const { users } = useQuery();
  return (
    <>
      {users().map((user) => (
        <div key={user.id || 0}>
          <span>{user.name}</span>
          <img src={user.image} />
        </div>
      ))}
    </>
  );
};
