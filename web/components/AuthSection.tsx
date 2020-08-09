import { FC } from "react";
import { signin, signout } from "next-auth/client";
import { useSessionQuery } from "../queries/sessionQuery";

export const AuthSection: FC<{}> = () => {
  const { session } = useSessionQuery();
  return session.user ? (
    <div>
      <span>Signed in as {session.user.name}</span>
      <button onClick={() => signout()}>Sign out</button>
    </div>
  ) : (
    <div>
      <span>Not signed in</span>
      <button onClick={() => signin("google")}>Sign in with Google</button>
    </div>
  );
};
