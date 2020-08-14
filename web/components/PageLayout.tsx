import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthSection } from "./AuthSection";

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
        <AuthSection />
      </nav>
      <style jsx>{`
        a {
          font-size: 120%;
        }
        a.is-active {
          text-decoration: none;
        }
      `}</style>
    </header>
  );
};
