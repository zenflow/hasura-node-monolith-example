import "@exampledev/new.css";
import "./global.css";
import { AppProps } from "next/app";
import { installNextNProgress } from "../lib/next-nprogress";

installNextNProgress({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
