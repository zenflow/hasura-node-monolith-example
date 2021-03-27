import "@exampledev/new.css";
import "./global.css";
import { AppProps } from "next/app";
import { installNextNProgress } from "../lib/next-nprogress";
import { PageLayout } from "../components/PageLayout";

installNextNProgress({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
