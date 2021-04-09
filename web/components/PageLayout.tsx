import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { signin, signout } from "next-auth/client";
import { useSessionQuery } from "../graphql/queries/Session";
import { UserRef } from "./UserRef";

export const PageLayout: FC<{}> = ({ children }) => {
  return (
    <main>
      <PageHeader />
      {children}
    </main>
  );
};

const PageHeader: FC<{}> = () => {
  const { pathname } = useRouter();
  return (
    <header>
      <Head>
        <title>hasura-node-monolith-example</title>
      </Head>
      <h1>hasura-node-monolith-example</h1>
      <nav>
        <Link href="/">
          <a className={pathname === "/" ? "is-active" : ""}>Home</a>
        </Link>
        {" / "}
        <Link href="/posts">
          <a className={pathname === "/posts" ? "is-active" : ""}>Posts</a>
        </Link>
        {" / "}
        <Link href="/users">
          <a
            className={
              pathname === "/users"
                ? "is-active"
                : pathname.startsWith("/users/")
                ? "is-nested-active"
                : ""
            }
          >
            Users
          </a>
        </Link>
        {" / "}
        <AuthSection />
      </nav>
      <style jsx>{`
        a {
          font-size: 120%;
        }
        a.is-active {
          text-decoration: none;
        }
        a.is-active,
        a.is-nested-active {
          font-weight: bold;
        }
      `}</style>
    </header>
  );
};

const AuthSection: FC<{}> = () => {
  const { user } = useSessionQuery();
  return user ? (
    <>
      <UserRef user={user} link />
      <button onClick={() => signout()}>Sign out</button>
      <style jsx>{`
        button {
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  ) : (
    <>
      <button onClick={() => signin("google")}>Sign in with Google</button>
    </>
  );
};
