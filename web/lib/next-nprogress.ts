import NProgress, { NProgressOptions } from "nprogress";
import Router from "next/router";

export function installNextNProgress(options: Partial<NProgressOptions>) {
  if (!process.browser) {
    return;
  }
  NProgress.configure(options);
  Router.events.on("routeChangeStart", (url) => {
    console.log(`Loading: ${url}`);
    start();
  });
  Router.events.on("routeChangeComplete", done);
  Router.events.on("routeChangeError", done);

  // TODO: PR to nprogress to do the following
  let isStarted = false;
  function start() {
    isStarted = true;
    setTimeout(() => {
      if (isStarted) {
        NProgress.start();
      }
    });
  }
  function done() {
    isStarted = false;
    NProgress.done();
  }
}
