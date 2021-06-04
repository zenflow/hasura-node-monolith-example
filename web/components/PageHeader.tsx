import { FC } from "react";
import Head from "next/head";
import { useRouter } from "../lib/next-apollo";
import Link from "next/link";
import { AuthSection } from "./AuthSection";

export const PageHeader: FC<{}> = () => {
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
