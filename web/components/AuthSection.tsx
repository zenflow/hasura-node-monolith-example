import { FC } from "react";
import { signin, signout } from "next-auth/client";
import { useSessionQuery } from "../graphql/SessionQuery";
import { UserReference } from "./UserReference";

export const AuthSection: FC<{}> = () => {
  const { user } = useSessionQuery();
  return (
    <>
      {user ? (
        <div>
          <span>
            Signed in as <UserReference user={user} link />
          </span>
          <button onClick={() => signout()}>Sign out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => signin("google")}>Sign in with Google</button>
        </div>
      )}
      <style jsx>{`
        div {
          float: right;
        }
      `}</style>
    </>
  );
};
