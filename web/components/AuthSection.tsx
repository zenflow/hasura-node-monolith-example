import { FC } from "react";
import { signin, signout } from "next-auth/client";
import { useSessionQuery } from "../queries/sessionQuery";

export const AuthSection: FC<{}> = () => {
  const { session } = useSessionQuery();
  return (
    <div>
      {session.user ? (
        <>
          Signed in as {session.user.name}
          <button onClick={() => signout()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in
          <button onClick={() => signin("google")}>Sign in with Google</button>
        </>
      )}
      <style jsx>{`
        div {
          margin-bottom: 10px;
        }
        button {
          display: inline-block;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};
