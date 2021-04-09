import "nprogress/nprogress.css";
import NProgress, { NProgressOptions } from "nprogress";
import Router from "next/router";

export function installNextNProgress(options: Partial<NProgressOptions>) {
  if (typeof window === "undefined") {
    return;
  }
  NProgress.configure(options);
  Router.events.on("routeChangeStart", (url) => start());
  Router.events.on("routeChangeComplete", () => done());
  Router.events.on("routeChangeError", () => done());

  // Wrap NProgress `start` & `done` methods to prevent flicker of progress bar when route change is instant
  let shouldStart = false;
  function start() {
    shouldStart = true;
    setTimeout(() => {
      if (shouldStart) NProgress.start();
    });
  }
  function done() {
    shouldStart = false;
    NProgress.done();
  }
}
