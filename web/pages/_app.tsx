import "@exampledev/new.css";
import "./global.css";
import App from "next/app";
import { installNextNProgress } from "../lib/next-nprogress";

installNextNProgress({ showSpinner: false });

export default App;
