import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { signin, signout } from "next-auth/client";
import { useSessionQuery } from "../graphql/SessionQuery";
import { UserReference } from "./UserReference";

export const PageLayout: FC<{}> = ({ children }) => {
  return (
    <>
      <Head>
        <title>hasura-node-monolith-example</title>
        <meta
          name="description"
          content="Example of a monolithic web application using Hasura GraphQL Engine + Express.js + Next.js"
        />
      </Head>
      <main>
        <PageHeader />
        {children}
      </main>
    </>
  );
};

const PageHeader: FC<{}> = () => {
  const { pathname } = useRouter();
  return (
    <header>
      <h1>hasura-node-monolith-example</h1>
      <nav>
        <Link href="/">
          <a className={pathname === "/" ? "is-active" : ""}>Home</a>
        </Link>
        {" / "}
        <Link href="/about">
          <a className={pathname === "/about" ? "is-active" : ""}>About</a>
        </Link>
      </nav>
      <div>
        <AuthSection />
      </div>
      <style jsx>{`
        a {
          font-size: 120%;
        }
        a.is-active {
          text-decoration: none;
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
      <UserReference user={user} link />
      <button onClick={() => signout()}>Sign out</button>
    </>
  ) : (
    <button onClick={() => signin("google")}>Sign in with Google</button>
  );
};
