import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthSection } from "./AuthSection";

export const PageHeader: FC<{}> = () => {
  const { pathname } = useRouter();
  return (
    <header>
      <h1>zenflow/hasura-node-monolith-example</h1>
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
