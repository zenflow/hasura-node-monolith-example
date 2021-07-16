import Link from "next/link";
import { withApollo } from "../apollo";
import { PageLayout } from "../components/PageLayout";

const IndexPage = () => (
  <PageLayout>
    <h2>Welcome</h2>
    <p>
      This is a sample fullstack web application incorporating{" "}
      <a
        href="https://hasura.io/docs/latest/graphql/core/index.html"
        target="_blank"
        rel="noreferrer"
      >
        Hasura GraphQL Engine
      </a>{" "}
      and other technologies. Check out the{" "}
      <a
        href="https://github.com/zenflow/hasura-node-monolith-example"
        target="_blank"
        rel="noreferrer"
      >
        GitHub repo
      </a>{" "}
      for more details.
    </p>
    <p>
      <strong>Fun fact!</strong> This page is served statically, while the rest use SSR!
    </p>
    <p className="footer-cta">
      On to the{" "}
      <Link href="/posts">
        <a>Posts</a>
      </Link>{" "}
      page...
    </p>
    <style jsx>{`
      .footer-cta {
        font-style: italic;
        font-size: 120%;
      }
    `}</style>
  </PageLayout>
);

export default withApollo({ preload: false }, IndexPage);
