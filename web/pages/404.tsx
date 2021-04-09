import { PageLayout } from "../components/PageLayout";
import { withApollo } from "../apollo";

export const Error404Page = () => {
  return (
    <PageLayout>
      <h2>404 Page Not Found</h2>
    </PageLayout>
  );
};

export default withApollo({ preload: false }, Error404Page);
