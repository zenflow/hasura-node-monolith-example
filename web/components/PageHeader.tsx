import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
      </nav>
      <style jsx>{`
        .is-active {
          text-decoration: none;
        }
      `}</style>
    </header>
  );
};
