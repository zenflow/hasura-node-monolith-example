import { FC } from "react";
import { signin, signout } from "next-auth/client";
import { useSessionQuery } from "../graphql/SessionQuery";

export const AuthSection: FC<{}> = () => {
  const { user } = useSessionQuery();
  return user ? (
    <div>
      <span>Signed in as {user.name}</span>
      <button onClick={() => signout()}>Sign out</button>
    </div>
  ) : (
    <div>
      <span>Not signed in</span>
      <button onClick={() => signin("google")}>Sign in with Google</button>
    </div>
  );
};
