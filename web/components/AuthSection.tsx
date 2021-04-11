import { FC } from "react";
import { signin, signout } from "next-auth/client";
import { useSessionQuery } from "../graphql/queries/Session";
import { UserRef } from "./UserRef";

export const AuthSection: FC<{}> = () => {
  const { data, user } = useSessionQuery();
  return (
    <span className={data ? "show" : ""}>
      {user ? (
        <>
          <UserRef user={user} link />
          <button className="sign-out" onClick={() => signout()}>
            Sign out
          </button>
        </>
      ) : (
        <button onClick={() => signin("google")}>Sign in with Google</button>
      )}
      <style jsx>{`
        span {
          opacity: 0;
          transition: opacity 0.3s;
        }
        span.show {
          opacity: 1;
        }
        button.sign-out {
          margin-left: 0.5rem;
        }
      `}</style>
    </span>
  );
};
