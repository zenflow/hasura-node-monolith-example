import { FC } from "react";
import { PageHeader } from "./PageHeader";

export const PageLayout: FC<{}> = ({ children }) => {
  return (
    <main>
      <PageHeader />
      <hr />
      {children}
      <style jsx global>{`
        * {
          font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono",
            "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New",
            monospace, serif;
        }
        body {
          margin: 0;
          padding: 25px 50px;
        }
        a {
          color: #22bad9;
          text-decoration: none;
        }
        hr {
          border-style: solid;
          border-color: #ececec;
          border-width: 0;
          border-top-width: 1px;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        button {
          align-items: center;
          background-color: #22bad9;
          border: 0;
          color: white;
          display: flex;
          padding: 5px 7px;
          transition: all 0.3s;
          cursor: pointer;
        }
        button:active {
          background-color: #1b9db7;
        }
        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        button:focus {
          outline: none;
        }
      `}</style>
    </main>
  );
};
